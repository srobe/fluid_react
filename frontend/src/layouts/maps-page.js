// src/templates/WeatherMapsTemplate.js

import React, { useState, useCallback } from "react";
import useFetchData from "../hooks/useFetchData";
import generateGraph from "../hooks/generateGraph";
import { renderComponent } from "../components";
import { Oval } from "react-loader-spinner";
import GraphImg from "../assets/graph.png";

const WeatherMapsTemplate = ({
  dataEndpoint = "/api/data",
  configFilePath = "/data/wxmaps.json",
  backLink = { url: "/weather-forecasts", text: "< Weather Forecasts" },
  title = "Weather Maps",
  description = "The Goddard Earth Observing System (GEOS) ...",
  showDownloadSection = false, 
}) => {

  // Reuse the same logic, but allow each page to override the config file path
  const {
    flaskData,
    selectedValues,
    order,
    setSelectedValues,
    setFlaskData,
    updateLevels,
  } = useFetchData(dataEndpoint, configFilePath, { name: configFilePath, age: 30 });

  // Same logic for handling the generated image
  const [imageSrc, setImageSrc] = useState(GraphImg);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="flex flex-col md:flex-row h-screen container mx-auto py-10 px-4">
      {/* Sidebar */}
      <aside className="md:w-1/3 lg:w-1/4 bg-gray-100 border border-black p-4 mr-8 rounded-sm mb-6 md:mb-0">
        {order.map((key) =>
          renderComponent(key, flaskData[key], {
            setSelectedValues,
            updateLevels,
            selectedValues,
            setFlaskData,
            flaskData,
          })
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-1 rounded-sm hover:bg-blue-500"
        >
          Generate graph
        </button>
      </aside>

      {/* Main Content */}
      <main className="md:w-2/3 lg:w-3/4 p-4">
        <nav className="mb-4">
          <a href={backLink.url} className="text-blue-600 underline">
            {backLink.text}
          </a>
        </nav>
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="text-gray-700 mb-6">
          {description}
        </p>

        {/* Conditionally render the download section */}
        {showDownloadSection && (
          <div className="flex flex-row mb-8">
            <select className="mr-4 px-2 py-1 border border-gray-300 rounded-sm">
              <option>4k</option>
              <option>5k</option>
              <option>6k</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-1 rounded-sm hover:bg-blue-500">
              Download imagery
            </button>
          </div>
        )}

        <div>
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
            <img src={imageSrc} alt="Generated Graph" />
          ) : (
            <p>No image available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default WeatherMapsTemplate;
