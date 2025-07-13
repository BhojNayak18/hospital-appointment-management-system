# Hospital & Appointment Management System

A simplified yet robust system for managing hospitals, doctors, patients, and appointments — built using **React with Vite**. Designed as an interview assignment to demonstrate system design, data modeling, UI flow, and modern localStorage-based state management.

---

## 🚀 Features

### 👤 Admin

- Login via a single direct entry (no registration)
- Add new hospitals with name, location, and departments
- View stats: revenue per hospital, per department, and per doctor
- All hospitals are persisted and available to doctors/patients

### 🩺 Doctor

- Register with name, qualifications, specializations, and experience
- Associate with multiple hospitals (only if specialization matches hospital departments)
- Set different consultation fees per hospital
- Add/edit availability slots (date + time) per hospital
- View total earnings and breakdown per hospital

### 🧑‍🤝‍🧑 Patient

- Register with name, gender, DOB, and unique ID
- Search doctors by specialization, hospital, and availability
- View doctor’s available slots and fees
- Book appointments and track full consultation history

---

## 🛠 Tech Stack

- React (with Vite)
- JavaScript
- localStorage (for state persistence)
- No backend or database
- No payment gateway (fee input is manual at booking)

---

## 📁 Folder Structure
