import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { departments, hospitals as hospitalList } from "../../data/mockData";

export default function DoctorForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const [hospitalId, setHospitalId] = useState("");
  const [fee, setFee] = useState("");
  const [availability, setAvailability] = useState([]);

  const handleSpecializationToggle = (dept) => {
    setSpecializations((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const isOverlapping = (slotA, slotB) => {
    return (
      slotA.date === slotB.date &&
      ((slotA.startTime < slotB.endTime &&
        slotA.startTime >= slotB.startTime) ||
        (slotA.endTime > slotB.startTime && slotA.endTime <= slotB.endTime) ||
        (slotA.startTime <= slotB.startTime && slotA.endTime >= slotB.endTime))
    );
  };

  const handleAddSlot = () => {
    const date = prompt("Enter date (YYYY-MM-DD):");
    const startTime = prompt("Enter start time (HH:MM):");
    const endTime = prompt("Enter end time (HH:MM):");

    if (!date || !startTime || !endTime) return;

    const newSlot = { date, startTime, endTime };

    const conflict = availability.some((slot) => isOverlapping(slot, newSlot));
    if (conflict) {
      alert("This time slot overlaps with an existing slot.");
      return;
    }

    setAvailability([...availability, newSlot]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name ||
      !qualifications ||
      !experience ||
      !hospitalId ||
      !fee ||
      specializations.length === 0 ||
      availability.length === 0
    ) {
      alert("Please fill all fields");
      return;
    }

    const doctor = {
      id: "doc_" + Date.now(),
      name,
      qualifications,
      experience: parseInt(experience),
      specializations,
      associatedHospitals: [
        {
          hospitalId,
          consultationFee: parseInt(fee),
          availability,
        },
      ],
    };

    const existing = JSON.parse(localStorage.getItem("doctors")) || [];
    const updated = [...existing, doctor];
    localStorage.setItem("doctors", JSON.stringify(updated));
    localStorage.setItem("currentDoctorId", doctor.id);
    alert("Doctor registered successfully!");
    navigate("/doctor");

    // Reset
    setName("");
    setQualifications("");
    setExperience("");
    setFee("");
    setHospitalId("");
    setSpecializations([]);
    setAvailability([]);
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}
    >
      <form onSubmit={handleSubmit}>
        <h3>Register Doctor</h3>

        <div>
          <label>Name:</label>
          <br />
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label>Qualifications:</label>
          <br />
          <input
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
          />
        </div>

        <div>
          <label>Years of Experience:</label>
          <br />
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>

        <div>
          <label>Specializations:</label>
          <br />
          {departments.map((dept) => (
            <label key={dept} style={{ marginRight: "10px" }}>
              <input
                type="checkbox"
                checked={specializations.includes(dept)}
                onChange={() => handleSpecializationToggle(dept)}
              />
              {dept}
            </label>
          ))}
        </div>

        <div>
          <label>Associate Hospital:</label>
          <br />
          <select
            value={hospitalId}
            onChange={(e) => setHospitalId(e.target.value)}
          >
            <option value="">-- Select Hospital --</option>
            {hospitalList.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name} ({h.location})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Consultation Fee (₹):</label>
          <br />
          <input
            type="number"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
          />
        </div>

        <div>
          <label>Availability Slots:</label>
          <br />
          <button type="button" onClick={handleAddSlot}>
            Add Slot
          </button>
          <ul>
            {availability.map((slot, index) => (
              <li key={index}>
                {slot.date} – {slot.startTime} to {slot.endTime}
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Register Doctor</button>
      </form>
    </div>
  );
}
