import React, { useEffect, useMemo, useState } from "react";
import TrainMap from "../components/TrainMap";

const API_URL = "http://localhost:4000/api";

function KPI({ title, value, suffix }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #eee",
      borderRadius: "12px",
      padding: "16px",
      flex: 1,
      textAlign: "center",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
    }}>
      <div style={{ fontSize: "14px", color: "#666" }}>{title}</div>
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
        {value}{suffix || ""}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [trains, setTrains] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState({});

  const fetchData = async () => {
    try {
      const [trRes, cfRes, kpRes] = await Promise.all([
        fetch(`${API_URL}/trains`),
        fetch(`${API_URL}/conflicts`),
        fetch(`${API_URL}/kpis`),
      ]);
      const [trData, cfData, kpData] = await Promise.all([
        trRes.json(),
        cfRes.json(),
        kpRes.json(),
      ]);
      setTrains(Array.isArray(trData) ? trData : []);
      setConflicts(Array.isArray(cfData) ? cfData : []);
      setKpis(kpData || null);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch data", err);
      setLoading(false);
    }
  };

  const runningTrains = useMemo(
    () => trains.filter(t => t.status === "Running"),
    [trains]
  );

  const highPriorityTrains = useMemo(
    () => trains.filter(t => (t.priority || "").toLowerCase() === "high"),
    [trains]
  );

  const applySuggestion = async (conflictId, suggestion) => {
    try {
      setApplying(prev => ({ ...prev, [conflictId]: suggestion }));
      await fetch(`${API_URL}/conflicts/${encodeURIComponent(conflictId)}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ suggestion }),
      });
    } catch (e) {
      console.error("Failed to apply suggestion", e);
    } finally {
      setApplying(prev => ({ ...prev, [conflictId]: null }));
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Loading data...</div>;

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", padding: 20 }}>
      <h2>🚆 Railway Decision-Support Dashboard</h2>

      {/* KPIs */}
      {kpis && (
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <KPI title="Avg Delay (min)" value={kpis.average_delay_minutes} />
          <KPI title="Punctuality" value={kpis.punctuality_percent} suffix="%" />
          <KPI title="Throughput (tph)" value={kpis.throughput_trains_per_hour} />
          <KPI title="Utilization" value={kpis.utilization_percent} suffix="%" />
        </div>
      )}

      {/* Map */}
      <TrainMap />

      {/* Train Lists */}
      <section style={{ marginTop: 32 }}>
        <h3>Live Trains</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {trains.map(train => (
            <div key={train.train_no} style={{
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 16,
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}>
              <div style={{ fontWeight: "bold" }}>
                {train.train_no} — {train.name}
              </div>
              <div>Type: {train.type} | Priority: {train.priority}</div>
              <div>Status: {train.status} | Delay: {train.delay_minutes} min</div>
              <div>Current: {train.current_station} → Next: {train.next_station}</div>
              <div style={{ marginTop: 6, fontSize: 12, color: "#666" }}>
                Sched Dep: {train.scheduled_departure || "—"}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Running Trains */}
      <section style={{ marginTop: 24 }}>
        <h3>Currently Running</h3>
        {runningTrains.length === 0 && <div>No trains running now</div>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {runningTrains.map(t => (
            <span key={t.train_no} style={{
              background: "#e7f7ef",
              border: "1px solid #c7eed8",
              padding: "6px 10px",
              borderRadius: 999,
              fontSize: 13
            }}>{t.train_no} {t.name} ({t.current_station} → {t.next_station})</span>
          ))}
        </div>
      </section>

      {/* High Priority Trains */}
      <section style={{ marginTop: 24 }}>
        <h3>High Priority Trains</h3>
        {highPriorityTrains.length === 0 && <div>No high priority trains</div>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {highPriorityTrains.map(t => (
            <span key={t.train_no} style={{
              background: "#fff3cd",
              border: "1px solid #ffeeba",
              padding: "6px 10px",
              borderRadius: 999,
              fontSize: 13
            }}>{t.train_no} {t.name}</span>
          ))}
        </div>
      </section>

      {/* Conflict Alerts */}
      <section style={{ marginTop: 32 }}>
        <h3>⚠️ Conflict Alerts</h3>
        {conflicts.length === 0 && <div>No active conflicts</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {conflicts.map(conf => (
            <div key={conf.conflict_id} style={{
              border: "1px solid #f5c6cb",
              background: "#fff5f5",
              padding: 16,
              borderRadius: 12
            }}>
              <div style={{ fontWeight: "bold" }}>
                {conf.conflict_id} — {conf.conflict_type} ({conf.severity})
              </div>
              <div>Section: {conf.section_id} | Detected: {conf.detected_time}</div>
              <div style={{ marginTop: 6 }}>
                <strong>Involved:</strong> {conf.trains_involved.join(", ")}
              </div>
              <div style={{ marginTop: 6 }}>
                <strong>Suggestions:</strong>
                <ol>
                  {conf.suggestions.map((s, i) => (
                    <li key={i}>{s} <button onClick={() => applySuggestion(conf.conflict_id, s)} disabled={!!applying[conf.conflict_id]} style={{
                      marginLeft: 8,
                      padding: "2px 8px",
                      fontSize: 12,
                      cursor: "pointer"
                    }}>{applying[conf.conflict_id] ? "Applying..." : "Apply"}</button></li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
