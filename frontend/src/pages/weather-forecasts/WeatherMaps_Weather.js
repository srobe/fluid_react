import React, { useState, useCallback, useEffect } from "react";
import useFetchData from "../../hooks/useFetchData";
import generateGraph from "../../hooks/generateGraph";
import { renderComponent } from "../../components";
import { Oval } from 'react-loader-spinner';
import Dropdown from '../../components/UserInput/Dropdown';
import AnimationControls from '../../components/UserInput/AnimateControls';
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

  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [animationFrames, setAnimationFrames] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(0);

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
  }, [selectedValues, flaskData?.urlInfo]);

  useEffect(() => {
    if (flaskData && selectedValues) {
      handleSubmit();
    }
  }, [flaskData, selectedValues, handleSubmit]);

  const handleDownload = () => {
    if (imageSrc) {
      const link = document.createElement('a');
      link.href = imageSrc;
      link.download = 'weather-forecast.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleAnimation = async () => {
    try {
      // This is where you would fetch animation frames from your backend
      // Example implementation:
      const frames = await generateGraph(
        { ...selectedValues, animation: true },
        flaskData.urlInfo
      );
      setAnimationFrames(frames);
      return frames;
    } catch (error) {
      console.error("Error generating animation:", error);
      throw error;
    }
  };

  return (
    <div className="flex flex-col md:flex-row container mx-auto py-10 px-4">
      {/* Sidebar */}
      <aside className="md:w-1/3 lg:w-1/3 bg-gray-50 border border-[#A9A9A9] p-6 mr-8 rounded-sm mb-6 md:mb-0">
        {order.map((key) => renderComponent(key, flaskData[key], {
          setSelectedValues,
          updateLevels,
          selectedValues,
          setFlaskData,
          flaskData,
        }))}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white text-base py-[8px] rounded-sm hover:bg-blue-500"
        >
          Generate graph
        </button>
      </aside>

      {/* Main Content */}
      <main className="md:w-2/3 lg:w-3/4 p-4">
        <nav className="mb-4">
          <a href="/weather-forecasts" className="text-blue-600 underline">
            &lt; Weather Forecasts
          </a>
        </nav>
        
        <h1 className="text-2xl font-bold mb-4">Weather Forecasts</h1>
        <p className="mb-4">Generate and view weather forecast graphs based on selected parameters.</p>
        
        {/* Action Buttons */}
        <div className="flex mb-8">
          <button 
            onClick={handleDownload} 
            className="bg-blue-600 text-white py-1 px-4 mr-2 rounded-sm hover:bg-blue-500"
          >
            Download Image
          </button>
          <Dropdown
            buttonClassName="bg-gray-600 text-white py-1 px-4 rounded-sm hover:bg-gray-500"
            menuClassName="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-sm shadow-lg"
            options={[
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' },
              { label: 'Option 3', value: 'option3' },
            ]}
          />
        </div>

        {/* Loading State */}
        {isLoading ? (
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        ) : (
          imageSrc && (
            <div>
              {/* Image */}
              <img 
                src={animationFrames[currentFrame] || imageSrc} 
                alt="Weather forecast" 
                className="w-full border border-black" 
              />
              
              {/* Animation Controls */}
              <AnimationControls
                onAnimate={handleAnimation}
                onFrameChange={(frameIndex) => setCurrentFrame(frameIndex)}
              />
            </div>
          )
        )}
      </main>
    </div>
  );
}

export default WeatherForecasts;