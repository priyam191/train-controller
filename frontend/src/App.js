import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import WhatIf from "./pages/WhatIf";


function App() {
  return (
    <Router>
      {/* Show Navbar only after login */}
      <Routes>
        {/* Login page (no navbar) */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard page (with navbar) */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/what-if"
          element={
            <>
              <Navbar />
              <WhatIf />
            </>
          }
        />


        {/* Default route (redirect to login) */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
