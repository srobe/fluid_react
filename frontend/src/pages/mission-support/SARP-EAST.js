// src/pages/mission-support/WeatherForecasts.js

import React, { useState, useEffect } from "react";
import useFetchData from "../../hooks/useFetchData";
import generateGraph from "../../hooks/generateGraph";
import { setHourOnDate, updateLeadHours, isPastEnd } from "../../utils/dateUtils";
import { getMappedValues } from "../../utils/mappedValues";
import DropdownWithSearch from "../../components/DropdownWithSearch";
import CustomDatePicker from "../../components/DatePicker";
import ButtonGroup from "../../components/ButtonGroup";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const hours = ["00z", "06z", "12z", "18z"];

function WeatherForecasts() {
  const { flaskData, selectedValues, order, selectedDatetime, setSelectedDatetime, setSelectedValues, setFlaskData, updateLevels } = useFetchData(
    "/data",             // Primary URL
    "/data/data4.json",       // Fallback URL
    { name: "data4.json", age: 30 } // Request data
  );


  const [imageSrc, setImageSrc] = useState(`${process.env.PUBLIC_URL}/assets/graph.png`);

  // Unified handleSelect function
  const handleSelect = (key, option) => {
    console.log("handleSelect", option);
    setSelectedValues((prev) => ({
      ...prev,
      [key]: option, // Use `var` if it exists, otherwise option directly
    }));

    // Update levels dynamically when a new field is selected
    if (key === "fields") {
      updateLevels(option.var);
    } else if (key === "levels") {
      setFlaskData((prevData) => ({
        ...prevData,
        levels: { ...prevData.levels, selected: option },
      }));
    }
    console.log("Current selected data:", selectedValues, selectedDatetime, selectedHour);
  };

  const [selectedHour, setSelectedHour] = useState(`${String(selectedDatetime.getUTCHours()).padStart(2, "0")}z`);

  // const hours = ["00z", "06z", "12z", "18z"];

  // Function to update datetime based on new date and hour
  const handleDatetimeChange = (date, hour) => {
    const datetime = setHourOnDate(date, hour);
    setSelectedDatetime(datetime);

    // Format and update `selectedValues` based on `datetime`
    const backendFormattedDate = format(datetime, flaskData.initialTimes.format_backend);

    setSelectedValues((prev) => ({
      ...prev,
      initialTimes: backendFormattedDate,
    }));

    updateLeadHours(datetime, flaskData, setFlaskData, selectedValues, setSelectedValues);
  };

  // Handle date change by calling `handleDatetimeChange` with new date
  const handleDateChange = (date) => {
    // setSelectedDate(date)
    handleDatetimeChange(date, selectedHour); // Pass current hour
  };

  // Handle hour change by calling `handleDatetimeChange` with new hour
  const handleHourClick = (hour) => {
    setSelectedHour(hour)
    handleDatetimeChange(selectedDatetime, hour); // Pass current date
  };

  const handleSubmit = async () => {
    const img = await generateGraph(selectedValues,flaskData.urlInfo); // Call generateGraph with selected values
    setImageSrc(img); // Set the returned image URL
  };

  // const generateGraph = () => {
  //   console.log("Sent selected data:", JSON.stringify({ ...getMappedValues(selectedValues), mission: "SARP-East" }));
  //   fetch("/generate-graph", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ ...selectedValues, mission: "SARP-East" }), // Include selected level in payload
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setImageSrc(data.imagePath);
  //     })
  //     .catch((error) => console.error("Error generating graph:", error));
  // };

  return (
    <div className="flex flex-col md:flex-row container mx-auto py-10 px-4">
      <aside className="md:w-1/3 lg:w-1/4 bg-gray-100 border border-black p-4 mr-8 rounded-sm mb-6 md:mb-0">
        {order.map((key) => {
          const config = flaskData[key];

          if (config.type === "DropdownWithSearch") {
            return (
              <DropdownWithSearch
                key={key}
                label={config.label}
                options={config.all}
                selectedOption={selectedValues[key]}
                onSelect={(value) => handleSelect(key, value)}
              />
            );
          }

          else if (config.type === "DatePicker") {
            return (
              <div className="mb-6" key={key}>
                <CustomDatePicker
                  label={config.label}
                  selectedDate={selectedDatetime}
                  onChange={handleDateChange}
                  dateDisplayFormat={config.format_display}
                  maxDate={config.end}
                  minDate={config.start}
                  dateFormat={config.format_backend}

                />



                {flaskData.initialTimes.hours.length > 1 && (
                  <div className="hour-buttons">
                    {flaskData.initialTimes.hours.map((hour) => (
                      <button
                        key={hour}
                        onClick={() => handleHourClick(hour)}
                        className={`hour-btn ${hour === selectedHour ? "selected" : ""}`}
                        disabled={isPastEnd(selectedDatetime, hour, flaskData)} // Pass data to check for last day condition
                      >
                        {`${String(hour).padStart(2, "0")}z`}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          else if (key === "levels" && flaskData.levels.all.length < 2) {
            // If there is only one or zero levels, skip rendering
            return null;
          }
          else if (config.type === "ButtonGroup") {
            return (
              <ButtonGroup
                key={key}
                label={config.label}
                options={config.all}
                selectedOption={selectedValues[key]}
                onSelect={(value) => handleSelect(key, value)}
              />
            );
          }

          return null;
        })}

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

        <div>
          {imageSrc ? (
            <img src={imageSrc} alt="Generated Graph" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default WeatherForecasts;

