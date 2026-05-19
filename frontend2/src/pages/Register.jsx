import { useState } from "react";
import API from "../api/api";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "USER"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    await API.post("/api/auth/register", form);
    alert("Registered");
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <input name="firstName" placeholder="First name" onChange={handleChange} />
      <input name="lastName" placeholder="Last name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />

      {/* ROLE SELECT */}
      <select name="role" onChange={handleChange}>
        <option value="USER">User (Pet Owner)</option>
        <option value="HOST">Host (Hotel Owner)</option>
      </select>

      <button className="btn" onClick={submit}>
        Register
      </button>
    </div>
  );
}
