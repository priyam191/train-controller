import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Train icon
const trainIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/747/747310.png",
  iconSize: [28, 28],
});

// Hardcoded station coordinates (you can extend this list)
const stationCoords = {
  Santragachi: [22.5701, 88.3067],
  Kharagpur: [22.3400, 87.3250],
  Uluberia: [22.4746, 88.1056],
  Howrah: [22.5958, 88.2636],
};

// API base
const API_URL = "https://train-controller-backend.onrender.com/api";
 // backend route

export default function TrainMap() {
  const [trains, setTrains] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/trains`);
      const data = await res.json();
      setTrains(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch train data", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Train Movement Map</h3>
      <MapContainer
        center={[22.57, 88.36]} // centered near Howrah/Santragachi
        zoom={8}
        style={{ height: "500px", width: "100%", borderRadius: "12px" }}
      >
        {/* Map base tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* Draw line between stations (for visualization of section) */}
        <Polyline
          positions={[
            stationCoords.Santragachi,
            stationCoords.Uluberia,
            stationCoords.Kharagpur,
          ]}
          color="blue"
        />

        {/* Place trains */}
        {trains.map((train) => {
          const coords = stationCoords[train.current_station];
          if (!coords) return null; // skip if no mapping

          return (
            <Marker key={train.train_no} position={coords} icon={trainIcon}>
              <Popup>
                <b>{train.train_no} — {train.name}</b> <br />
                Type: {train.type} | Priority: {train.priority} <br />
                Status: {train.status} <br />
                Current: {train.current_station} → Next: {train.next_station} <br />
                Delay: {train.delay_minutes} min <br />
                Scheduled Departure: {train.scheduled_departure}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
