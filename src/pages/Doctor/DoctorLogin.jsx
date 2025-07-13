import React, { useState } from "react";

export default function DoctorLogin() {
  const [selectedDoctorId, setSelectedDoctorId] = useState("");

  const storedDoctors = JSON.parse(localStorage.getItem("doctors")) || [];

  const handleLogin = () => {
    if (!selectedDoctorId) {
      alert("Please select a doctor to login");
      return;
    }

    localStorage.setItem("currentDoctorId", selectedDoctorId);
    window.location.href = "/doctor";
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}
    >
      <h2>Doctor Login</h2>

      <select
        value={selectedDoctorId}
        onChange={(e) => setSelectedDoctorId(e.target.value)}
      >
        <option value="">-- Select Your Name --</option>
        {storedDoctors.map((doc) => (
          <option key={doc.id} value={doc.id}>
            {doc.name} ({doc.qualifications})
          </option>
        ))}
      </select>

      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
