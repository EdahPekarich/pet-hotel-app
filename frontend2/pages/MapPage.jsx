import { useEffect, useState } from "react";
import HotelMap from "../components/HotelMap";

export default function MapPage() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/hotels")
      .then((res) => res.json())
      .then((data) => setHotels(data));
  }, []);

  return (
    <div>
      <h1>Hotels Map</h1>
      <HotelMap hotels={hotels} />
    </div>
  );
}