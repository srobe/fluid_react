// src/pages/aerosol-gas/Datagrams_AerosolGas.js

import React, { useState, useCallback } from "react";
import useFetchData from "../../hooks/useFetchData";
import generateGraph from "../../hooks/generateGraph";
import { renderComponent } from "../../components";
import { Oval } from 'react-loader-spinner';
import "react-datepicker/dist/react-datepicker.css";

function WeatherForecasts() {
  const {
    flaskData,
    selectedValues,
    order,
    setSelectedValues,
    setFlaskData,
    updateLevels,
  } = useFetchData("/api/data", "/data/data5.json", { name: "data5.json", age: 30 });

  const [imageSrc, setImageSrc] = useState(`${process.env.PUBLIC_URL}/assets/graph.png`);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true); // Set loading to true before fetching
    try {
      const img = await generateGraph(selectedValues, flaskData.urlInfo);
      setImageSrc(img);
    } catch (error) {
      console.error("Error generating graph:", error);
      setImageSrc(null); // Optionally set to null or an error image
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  }, [selectedValues, flaskData.urlInfo]);

  return (
    <div className="flex flex-col md:flex-row container mx-auto py-10 px-4">
      <aside className="md:w-1/3 lg:w-1/4 bg-gray-100 border border-black p-4 mr-8 rounded-sm mb-6 md:mb-0">
        {order.map((key) => renderComponent(key, flaskData[key], {
          setSelectedValues,
          updateLevels,
          selectedValues,
          setFlaskData,
          flaskData,
        }))}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-1 rounded-sm hover:bg-blue-500"
        >
          Generate graph
        </button>
      </aside>

      <main className="md:w-2/3 lg:w-3/4 p-4">
        <nav className="mb-4">
          <a href="/weather-forecasts" className="text-blue-600 underline">
            &lt; Weather Forecasts
          </a>
        </nav>
        <h1 className="text-2xl font-bold mb-4">Weather Maps</h1>
        <p className="text-gray-700 mb-6">
          The Goddard Earth Observing System (GEOS) model is designed to study
          various Earth Science questions by connecting different model components flexibly.
        </p>

        <div className="flex mb-8">
          <select className="mr-4 px-2 py-1 border border-gray-300 rounded-sm">
            <option>4k</option>
            <option>5k</option>
            <option>6k</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-1 rounded-sm hover:bg-blue-500">
            Download imagery
          </button>
        </div>

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
            // <div className="flex justify-center items-center h-64">
              // <p>Loading image...</p>
            // </div>
          ) : imageSrc ? (
            <img src={imageSrc} alt="Generated Graph" />
          ) : (
            <p>No image available.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default WeatherForecasts;
