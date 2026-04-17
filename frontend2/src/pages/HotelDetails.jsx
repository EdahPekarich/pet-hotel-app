import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    API.get("/hotels").then((res) => {
      const found = res.data.find((h) => h._id === id);
      setHotel(found);
      API.get(`/hotels/${id}/booked-dates`)
  .then(res => setBookedDates(res.data));
    });
  }, [id]);
const isDateBlocked = (date) => {
  return bookedDates.some(b => {
    const start = new Date(b.checkIn);
    const end = new Date(b.checkOut);
    const d = new Date(date);

    return d >= start && d <= end;
  });
};
  const book = async () => {
  if (isDateBlocked(checkIn) || isDateBlocked(checkOut)) {
    return alert("These dates are already booked");
  }

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    await API.post("/bookings", {
      hotelId: id,
      checkIn,
      checkOut,
    }, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    alert("Booking sent!");
  } catch (err) {
    alert(err.response?.data?.message || "Error");
  }
};

  if (!hotel) return <p>Loading...</p>;

  return (
  <div style={{
    maxWidth: 1100,
    margin: "0 auto",
    padding: "40px 20px",
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 30
  }}>

    {/* LEFT SIDE */}
    <div>
      <div style={{
        height: 300,
        borderRadius: 16,
        background: "#eee",
        marginBottom: 20
      }} />

      <h1 style={{ fontSize: 32, marginBottom: 5 }}>
        {hotel.name}
      </h1>

      <p style={{ color: "#666", marginBottom: 10 }}>
        📍 {hotel.location?.city}
      </p>

      <p style={{ fontSize: 18, fontWeight: "bold" }}>
        €{hotel.pricePerNight} / night
      </p>

      <div style={{
        marginTop: 20,
        padding: 15,
        borderRadius: 12,
        background: "#fafafa",
        border: "1px solid #eee"
      }}>
        <p style={{ margin: 0 }}>
          🐾 Perfect stay for your pet in a safe and comfortable environment.
        </p>
      </div>
    </div>

    {/* RIGHT SIDE - BOOKING CARD */}
    <div style={{
      position: "sticky",
      top: 20,
      border: "1px solid #eee",
      borderRadius: 16,
      padding: 20,
      background: "white",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
    }}>

      <h3 style={{ marginBottom: 15 }}>Book your stay</h3>

      <label style={{ fontSize: 12, color: "#666" }}>Check-in</label>
      <input
        type="date"
        onChange={(e) => setCheckIn(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
          border: "1px solid #ddd"
        }}
      />

      <label style={{ fontSize: 12, color: "#666" }}>Check-out</label>
      <input
        type="date"
        onChange={(e) => setCheckOut(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 15,
          borderRadius: 8,
          border: "1px solid #ddd"
        }}
      />

      {/* Availability warning */}
      {checkIn && checkOut && (
        <div style={{
          padding: 10,
          borderRadius: 8,
          background: isDateBlocked(checkIn) || isDateBlocked(checkOut)
            ? "#ffe5e5"
            : "#e8fff0",
          color: isDateBlocked(checkIn) || isDateBlocked(checkOut)
            ? "#c00"
            : "#1a7f37",
          fontSize: 13,
          marginBottom: 10
        }}>
          {isDateBlocked(checkIn) || isDateBlocked(checkOut)
            ? "⚠ These dates are not available"
            : "✓ Dates are available"}
        </div>
      )}

      <button
        onClick={book}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 10,
          border: "none",
          background: "#000",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Book now
      </button>
    </div>
  </div>
);
}