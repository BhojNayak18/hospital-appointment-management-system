import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientRegister() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [uniqueId, setUniqueId] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !gender || !dob || !uniqueId) {
      alert("Please fill all fields");
      return;
    }

    const newPatient = {
      id: "pat_" + Date.now(),
      name,
      gender,
      dob,
      uniqueId,
    };

    const existing = JSON.parse(localStorage.getItem("patients")) || [];
    const updated = [...existing, newPatient];
    localStorage.setItem("patients", JSON.stringify(updated));
    localStorage.setItem("currentPatientId", newPatient.id);

    alert("Patient registered successfully!");
    navigate("/patient");
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}
    >
      <form onSubmit={handleSubmit}>
        <h2>Patient Registration</h2>

        <div>
          <label>Name:</label>
          <br />
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label>Gender:</label>
          <br />
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Date of Birth:</label>
          <br />
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div>
          <label>Unique ID (Aadhar, Passport etc.):</label>
          <br />
          <input
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
