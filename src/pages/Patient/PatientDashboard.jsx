import React, { useState } from "react";

export default function PatientDashboard() {
  const [selectedSpec, setSelectedSpec] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [feeInput, setFeeInput] = useState("");

  const patientId = localStorage.getItem("currentPatientId");
  if (!patientId) return <p>Please login as a patient first.</p>;

  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const currentPatient = patients.find((p) => p.id === patientId);
  if (!currentPatient) return <p>Patient not found.</p>;

  const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
  const hospitals = JSON.parse(localStorage.getItem("hospitals")) || [];
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  const handleBook = () => {
    if (!selectedDoctor || !selectedSlot || !feeInput) {
      alert("Please fill all booking details");
      return;
    }

    const newAppointment = {
      id: "appt_" + Date.now(),
      doctorId: selectedDoctor.id,
      patientId,
      hospitalId: selectedSlot.hospitalId,
      timeSlot: {
        date: selectedSlot.date,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
      },
      fee: parseInt(feeInput),
      department: selectedSpec,
    };

    const existing = [...appointments];

    const isAlreadyBooked = existing.some(
      (appt) =>
        appt.doctorId === newAppointment.doctorId &&
        appt.hospitalId === newAppointment.hospitalId &&
        appt.timeSlot.date === newAppointment.timeSlot.date &&
        appt.timeSlot.startTime === newAppointment.timeSlot.startTime
    );

    if (isAlreadyBooked) {
      alert("This time slot is already booked.");
      return;
    }

    const updatedAppointments = [...existing, newAppointment];
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    alert("Appointment booked!");
    setSelectedSlot(null);
    setSelectedDoctor(null);
    setFeeInput("");
  };

  const getHospitalName = (id) => {
    const hosp = hospitals.find((h) => h.id === id);
    return hosp ? hosp.name : id;
  };

  const allSpecs = [...new Set(doctors.flatMap((d) => d.specializations))];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpec = selectedSpec
      ? doc.specializations.includes(selectedSpec)
      : true;

    const matchesHospital = selectedHospital
      ? doc.associatedHospitals.some((h) => h.hospitalId === selectedHospital)
      : true;

    const matchesDate = selectedDate
      ? doc.associatedHospitals.some((h) =>
          h.availability.some((slot) => slot.date === selectedDate)
        )
      : true;

    return matchesSpec && matchesHospital && matchesDate;
  });

  return (
    <div
      className="container"
      style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}
    >
      <h2>Welcome, {currentPatient.name}!</h2>

      <button
        onClick={() => {
          localStorage.removeItem("currentPatientId");
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

      <h2>Book an Appointment</h2>

      <div>
        <label>Specialization:</label>
        <select
          value={selectedSpec}
          onChange={(e) => setSelectedSpec(e.target.value)}
        >
          <option value="">All</option>
          {allSpecs.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>

        <label>Hospital:</label>
        <select
          value={selectedHospital}
          onChange={(e) => setSelectedHospital(e.target.value)}
        >
          <option value="">All</option>
          {hospitals.map((hosp) => (
            <option key={hosp.id} value={hosp.id}>
              {hosp.name}
            </option>
          ))}
        </select>

        <label>Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <hr />

      <h3>Available Doctors</h3>
      {filteredDoctors.map((doc) => (
        <div
          key={doc.id}
          style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
        >
          <strong>{doc.name}</strong> ({doc.qualifications})<br />
          Specializations: {doc.specializations.join(", ")}
          <br />
          {doc.associatedHospitals.map((assoc) => (
            <div key={assoc.hospitalId}>
              Hospital: {getHospitalName(assoc.hospitalId)} – Fee: ₹
              {assoc.consultationFee}
              <ul>
                {assoc.availability
                  .filter((slot) =>
                    selectedDate ? slot.date === selectedDate : true
                  )
                  .map((slot, idx) => (
                    <li key={idx}>
                      {slot.date} – {slot.startTime} to {slot.endTime}
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                          setSelectedDoctor(doc);
                          setSelectedSlot({
                            ...slot,
                            hospitalId: assoc.hospitalId,
                          });
                          setFeeInput(assoc.consultationFee);
                        }}
                      >
                        Select Slot
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      ))}

      {selectedSlot && selectedDoctor && (
        <div
          style={{
            border: "1px dashed green",
            padding: "10px",
            marginTop: "20px",
          }}
        >
          <h3>Confirm Booking</h3>
          <p>Doctor: {selectedDoctor.name}</p>
          <p>Date: {selectedSlot.date}</p>
          <p>
            Time: {selectedSlot.startTime} – {selectedSlot.endTime}
          </p>
          <p>
            Fee: ₹
            <input
              type="number"
              value={feeInput}
              onChange={(e) => setFeeInput(e.target.value)}
            />
          </p>
          <button onClick={handleBook}>Book Appointment</button>
        </div>
      )}

      <h2>My Appointment History</h2>
      <ul>
        {appointments
          .filter((appt) => appt.patientId === patientId)
          .map((appt) => {
            const doctor = doctors.find((d) => d.id === appt.doctorId);
            const hospital = hospitals.find((h) => h.id === appt.hospitalId);

            return (
              <li key={appt.id} style={{ marginBottom: "10px" }}>
                <strong>{doctor?.name}</strong> at{" "}
                <strong>{hospital?.name}</strong>
                <br />
                Date: {appt.timeSlot.date}, Time: {appt.timeSlot.startTime} -{" "}
                {appt.timeSlot.endTime}
                <br />
                Fee Paid: ₹{appt.fee}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
