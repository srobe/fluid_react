import React from 'react'; // Ensure React is imported
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet CSS is imported

const MapViewer = ({ onClose }) => {
  const position = [38.9072, -77.0369]; // Default center (Washington, D.C.)

  return (
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
        </MapContainer>
  );
};

export default MapViewer;
