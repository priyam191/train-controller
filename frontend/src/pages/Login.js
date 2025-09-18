import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [controllerId, setControllerId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hardcoded controller credentials
  const validControllers = [
    { id: "CTRL001", password: "admin123", name: "Section Controller A" },
    { id: "CTRL002", password: "secure456", name: "Section Controller B" }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const user = validControllers.find(
      (c) => c.id === controllerId && c.password === password
    );
    if (user) {
      localStorage.setItem("controllerName", user.name);
      navigate("/dashboard");
    } else {
      setError("Invalid Controller ID or Password");
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('/media/railway.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.8)",
          padding: "40px",
          borderRadius: "12px",
          width: "350px",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/55/Indian_Railways_logo.svg"
          alt="Logo"
          style={{ width: "60px", marginBottom: "10px" }}
        />
        <h2 style={{ marginBottom: "20px" }}>Controller Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Controller ID"
            value={controllerId}
            onChange={(e) => setControllerId(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          {error && <div style={{ color: "red", marginBottom: "12px" }}>{error}</div>}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#000",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
