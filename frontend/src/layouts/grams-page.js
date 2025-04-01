// src/pages/weather-forecasts/Datagrams_Weather.js

import React, { useState, useCallback } from 'react';
import useFetchData from "../hooks/useFetchData";
import generateGraph from "../hooks/generateGraph";
import { renderComponent } from "../components";
import { Oval } from 'react-loader-spinner';
import "react-datepicker/dist/react-datepicker.css";
import MapViewer from "../components/MapViewer";
import GraphImg from "../assets/graph.png";

const DatagramsTemplate = ({
  dataEndpoint = "/api/data",
  configFilePath = "/data/wxmaps.json",
  backLink = { url: "/weather-forecasts", text: "< Weather Forecasts" },
  title = "Weather Maps",
  description = "The Goddard Earth Observing System (GEOS) ...",
  showDownloadSection = false, 
  mapLocationsUrl = null, // Add this prop to support JSON locations
}) => {

  const {
    flaskData,
    selectedValues,
    order,
    setSelectedValues,
    setFlaskData,
    updateLevels,
  } = useFetchData(dataEndpoint, configFilePath, { name: configFilePath, age: 30 });

  const [imageSrc, setImageSrc] = useState(GraphImg);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapLocation, setMapLocation] = useState('goddard');

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      const img = await generateGraph(selectedValues, flaskData.urlInfo);
      setImageSrc(img);
    } catch (error) {
      console.error("Error generating graph:", error);
      setImageSrc(null);
    } finally {
      setIsLoading(false);
    }
  }, [selectedValues, flaskData.urlInfo]);

  // Function to change map location
  const changeMapLocation = (location) => {
    setMapLocation(location);
  };


   // Function to handle viewing a datagram from the map
   const handleViewDatagram = useCallback((datagramImage) => {
    console.log("Viewing datagram:", datagramImage);
    setImageSrc(datagramImage);
    setIsModalOpen(false);

  }, []);


  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col md:flex-row flex-1 p-6 gap-8">
        
        {/* Sidebar Controls */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="bg-gray-100 border border-black p-4 rounded-sm sticky top-24 h-full">
            <div className="flex flex-col h-full">
              {/* Generate Graph Button at the top */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-1 mb-4 rounded-sm hover:bg-blue-500"
              >
                Generate graph
              </button>
              
              {/* Form Components */}
              <div className="flex-1 overflow-y-auto">
                {order.map((key) => renderComponent(key, flaskData[key], {
                  setSelectedValues,
                  updateLevels,
                  selectedValues,
                  setFlaskData,
                  flaskData,
                }))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 lg:w-3/4 flex-grow">
          {/* Navigation and Title */}
          <div className="mb-6">
            <a href={backLink.url} className="text-blue-600 underline block mb-4">
              {backLink.text}
            </a>
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <p className="text-gray-700">{description}</p>
          </div>

          {/* Download Controls (optional) */}
          {showDownloadSection && (
            <div className="flex flex-wrap gap-3 mb-8">
              <select className="px-2 py-1 border border-gray-300 rounded-sm">
                <option>4k</option>
                <option>5k</option>
                <option>6k</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-1 rounded-sm hover:bg-blue-500">
                Download imagery
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded-sm hover:bg-blue-500"
                onClick={() => setIsModalOpen(true)}
              >
                Open Map
              </button>
            </div>
          )}

          {/* Visualization Area */}
          <div className="mb-16 w-full overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Oval
                  height={80}
                  width={80}
                  color="#4fa94d"
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              </div>
            ) : imageSrc ? (
              <div className="max-w-full">
                <img src={imageSrc} alt="Generated Graph" className="max-w-full h-auto" />
              </div>
            ) : (
              <p>No image available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal and Map View */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          
          {/* Map viewer popup */}
          <div className="bg-white p-6 rounded-md shadow-lg w-full flex flex-col gap-5 max-w-3xl max-h-[90vh] overflow-auto relative">
            {/* X button positioned at the top right corner of the popup */}
            <button
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-700 hover:text-gray-900 focus:outline-none"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            
            <div className="flex flex-col gap-2 mt-4">
              <h2 className="text-xl font-bold">Map Viewer</h2>
              <h3>
                Click the location of interest to view the datagram Once desired location is selected, 
                click the pin on the map which will open a button to view the datagram.
              </h3>
            </div>

            {/* MapViewer loads locations from JSON if URL is provided */}
            <MapViewer 
              selectedLocation={mapLocation}
              locationsDataUrl={mapLocationsUrl} 
              onViewDatagram={handleViewDatagram}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DatagramsTemplate;
