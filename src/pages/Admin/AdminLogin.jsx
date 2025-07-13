import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const handleLogin = () => {
    const hardcodedAdmin = {
      id: "admin_1",
      name: "Super Admin",
      email: "admin@example.com",
    };

    localStorage.setItem("currentAdminId", hardcodedAdmin.id);
    localStorage.setItem("admins", JSON.stringify([hardcodedAdmin]));
    navigate("/admin");
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
    >
      <h2>Login as Admin</h2>
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Enter Admin Dashboard
      </button>
    </div>
  );
}
