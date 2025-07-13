import React, { useState } from "react";

// You can move this to a constants file if needed
const allDepartments = [
  "Cardiology",
  "Orthopedics",
  "Pediatrics",
  "Neurology",
  "Dermatology",
];

export default function HospitalForm({ onAddHospital }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [selectedDepts, setSelectedDepts] = useState([]);

  const handleCheckboxChange = (dept) => {
    if (selectedDepts.includes(dept)) {
      setSelectedDepts(selectedDepts.filter((d) => d !== dept));
    } else {
      setSelectedDepts([...selectedDepts, dept]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !location || selectedDepts.length === 0) {
      alert("Please fill all fields and select at least one department");
      return;
    }

    const newHospital = {
      id: "hosp_" + Date.now(),
      name,
      location,
      departments: selectedDepts,
    };

    // Let AdminDashboard handle saving and ownership
    onAddHospital(newHospital);

    // Reset form
    setName("");
    setLocation("");
    setSelectedDepts([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register New Hospital</h3>

      <div>
        <label>Hospital Name:</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Location:</label>
        <br />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div>
        <label>Departments:</label>
        <br />
        {allDepartments.map((dept) => (
          <label key={dept} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={selectedDepts.includes(dept)}
              onChange={() => handleCheckboxChange(dept)}
            />
            {dept}
          </label>
        ))}
      </div>

      <button type="submit">Add Hospital</button>
    </form>
  );
}
