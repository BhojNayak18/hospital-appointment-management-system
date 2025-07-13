import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";

// Admin
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";

// Doctor
import DoctorRegister from "./pages/Doctor/DoctorRegister";
import DoctorLogin from "./pages/Doctor/DoctorLogin";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";

// Patient
import PatientRegister from "./pages/Patient/PatientRegister";
import PatientLogin from "./pages/Patient/PatientLogin";
import PatientDashboard from "./pages/Patient/PatientDashboard";

function App() {
  // Session checks
  const isAdmin = !!localStorage.getItem("currentAdminId");
  const isDoctor = !!localStorage.getItem("currentDoctorId");
  const isPatient = !!localStorage.getItem("currentPatientId");
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<HomePage />} />

      {/* Admin */}
      <Route path="/login-admin" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={isAdmin ? <AdminDashboard /> : <Navigate to="/login-admin" />}
      />

      {/* Doctor */}
      <Route path="/register-doctor" element={<DoctorRegister />} />
      <Route path="/login-doctor" element={<DoctorLogin />} />
      <Route
        path="/doctor"
        element={
          isDoctor ? <DoctorDashboard /> : <Navigate to="/login-doctor" />
        }
      />

      {/* Patient */}
      <Route path="/register-patient" element={<PatientRegister />} />
      <Route path="/login-patient" element={<PatientLogin />} />
      <Route
        path="/patient"
        element={
          isPatient ? <PatientDashboard /> : <Navigate to="/login-patient" />
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<p>404 - Page Not Found</p>} />
    </Routes>
  );
}

export default App;
