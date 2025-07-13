import React, { useState } from "react";
import HospitalForm from "../../components/forms/HospitalForm";
import { doctors } from "../../data/mockData";

export default function AdminDashboard() {
  // Load session and hospital data
  const [hospitals, setHospitals] = useState(
    JSON.parse(localStorage.getItem("hospitals")) || []
  );

  const currentAdminId = localStorage.getItem("currentAdminId");
  const storedAppointments =
    JSON.parse(localStorage.getItem("appointments")) || [];
  const storedAdmins = JSON.parse(localStorage.getItem("admins")) || [];

  if (!currentAdminId) {
    return <p>Please login as an admin first.</p>;
  }

  const currentAdmin = storedAdmins.find((a) => a.id === currentAdminId);
  const adminHospitals = hospitals.filter(
    (h) => h.createdBy === currentAdminId
  );

  const handleAddHospital = (hospital) => {
    const hospitalWithOwner = {
      ...hospital,
      createdBy: currentAdminId,
    };

    const updated = [...hospitals, hospitalWithOwner];
    setHospitals(updated);
    localStorage.setItem("hospitals", JSON.stringify(updated));
  };

  const getHospitalStats = (hospitalId) => {
    const relatedAppointments = storedAppointments.filter(
      (appt) => appt.hospitalId === hospitalId
    );

    const totalRevenue = relatedAppointments.reduce(
      (sum, appt) => sum + appt.fee,
      0
    );

    const revenueByDoctor = {};
    const revenueByDepartment = {};

    relatedAppointments.forEach((appt) => {
      revenueByDoctor[appt.doctorId] =
        (revenueByDoctor[appt.doctorId] || 0) + appt.fee;

      const dept = appt.department || "Unknown";
      revenueByDepartment[dept] = (revenueByDepartment[dept] || 0) + appt.fee;
    });

    return {
      totalConsultations: relatedAppointments.length,
      totalRevenue,
      revenueByDoctor,
      revenueByDepartment,
    };
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}
    >
      <h2>Admin Dashboard</h2>
      <h3>Welcome, {currentAdmin?.name || "Admin"}!</h3>

      <button
        onClick={() => {
          localStorage.removeItem("currentAdminId");
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

      <HospitalForm onAddHospital={handleAddHospital} />

      <h3>Your Hospitals</h3>
      {adminHospitals.length === 0 ? (
        <p>No hospitals registered yet.</p>
      ) : (
        adminHospitals.map((hosp) => {
          const stats = getHospitalStats(hosp.id);
          return (
            <div key={hosp.id} style={{ marginBottom: "20px" }}>
              <h4>
                {hosp.name} ({hosp.location})
              </h4>
              <p>Departments: {hosp.departments.join(", ")}</p>
              <p>Total Consultations: {stats.totalConsultations}</p>
              <p>Total Revenue: ₹{stats.totalRevenue}</p>

              <strong>Revenue by Doctor:</strong>
              <ul>
                {Object.entries(stats.revenueByDoctor).map(
                  ([docId, amount]) => {
                    const doc = doctors.find((d) => d.id === docId);
                    return (
                      <li key={docId}>
                        {doc?.name || docId}: ₹{amount}
                      </li>
                    );
                  }
                )}
              </ul>

              <strong>Revenue by Department:</strong>
              <ul>
                {Object.entries(stats.revenueByDepartment).map(
                  ([dept, amount]) => (
                    <li key={dept}>
                      {dept}: ₹{amount}
                    </li>
                  )
                )}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
}
