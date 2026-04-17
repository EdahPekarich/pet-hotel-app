import { useEffect, useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
const approve = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));

  await API.put(`/bookings/${id}/approve`, {}, {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });

  window.location.reload();
};
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    API.get("/bookings/host", {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }).then(res => setBookings(res.data));
  }, []);

  return (
  <div style={{
    maxWidth: 1000,
    margin: "0 auto",
    padding: 30
  }}>

    <h2 style={{ fontSize: 28, marginBottom: 20 }}>
      🏨 Host Dashboard
    </h2>

    {bookings.length === 0 && (
      <p style={{ color: "#666" }}>No bookings yet</p>
    )}

    <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
      {bookings.map(b => (
        <div
          key={b._id}
          style={{
            border: "1px solid #eee",
            borderRadius: 16,
            padding: 20,
            background: "white",
            boxShadow: "0 5px 20px rgba(0,0,0,0.05)"
          }}
        >

          {/* TOP INFO */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <h3 style={{ margin: 0 }}>
              {b.hotel.name}
            </h3>

            <span style={{
              padding: "5px 10px",
              borderRadius: 20,
              fontSize: 12,
              background:
                b.status === "APPROVED" ? "#e6f9ed" :
                b.status === "REJECTED" ? "#ffe5e5" :
                "#fff6e5",
              color:
                b.status === "APPROVED" ? "#1a7f37" :
                b.status === "REJECTED" ? "#c00" :
                "#b26a00"
            }}>
              {b.status}
            </span>
          </div>

          {/* USER INFO */}
          <p style={{ marginTop: 10, color: "#666" }}>
            👤 {b.user.email}
          </p>

          {/* DATES */}
          <p style={{ marginTop: 5 }}>
            📅 {new Date(b.checkIn).toLocaleDateString()} →{" "}
            {new Date(b.checkOut).toLocaleDateString()}
          </p>

          {/* ACTIONS */}
          {b.status === "PENDING" && (
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>

              <button
                onClick={async () => {
                  const user = JSON.parse(localStorage.getItem("user"));
                  await API.put(`/bookings/${b._id}/approve`, {}, {
                    headers: { Authorization: `Bearer ${user.token}` }
                  });

                  setBookings(prev =>
                    prev.map(x =>
                      x._id === b._id ? { ...x, status: "APPROVED" } : x
                    )
                  );
                }}
                style={{
                  padding: "8px 12px",
                  borderRadius: 10,
                  border: "none",
                  background: "#000",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Approve
              </button>

              <button
                onClick={async () => {
                  const user = JSON.parse(localStorage.getItem("user"));
                  await API.put(`/bookings/${b._id}/reject`, {}, {
                    headers: { Authorization: `Bearer ${user.token}` }
                  });

                  setBookings(prev =>
                    prev.map(x =>
                      x._id === b._id ? { ...x, status: "REJECTED" } : x
                    )
                  );
                }}
                style={{
                  padding: "8px 12px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "white",
                  cursor: "pointer"
                }}
              >
                Reject
              </button>

            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
}