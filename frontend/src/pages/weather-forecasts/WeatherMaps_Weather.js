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
  } = useFetchData("/api/data", "/data/wxmaps.json", { name: "wxmaps.json", age: 30 });

  const [imageSrc, setImageSrc] = useState(`${process.env.PUBLIC_URL}/assets/graph.png`);
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
    <div className="flex flex-col md:flex-row container mx-auto py-10 px-4">
      <aside className="md:w-1/3 lg:w-1/4 bg-gray-100 border border-black rounded-sm mb-6 md:mb-0 mr-8">
        <div className="p-4 space-y-6"> {/* Added space-y-6 for consistent vertical spacing */}
          {order.map((key, index) => (
            <div 
              key={key}
              className={`${index !== 0 ? 'mt-6' : ''}`} // Add top margin except for first item
            >
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
            className="w-full bg-blue-600 text-white py-2 rounded-sm hover:bg-blue-500 mt-8" // Increased padding and margin-top
          >
            Generate graph
          </button>
        </div>
      </aside>

      <main className="md:w-2/3 lg:w-3/4 bg-white p-6 rounded-sm"> {/* Added padding and background */}
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
          <select className="mr-4 px-3 py-2 border border-gray-300 rounded-sm bg-white">
            <option>4k</option>
            <option>5k</option>
            <option>6k</option>
          </select>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-500">
            Download imagery
          </button>
        </div>

        <div className="bg-white rounded-sm">
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
            <img 
              src={imageSrc} 
              alt="Generated Graph" 
              className="w-full h-auto"
            />
          ) : (
            <p className="text-center text-gray-500 py-8">No image available.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default WeatherForecasts;