import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div
      className="container"
      style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}
    >
      <h1>Hospital & Appointment Management System</h1>
      <p>Select your role to get started:</p>

      <h3>Admin</h3>
      <ul>
        <li>
          <Link to="/login-admin">Login as Admin</Link>
        </li>
      </ul>

      <h3>Doctor</h3>
      <ul>
        <li>
          <Link to="/register-doctor">Register as Doctor</Link>
        </li>
        <li>
          <Link to="/login-doctor">Login as Doctor</Link>
        </li>
      </ul>

      <h3>Patient</h3>
      <ul>
        <li>
          <Link to="/register-patient">Register as Patient</Link>
        </li>
        <li>
          <Link to="/login-patient">Login as Patient</Link>
        </li>
      </ul>
    </div>
  );
}
