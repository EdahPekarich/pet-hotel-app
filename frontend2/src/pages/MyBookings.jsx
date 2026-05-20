import { useEffect, useState } from "react";
import API from "../api/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    API.get("/api/bookings/my", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then((res) => setBookings(res.data));
  }, []);

  const now = new Date().getTime();

  const upcoming = bookings.filter(
    (b) => new Date(b.checkIn).getTime() >= now
  );

  const past = bookings.filter(
    (b) => new Date(b.checkOut).getTime() < now
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>My Trips 🐾</h2>

      <h3>🟢 Upcoming Trips</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {upcoming.map((b) => (
          <div key={b._id}>
            <h3>{b.hotel?.name}</h3>
            <p>{b.hotel?.location?.city}</p>
            <p>
              {new Date(b.checkIn).toLocaleDateString()} -{" "}
              {new Date(b.checkOut).toLocaleDateString()}
            </p>
            <p>Status: {b.status}</p>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: 30 }}>🔴 Past Trips</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {past.map((b) => (
          <div key={b._id}>
            <h3>{b.hotel?.name}</h3>
            <p>{b.hotel?.location?.city}</p>
            <p>
              {new Date(b.checkIn).toLocaleDateString()} -{" "}
              {new Date(b.checkOut).toLocaleDateString()}
            </p>
            <p>Status: {b.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
