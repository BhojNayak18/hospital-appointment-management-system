import React from "react";
import DoctorForm from "../../components/forms/DoctorForm";

export default function DoctorRegister() {
  return (
    <div
      className="container"
      style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}
    >
      <h2>Doctor Registration</h2>
      <DoctorForm />
    </div>
  );
}
