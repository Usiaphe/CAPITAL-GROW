import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    confirmEmail: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (form.email !== form.confirmEmail) {
      alert("Emails do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(
      (u) => u.email === form.email || u.username === form.username
    );

    if (exists) {
      alert("User already exists");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    navigate("/login");
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>AUTO-CAPITAL</h2>

        <input name="fullName" placeholder="Your Full Name" onChange={handleChange} required />
        <input name="username" placeholder="Your Username" onChange={handleChange} required />

        <input type="password" name="password" placeholder="Define Password" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Retype Password" onChange={handleChange} required />

        <input type="email" name="email" placeholder="Your E-mail Address" onChange={handleChange} required />
        <input type="email" name="confirmEmail" placeholder="Retype Your E-mail" onChange={handleChange} required />

        <button type="submit">Register</button>

        <p onClick={() => navigate("/login")} className="switch">
          Already have an account? Login
        </p>
      </form>
    </div>
  );
};

export default Register;