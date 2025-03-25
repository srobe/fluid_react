import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import DefaultGraphImg from "../assets/graph.png"; // Placeholder image
import GraphImgDC from "../assets/dc-graph.png";    
import GraphImgFlorida from "../assets/fl-graph.png";

const locationImages = {
  dc: GraphImgDC, 
  florida: GraphImgFlorida,
  goddard: DefaultGraphImg
};

const DatagramViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const locationKey = params.get("location") || "goddard"; // Default to Goddard

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Datagram for {locationKey}</h1>
      <img src={locationImages[locationKey]} alt={`Datagram for ${locationKey}`} className="max-w-full h-auto shadow-lg" />
    
    
        {/* Back Button */}
        <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-500"    
            >
                Back
                </button>


    </div>
  );
};

export default DatagramViewer;
