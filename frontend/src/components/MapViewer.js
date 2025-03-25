// src/components/MapView.js

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet's default icon path issues with webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// dummy location data
const defaultLocations = {
  dc: {
    name: 'NASA Headquarters',
    coordinates: [38.8830, -77.0161],
    description: 'NASA Headquarters in Washington DC'
  },
  florida: {
    name: 'Kennedy Space Center',
    coordinates: [28.5857, -80.6509],
    description: 'Kennedy Space Center, Florida'
  },
  goddard: {
    name: 'NASA Goddard',
    coordinates: [38.9915, -76.8523],
    description: 'NASA Goddard Space Flight Center'
  }
};

// Component to handle map view changes
const ChangeMapView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const MapViewer = ({ selectedLocation = "goddard", locationsDataUrl = null }) => {
  const [activeLocation, setActiveLocation] = useState(selectedLocation);
  const [locations, setLocations] = useState(defaultLocations);
  const [position, setPosition] = useState(defaultLocations[selectedLocation]?.coordinates || [38.9915, -76.8523]);
  const [zoom, setZoom] = useState(13);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  // Set up the default icon for Leaflet markers
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: icon,
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
  }, []);

  // Load locations from JSON file if URL is provided
  useEffect(() => {
    if (locationsDataUrl) {
      setIsLoading(true);
      fetch(locationsDataUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setLocations(data);
          setIsLoading(false);
        })
        .catch(error => {
          setError(`Failed to load locations: ${error.message}`);
          setIsLoading(false);
          console.error("Error loading locations:", error);
        });
    }
  }, [locationsDataUrl]);

  // Update position when selected location changes
  useEffect(() => {
    if (locations[selectedLocation]) {
      setActiveLocation(selectedLocation);
      setPosition(locations[selectedLocation].coordinates);
    }
  }, [selectedLocation, locations]);

  // Function to change location
  const changeLocation = (locationKey) => {
    if (locations[locationKey]) {
      setActiveLocation(locationKey);
      setPosition(locations[locationKey].coordinates);
      setZoom(13);
    }
  };

  if (isLoading) return <div>Loading map data...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="map-container">
      <div className="mb-4 flex space-x-2 flex-wrap">
        {Object.keys(locations).map(key => (
          <button 
            key={key}
            className={`px-3 py-1 rounded-sm mb-2 ${activeLocation === key ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => changeLocation(key)}
          >
            {locations[key].name}
          </button>
        ))}
      </div>
      
      <MapContainer 
        center={position} 
        zoom={zoom} 
        scrollWheelZoom={true} 
        style={{ height: '400px', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Display markers for each location */}
        {Object.entries(locations).map(([key, location]) => (
          <Marker key={key} position={location.coordinates}>
            <Popup>
              <strong>{location.name}</strong><br />
              {location.description}
            </Popup>
          </Marker>
        ))}
        
        {/* Component to update the map view when position changes */}
        <ChangeMapView center={position} zoom={zoom} />
      </MapContainer>
    </div>
  );
};

export default MapViewer;