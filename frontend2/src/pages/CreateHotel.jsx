import { useState } from "react";
import API from "../api/api";

export default function CreateHotel() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    country: "",
    pricePerNight: "",
    capacity: ""
  });

  const create = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await API.post(
        "/api/hotels",
        {
          name: form.name,
          pricePerNight: Number(form.pricePerNight),
          capacity: Number(form.capacity),
          location: {
            city: form.city,
            country: form.country
          }
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );

      alert("🏨 Hotel created!");

      setForm({
        name: "",
        city: "",
        country: "",
        pricePerNight: "",
        capacity: ""
      });

    } catch (err) {
      alert(err.response?.data?.message || "Error creating hotel");
    }
  };

  return (
    <div style={{
      maxWidth: 700,
      margin: "0 auto",
      padding: 40
    }}>

      <h2 style={{ fontSize: 28, marginBottom: 20 }}>
        🏨 Create Your Pet Hotel
      </h2>

      <div style={{
        display: "grid",
        gap: 15,
        padding: 20,
        border: "1px solid #eee",
        borderRadius: 16,
        background: "white",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
      }}>

        <input
          placeholder="Hotel name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
        />

        <input
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          style={inputStyle}
        />

        <input
          placeholder="Country"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          style={inputStyle}
        />

        <input
          placeholder="Price per night (€)"
          type="number"
          value={form.pricePerNight}
          onChange={(e) =>
            setForm({ ...form, pricePerNight: e.target.value })
          }
          style={inputStyle}
        />

        <input
          placeholder="Capacity"
          type="number"
          value={form.capacity}
          onChange={(e) =>
            setForm({ ...form, capacity: e.target.value })
          }
          style={inputStyle}
        />

        <button
          onClick={create}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "none",
            background: "#000",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Create hotel
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #ddd",
  outline: "none"
};
