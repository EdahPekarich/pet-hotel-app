import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import API from "../api/api";
import "leaflet/dist/leaflet.css";

export default function HotelMap() {
  const [hotels, setHotels] = useState([]);

useEffect(() => {
  API.get("/api/hotels").then((res) => {
    console.log("HOTELS FROM API:", res.data);
    setHotels(res.data);
  });
}, []);

  return (
    <div style={{ position: "relative" }}>

      {/* TOP BAR */}
      <div style={{
        position: "absolute",
        zIndex: 1000,
        background: "white",
        padding: 10,
        margin: 10,
        borderRadius: 10
      }}>
        🗺️ Pet Hotels Map
      </div>

      {/* MAP */}
      <MapContainer
        center={[46, 14]}
        zoom={5}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {hotels.map((h) => {
          const lat = h.location?.coordinates?.lat;
          const lng = h.location?.coordinates?.lng;

if (lat == null || lng == null) return null;
        
          return (
            <Marker key={h._id} position={[lat, lng]}>
              <Popup>
                <h3>{h.name}</h3>
                <p>{h.location.city}</p>
                <p>€{h.pricePerNight}</p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
