import React from "react";

export default function Navbar() {
  return (
    <nav style={{display: "flex", justifyContent: "space-between", alignItems: "center"}} className="w-full flex items-center justify-between px-6 py-3 bg-gray-900 shadow-md">
      {/* Left side: Logo + Title */}
      <div className="flex items-center space-x-3" style={{"display": "flex"}}>
        {/* Logo image */}
        <a href="/dashboard"> <img
          src="/media/logo.jpg" // place your logo inside frontend/public/logo.png
          alt="Margdarshak Logo"
          
          style={{ width: "100px", height: "80px" }}
        /></a>
       
        {/* Title text */}
        <h1 style={{ fontFamily: '"Lucida Console", "Courier New", monospace' }} className="text-white text-2xl font-bold tracking-wide">
          Margdarshak
        </h1>
      </div>

      {/* Right side: Navigation links */}
      <div className="flex items-center space-x-6">
        {/* <a href="/" className="text-gray-300 hover:text-white">
          Dashboard
        </a>
        
        <a href="/conflicts" className="text-gray-300 hover:text-white">
          Conflicts
        </a>
        <a href="/kpis" className="text-gray-300 hover:text-white">
          KPIs
        </a> */}

        <a href="/what-if" className="outlined"
        style={{
                display: "inline-block",
                textDecoration: "none",
                   // MUI primary blue
                color: "black",
                padding: "8px 20px",
                border: "1px solid #2563eb",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "500",
                marginRight: "20px",          // distance from right
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.15)",
            }}>
          What-If 
        </a>
        <a
            href="/login"
            style={{
                display: "inline-block",
                textDecoration: "none",
                backgroundColor: "#2563eb",   // MUI primary blue
                color: "white",
                padding: "8px 20px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "500",
                marginRight: "20px",          // distance from right
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.15)",
                transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1E40AF")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
            >
            Logout
        </a>

        

      </div>
    </nav>
  );
}
