// src/components/MapView.js

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet's default icon path issues with webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import DCGraphImg from '../assets/dc-graph.png';
import FLGraphImg from '../assets/fl-graph.png';
import GraphImg from '../assets/graph.png';

// dummy location data
const defaultLocations = {
  dc: {
    name: 'NASA Headquarters',
    coordinates: [38.8830, -77.0161],
    description: 'NASA Headquarters in Washington DC',
    datagramImage: DCGraphImg, // Fixed - just use the filename string
    category: 'megacities'
  },
  florida: {
    name: 'Kennedy Space Center',
    coordinates: [28.5857, -80.6509],
    description: 'Kennedy Space Center, Florida',
    datagramImage: FLGraphImg,
    category: 'megacities'
  },
  goddard: {
    name: 'NASA Goddard',
    coordinates: [38.9915, -76.8523],
    description: 'NASA Goddard Space Flight Center',
    datagramImage: GraphImg,
    category: 'megacities'
  }
};

// Location categories with "All" category at the beginning
const categories = [
  { id: 'all', label: 'All' },
  { id: 'megacities', label: 'Megacities' },
  { id: 'national', label: 'National' },
  { id: 'world', label: 'World' },
  { id: 'aeronet', label: 'AERONET' },
  { id: 'campaigns', label: 'Active Campaigns' },
  { id: 'tccon', label: 'TCCON' },
  { id: 'obspack', label: 'NOAA OBSPACK' }
];

// Component to handle map view changes
const ChangeMapView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const MapViewer = ({ 
  selectedLocation = "goddard", 
  locationsDataUrl = null,
  onViewDatagram = () => {} // Add callback function for viewing datagrams
}) => {
  const [activeLocation, setActiveLocation] = useState(selectedLocation);
  const [locations, setLocations] = useState(defaultLocations);
  const [position, setPosition] = useState(defaultLocations[selectedLocation]?.coordinates || [38.9915, -76.8523]);
  const [zoom, setZoom] = useState(13);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
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

  // Function to handle viewing a datagram
  const handleViewDatagram = (image) => {
    // Call the parent component's function with the image path
    console.log("Sending image to parent:", image); // Debugging log
    if (onViewDatagram) {
      onViewDatagram(image);  // ✅ Ensure it properly updates the parent state
    }
  };
  
  // Get locations by category
  const getLocationsByCategory = (category) => {
    // For "all" category, return all locations
    if (category === 'all') {
      return Object.entries(locations);
    }
    
    // Otherwise filter by the specific category
    return Object.entries(locations).filter(([_, location]) => 
      location.category === category || 
      (!location.category && category === 'megacities') // Default uncategorized locations to megacities
    );
  };

  if (isLoading) return <div>Loading map data...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="map-container w-full h-full mb-3">
      {/* Dropdown category selectors in flex row */}
      <div className="mb-4 flex flex-wrap gap-4">
        {categories.map(category => (
          <div key={category.id}>
            <select 
              className="w-44 bg-white border border-gray-300 rounded-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                if (e.target.value) {
                  changeLocation(e.target.value);
                }
              }}
              value={activeLocation && locations[activeLocation]?.category === category.id ? activeLocation : ""}
            >
              <option value="">{category.label}</option>
              {getLocationsByCategory(category.id).map(([key, location]) => (
                <option key={key} value={key}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      
      <MapContainer 
        center={position} 
        zoom={zoom} 
        scrollWheelZoom={true} 
        style={{ height: '550px', width: '100%' }}
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
              <div className="flex flex-col gap-2">
                <div>
                  <strong>{location.name}</strong><br />
                  {location.description}
                </div>
                <button 
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg shadow-lg  hover:scale-105 duration-200 transition text-center"
                  onClick={(e) => {
                    e.preventDefault(); // ✅ Prevent bubbling issues
                    e.stopPropagation(); // ✅ Prevent interference from map events
                    handleViewDatagram(location.datagramImage);
                  }}
                >
                  View Datagram
                </button>
              </div>
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