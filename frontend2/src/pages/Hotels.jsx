import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
export default function Hotels() {
  const [hotels, setHotels] = useState([]);

  const [city, setCity] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    API.get("/api/hotels").then((res) => setHotels(res.data));
  }, []);

  const searchHotels = () => {
    API.get(`/api/hotels?city=${city}&maxPrice=${maxPrice}`)
      .then((res) => setHotels(res.data));
  };

  return (
  <div style={{
    maxWidth: 1200,
    margin: "0 auto",
    padding: "40px 20px"
  }}>

    {/* HERO */}
    <div style={{
      marginBottom: 40,
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: 36, marginBottom: 10 }}>
        🏨 Find Pet Hotels in Europe
      </h1>
      <p style={{ color: "#666", fontSize: 16 }}>
        Search and book the best stays for your pets 🐶🐱
      </p>

      {/* SEARCH CARD */}
      <div style={{
        marginTop: 20,
        display: "flex",
        gap: 10,
        justifyContent: "center",
        flexWrap: "wrap",
        background: "white",
        padding: 15,
        borderRadius: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
      }}>
        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 10,
            border: "1px solid #ddd",
            minWidth: 180
          }}
        />

        <input
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 10,
            border: "1px solid #ddd",
            minWidth: 180
          }}
        />

        <button
          onClick={searchHotels}
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            border: "none",
            background: "#000",
            color: "white",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>
    </div>

    {/* GRID */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: 20
    }}>
      {hotels.map((h) => (
        <div
          key={h._id}
          style={{
            border: "1px solid #eee",
            borderRadius: 16,
            overflow: "hidden",
            background: "white",
            boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
            transition: "0.2s",
            cursor: "pointer"
          }}
        >

          {/* IMAGE PLACEHOLDER */}
          <div style={{
            height: 160,
            background: "#eee"
          }} />

          {/* CONTENT */}
          <div style={{ padding: 15 }}>
            <h3 style={{ marginBottom: 5 }}>
              {h.name}
            </h3>

            <p style={{ color: "#666", fontSize: 14 }}>
              📍 {h.location?.city}
            </p>

            <p style={{ fontWeight: "bold", marginTop: 10 }}>
              €{h.pricePerNight} / night
            </p>

            <Link to={`/api/hotel/${h._id}`}>
              <button style={{
                marginTop: 10,
                width: "100%",
                padding: 10,
                borderRadius: 10,
                border: "none",
                background: "#000",
                color: "white"
              }}>
                View details
              </button>
            </Link>
          </div>

        </div>
      ))}
    </div>
  </div>
);
}
