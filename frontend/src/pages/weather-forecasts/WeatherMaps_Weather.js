import React, { useState, useCallback } from "react";
import useFetchData from "../../hooks/useFetchData";
import generateGraph from "../../hooks/generateGraph";
import { renderComponent } from "../../components";
import { Oval } from 'react-loader-spinner';
import { Dropdown } from "../../components/UserInput";
import "react-datepicker/dist/react-datepicker.css";

function WeatherForecasts() {
  // Custom hook for fetching data
  const {
    flaskData,
    selectedValues,
    order,
    setSelectedValues,
    setFlaskData,
    updateLevels,
  } = useFetchData("/api/data", "/data/wxmaps.json", { name: "wxmaps.json", age: 30 });

  // State management
  const [imageSrc, setImageSrc] = useState(`${process.env.PUBLIC_URL}/assets/graph.png`);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState("4k");

  // Resolution options configuration
  const resolutionOptions = [
    { label: "4k", value: "4k" },
    { label: "5k", value: "5k" },
    { label: "6k", value: "6k" },
  ];

  // Handle graph generation
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

  // Render loading state component
  const renderLoadingState = () => (
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
  );

  // Render graph content
  const renderGraphContent = () => {
    if (isLoading) return renderLoadingState();
    if (imageSrc) return <img src={imageSrc} alt="Generated Graph" className="w-full h-auto" />;
    return <p className="text-center text-gray-500">No image available.</p>;
  };

  return (
    <div className="flex flex-col md:flex-row container mx-auto py-10 px-4">
      {/* Sidebar */}
      <aside className="md:w-1/3 lg:w-1/4 bg-gray-100 border border-black p-4 mr-8 rounded-sm mb-6 md:mb-0">
        <div className="space-y-6">
          {order.map((key) => (
            <div key={key}>
              {renderComponent(key, flaskData[key], {
                setSelectedValues,
                updateLevels,
                selectedValues,
                setFlaskData,
                flaskData,
              })}
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-sm hover:bg-blue-500 
                     transition-colors duration-200"
          >
            Generate graph
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:w-2/3 lg:w-3/4 p-4">
        {/* Navigation */}
        <nav className="mb-4">
          <a href="/weather-forecasts" className="text-blue-600 underline">
            &lt; Weather Forecasts
          </a>
        </nav>

        {/* Header */}
        <h1 className="text-2xl font-bold mb-4">Weather Maps</h1>
        <p className="text-gray-700 mb-6">
          The Goddard Earth Observing System (GEOS) model is designed to study
          various Earth Science questions by connecting different model components flexibly.
        </p>

        {/* Controls */}
        <div className="flex items-center mb-8">
          <div className="w-24 mr-4">
            <Dropdown
              options={resolutionOptions}
              selectedOption={resolutionOptions.find(opt => opt.value === selectedResolution)}
              onSelect={(option) => setSelectedResolution(option.value)}
            />
          </div>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-500 
                     transition-colors duration-200"
          >
            Download imagery
          </button>
        </div>

        {/* Graph Content */}
        <div className="bg-white rounded-sm">
          {renderGraphContent()}
        </div>
      </main>
    </div>
  );
}

export default WeatherForecasts;