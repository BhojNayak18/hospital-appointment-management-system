import React, { useState } from "react";

export default function DoctorDashboard() {
  const [newHospitalId, setNewHospitalId] = useState("");
  const [newFee, setNewFee] = useState("");
  const [editedFees, setEditedFees] = useState({});

  const doctorId = localStorage.getItem("currentDoctorId");
  const storedDoctors = JSON.parse(localStorage.getItem("doctors")) || [];
  const storedAppointments =
    JSON.parse(localStorage.getItem("appointments")) || [];
  const hospitals = JSON.parse(localStorage.getItem("hospitals")) || [];

  if (!doctorId) return <p>Please login as a doctor first.</p>;

  const doctor = storedDoctors.find((doc) => doc.id === doctorId);
  if (!doctor) return <p>Doctor not found. Please login again.</p>;

  const handleAddHospital = () => {
    if (!newHospitalId || !newFee) {
      alert("Select hospital and enter fee");
      return;
    }

    const updatedDoctor = { ...doctor };
    updatedDoctor.associatedHospitals.push({
      hospitalId: newHospitalId,
      consultationFee: parseInt(newFee),
      availability: [],
    });

    const updatedDoctors = storedDoctors.map((d) =>
      d.id === doctorId ? updatedDoctor : d
    );

    localStorage.setItem("doctors", JSON.stringify(updatedDoctors));
    alert("Hospital added successfully!");
    window.location.reload();
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

  const handleAddSlot = (hospitalId, newSlot) => {
    const updatedDoctor = { ...doctor };

    const conflict = updatedDoctor.associatedHospitals
      .flatMap((h) => h.availability)
      .some((slot) => isOverlapping(slot, newSlot));

    if (conflict) {
      alert("This slot overlaps with an existing one.");
      return;
    }

    const assoc = updatedDoctor.associatedHospitals.find(
      (h) => h.hospitalId === hospitalId
    );
    assoc.availability.push(newSlot);

    const updatedDoctors = storedDoctors.map((d) =>
      d.id === doctorId ? updatedDoctor : d
    );
    localStorage.setItem("doctors", JSON.stringify(updatedDoctors));
    window.location.reload();
  };

  const handleDeleteSlot = (hospitalId, index) => {
    const updatedDoctor = { ...doctor };
    const assoc = updatedDoctor.associatedHospitals.find(
      (h) => h.hospitalId === hospitalId
    );
    assoc.availability.splice(index, 1);

    const updatedDoctors = storedDoctors.map((d) =>
      d.id === doctorId ? updatedDoctor : d
    );

    localStorage.setItem("doctors", JSON.stringify(updatedDoctors));
    window.location.reload();
  };

  const handleFeeUpdate = (hospitalId) => {
    const newFee = parseInt(editedFees[hospitalId]);
    if (!newFee || isNaN(newFee)) {
      alert("Please enter a valid fee");
      return;
    }

    const updatedDoctor = { ...doctor };
    const assoc = updatedDoctor.associatedHospitals.find(
      (h) => h.hospitalId === hospitalId
    );
    assoc.consultationFee = newFee;

    const updatedDoctors = storedDoctors.map((d) =>
      d.id === doctorId ? updatedDoctor : d
    );

    localStorage.setItem("doctors", JSON.stringify(updatedDoctors));
    alert("Fee updated!");
    window.location.reload();
  };

  const myAppointments = storedAppointments.filter(
    (appt) => appt.doctorId === doctorId
  );

  const totalEarnings = myAppointments.reduce(
    (sum, appt) => sum + appt.fee * 0.6,
    0
  );

  const earningsByHospital = {};
  myAppointments.forEach((appt) => {
    const hospId = appt.hospitalId;
    const amount = appt.fee * 0.6;
    earningsByHospital[hospId] = (earningsByHospital[hospId] || 0) + amount;
  });

  return (
    <div
      className="container"
      style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}
    >
      <h2>Welcome, {doctor.name}!</h2>

      <button
        onClick={() => {
          localStorage.removeItem("currentDoctorId");
          window.location.href = "/";
        }}
        style={{
          marginBottom: "20px",
          backgroundColor: "red",
          color: "white",
          padding: "6px 12px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Log Out
      </button>

      <h2>Doctor Dashboard</h2>
      <p>
        <strong>Total Consultations:</strong> {myAppointments.length}
      </p>
      <p>
        <strong>Total Earnings (60%):</strong> ₹{totalEarnings}
      </p>

      <h3>Earnings by Hospital:</h3>
      <ul>
        {Object.entries(earningsByHospital).map(([hospId, amount]) => {
          const hosp = hospitals.find((h) => h.id === hospId);
          return (
            <li key={hospId}>
              {hosp?.name || hospId}: ₹{amount}
            </li>
          );
        })}
      </ul>

      <h3>Associate with a New Hospital</h3>
      <select
        value={newHospitalId}
        onChange={(e) => setNewHospitalId(e.target.value)}
      >
        <option value="">-- Select Hospital --</option>
        {hospitals
          .filter(
            (h) =>
              !doctor.associatedHospitals.some((a) => a.hospitalId === h.id)
          )
          .map((h) => (
            <option key={h.id} value={h.id}>
              {h.name} ({h.location})
            </option>
          ))}
      </select>

      <input
        type="number"
        placeholder="Consultation Fee"
        value={newFee}
        onChange={(e) => setNewFee(e.target.value)}
      />
      <button onClick={handleAddHospital}>Add Hospital</button>

      <h3>Edit Availability & Fees</h3>
      {doctor.associatedHospitals.map((assoc) => {
        const hosp = hospitals.find((h) => h.id === assoc.hospitalId);
        return (
          <div key={assoc.hospitalId} style={{ marginBottom: "20px" }}>
            <h4>{hosp?.name}</h4>
            <p>
              Consultation Fee: ₹{assoc.consultationFee}
              <br />
              <input
                type="number"
                placeholder="Update Fee"
                value={editedFees[assoc.hospitalId] || ""}
                onChange={(e) =>
                  setEditedFees({
                    ...editedFees,
                    [assoc.hospitalId]: e.target.value,
                  })
                }
                style={{ width: "120px", marginRight: "8px", marginTop: "4px" }}
              />
              <button onClick={() => handleFeeUpdate(assoc.hospitalId)}>
                Update Fee
              </button>
            </p>

            <ul>
              {assoc.availability.map((slot, idx) => (
                <li key={idx}>
                  {slot.date} - {slot.startTime} to {slot.endTime}{" "}
                  <button
                    onClick={() => handleDeleteSlot(assoc.hospitalId, idx)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const date = e.target.date.value;
                const startTime = e.target.startTime.value;
                const endTime = e.target.endTime.value;
                handleAddSlot(assoc.hospitalId, { date, startTime, endTime });
                e.target.reset();
              }}
              style={{ marginTop: "10px" }}
            >
              <label>
                Date:
                <input type="date" name="date" required />
              </label>
              <label style={{ marginLeft: "10px" }}>
                Start:
                <input type="time" name="startTime" required />
              </label>
              <label style={{ marginLeft: "10px" }}>
                End:
                <input type="time" name="endTime" required />
              </label>
              <button type="submit" style={{ marginLeft: "10px" }}>
                Add Slot
              </button>
            </form>
          </div>
        );
      })}
    </div>
  );
}
