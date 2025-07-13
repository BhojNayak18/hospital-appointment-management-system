import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientLogin() {
  const [uniqueId, setUniqueId] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    const matchedPatient = storedPatients.find((p) => p.uniqueId === uniqueId);

    if (!matchedPatient) {
      alert("Patient not found. Please register first.");
      return;
    }

    localStorage.setItem("currentPatientId", matchedPatient.id);
    alert("Login successful!");
    navigate("/patient");
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
    >
      <h2>Patient Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Enter Unique ID (Aadhar/Passport):</label>
          <br />
          <input
            type="text"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
