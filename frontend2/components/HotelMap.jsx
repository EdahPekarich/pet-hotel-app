import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function HotelMap({ hotels }) {
  const center = [48.2082, 16.3738]; // default (Austria)

  return (
    <MapContainer center={center} zoom={6} style={{ height: "500px", width: "100%" }}>
      
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {hotels.map((hotel) => (
        <Marker
          key={hotel._id}
          position={[
            hotel.location?.coordinates?.lat || 48.2,
            hotel.location?.coordinates?.lng || 16.3
          ]}
        >
          <Popup>
            <b>{hotel.name}</b><br />
            €{hotel.pricePerNight}/night
          </Popup>
        </Marker>
      ))}

    </MapContainer>
  );
}