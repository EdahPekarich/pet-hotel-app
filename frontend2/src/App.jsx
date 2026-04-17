import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Hotels from "./pages/Hotels";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HotelMap from "./pages/HotelMap";
import Dashboard from "./pages/Dashboard";
import CreateHotel from "./pages/CreateHotel";
import HotelDetails from "./pages/HotelDetails";
import MyBookings from "./pages/MyBookings";
export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 25px",
        background: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
      }}>
        <h2>🐾 PetStay</h2>

        <div style={{ display: "flex", gap: 15 }}>
  <Link to="/">Hotels</Link>
  <Link to="/map">Map</Link>
  <Link to="/login">Login</Link>
  <Link to="/register">Register</Link>

  {user && <Link to="/my-bookings">My Trips</Link>}

  {user?.user?.role === "HOST" && (
    <>
      <Link to="/create-hotel">Create Hotel</Link>
      <Link to="/dashboard">Dashboard</Link>
    </>
  )}
</div>
      </div>

      <Routes>
  <Route path="/" element={<Hotels />} />
  <Route path="/map" element={<HotelMap />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/hotel/:id" element={<HotelDetails />} />
  <Route path="/my-bookings" element={<MyBookings />} />

  {user?.user?.role === "HOST" && (
    <>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-hotel" element={<CreateHotel />} />
    </>
  )}
</Routes>
    </BrowserRouter>
  );
}