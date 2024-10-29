// src/pages/mission-support/WeatherForecasts.js
import React, { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { setHourOnDate, updateLeadHours } from "../../utils/dateUtils";
import DropdownWithSearch from "../../components/DropdownWithSearch";
import CustomDatePicker from "../../components/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const hours = ["00z", "06z", "12z", "18z"];

function WeatherForecasts() {
  // Use useFetchData with different endpoints by providing custom parameters
  const { dropdownData, selectedValues, order, selectedDatetime, setSelectedValues, setDropdownData } = useFetchData(
    "/data",             // Primary URL
    "/data3.json",       // Fallback URL
    { name: "data3.json", age: 30 } // Request data
  );

  // The rest of the component's logic stays the same...
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(hours[0]);
  const [imageSrc, setImageSrc] = useState(`${process.env.PUBLIC_URL}/assets/graph.png`);

  // Handle selection for dropdowns and map the `label` to the `var` value
  const handleSelect = (key, option) => {
    setSelectedValues((prev) => ({
      ...prev,
      [key]: option, // Store the selected option (either object or string)
    }));
  };

  const handleDatetimeChange = (date, hour) => {
    const datetime = setHourOnDate(date, hour);
    const backendFormattedDate = format(datetime, dropdownData.initialTimes.format_backend);

    setSelectedValues((prev) => ({
      ...prev,
      initialTimes: backendFormattedDate,
    }));

    updateLeadHours(datetime, dropdownData, setDropdownData, selectedValues, setSelectedValues);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleDatetimeChange(date, selectedHour);
  };

  const handleHourClick = (hour) => {
    setSelectedHour(hour);
    handleDatetimeChange(selectedDate, hour);
  };

  const generateGraph = () => {
    fetch("/generate-graph", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedValues),
    })
      .then((res) => res.json())
      .then((data) => {
        setImageSrc(data.imagePath);
      })
      .catch((error) => console.error("Error generating graph:", error));
  };

  return (
    <div className="flex flex-col md:flex-row container mx-auto py-10 px-4">
      <aside className="md:w-1/3 lg:w-1/4 bg-gray-100 border border-black p-4 mr-8 rounded-sm mb-6 md:mb-0">
        {order.map((key) => {
          const config = dropdownData[key];
          if (config.type === "DropdownWithSearch") {
            return (
              <DropdownWithSearch
                key={key}
                label={config.label}
                options={config.all} // Pass directly without modification
                selectedOption={selectedValues[key]}
                onSelect={(value) => handleSelect(key, value)}
              />
            );
          }
          else if (config?.type === "DatePicker") {
            return (
              <div className="mb-6" key={key}>
                <CustomDatePicker
                  label={config.label}
                  selectedDate={selectedDatetime}
                  onChange={handleDateChange}
                  dateFormat={config.format_display}
                />
                {dropdownData.initialTimes?.hours.length > 1 && (
                  <div className="hour-buttons">
                    {dropdownData.initialTimes.hours.map((hour) => (
                      <button
                        key={hour}
                        onClick={() => handleHourClick(hour)}
                        className={`hour-btn ${hour === selectedHour ? "selected" : ""}`}
                      >
                        {hour}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}

        <button
          onClick={generateGraph}
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
          various Earth Science questions by connecting different model
          components flexibly.
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

        <img src={imageSrc} alt="Weather Graph" className="w-full rounded-sm border border-black" />
      </main>
    </div>
  );
}

export default WeatherForecasts;

