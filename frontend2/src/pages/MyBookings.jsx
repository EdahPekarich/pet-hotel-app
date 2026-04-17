import { useEffect, useState } from "react";
import API from "../api/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const now = new Date(); // 🔥 OVDJE DODAJ
  const cardStyle = {
  border: "1px solid #eee",
  borderRadius: 12,
  padding: 15,
  background: "white",
  boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
};

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    API.get("/bookings/my", {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }).then(res => setBookings(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Trips 🐾</h2>

<h3>🟢 Upcoming Trips</h3>

<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
  {bookings
    .filter(b => new Date(b.checkIn) >= now)
    .map(b => (
      <div key={b._id} style={cardStyle}>
        <h3>{b.hotel?.name}</h3>
        <p>📍 {b.hotel?.location?.city}</p>

        <p>
          📅 {new Date(b.checkIn).toLocaleDateString()} -{" "}
          {new Date(b.checkOut).toLocaleDateString()}
        </p>

        <p>💰 €{b.totalPrice}</p>

        <p>Status: {b.status}</p>
      </div>
    ))}
</div>

<h3 style={{ marginTop: 30 }}>🔴 Past Trips</h3>

<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
  {bookings
    .filter(b => new Date(b.checkOut) < now)
    .map(b => (
      <div key={b._id} style={cardStyle}>
        <h3>{b.hotel?.name}</h3>
        <p>📍 {b.hotel?.location?.city}</p>

        <p>
          📅 {new Date(b.checkIn).toLocaleDateString()} -{" "}
          {new Date(b.checkOut).toLocaleDateString()}
        </p>

        <p>💰 €{b.totalPrice}</p>

        <p>Status: {b.status}</p>
      </div>
    ))}
</div>
    </div>
  );
}