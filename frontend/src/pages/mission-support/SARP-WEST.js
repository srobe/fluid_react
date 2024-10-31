import React, { useState, useEffect } from "react";
import useFetchData from "../../hooks/useFetchData2";
import generateGraph from "../../hooks/generateGraph";
import { setHourOnDate, updateLeadHours, isPastEnd, formatUTC } from "../../utils/dateUtils";
import DropdownWithSearch from "../../components/DropdownWithSearch";
import CustomDatePicker from "../../components/DatePicker";
import ButtonGroup from "../../components/ButtonGroup";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import TrackCheckbox from "../../components/Checkbox";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function WeatherForecasts() {
  const { flaskData, selectedValues, order, selectedDatetime, setSelectedDatetime, setSelectedValues, setFlaskData, updateLevels } = useFetchData(
    "/data",
    "/data/data5.json",
    { name: "data5.json", age: 30 }
  );

  const [imageSrc, setImageSrc] = useState(`${process.env.PUBLIC_URL}/assets/graph.png`);
  const [selectedHour, setSelectedHour] = useState(null);

  // Set selectedHour whenever selectedDatetime changes
  // setting using:
  // const [selectedHour, setSelectedHour] = useState(selectedDatetime.getUTCHours());
  // gives the wrong value for whatever reason
  useEffect(() => {
    if (selectedDatetime) {
      const utcHour = selectedDatetime.getUTCHours();
      setSelectedHour(utcHour);
    }
  }, [selectedDatetime]); // Only run this effect when selectedDatetime changes

  // Unified handleSelect function
  const handleSelect = (key, option) => {
    console.log("handleSelect", option);
    setSelectedValues((prev) => ({
      ...prev,
      [key]: option,
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
  };

  // Function to update datetime based on new date and hour

  const handleDatetimeChange = (date, hour) => {
    // Set the datetime to the selected hour
    const datetime = setHourOnDate(date, hour);
    setSelectedDatetime(datetime);

    // Format the datetime for both backend and display
    const backendFormattedDate = formatUTC(datetime, flaskData.initialTimes.format.backend);
    const displayFormattedDate = formatUTC(datetime, flaskData.initialTimes.format.display);

    // Update `selectedValues` with formatted date strings
    setSelectedValues((prev) => ({
      ...prev,
      initialTimes: {
        var: backendFormattedDate, // Store as formatted string for backend
        label: displayFormattedDate, // Display format for frontend
      },
    }));

    // Update lead hours based on the new datetime
    updateLeadHours(datetime, flaskData, setFlaskData, selectedValues, setSelectedValues);
  };

  // Handle date change by calling `handleDatetimeChange` with new date
  const handleDateChange = (date) => {
    console.log("handleDateChange Date:", date, selectedHour);
    handleDatetimeChange(date, selectedHour);
  };

  // Handle hour change by calling `handleDatetimeChange` with new hour
  const handleHourClick = (hour) => {
    setSelectedHour(hour);
    handleDatetimeChange(selectedDatetime, hour);
  };

  const handleSubmit = async () => {
    const img = await generateGraph(selectedValues, flaskData.urlInfo);
    setImageSrc(img);
  };

  return (
    <div className="flex flex-col md:flex-row container mx-auto py-10 px-4">
      <aside className="md:w-1/3 lg:w-1/4 bg-gray-100 border border-black p-4 mr-8 rounded-sm mb-6 md:mb-0">
        {order.map((key) => {
          const config = flaskData[key];

          // Skip rendering if `key` is "levels", "streams", or "tracks" and `config.all` has 1 or fewer items
          if (
              ((key === "levels" || key === "streams") && config.all.length <= 1) ||
              (key === "tracks" && config.all.length === 0)
            ) {
            return null;
          }

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
          } else if (config.type === "DatePicker") {
            return (
              <div className="mb-6" key={key}>
                <CustomDatePicker
                  label={config.label}
                  selectedDate={selectedDatetime}
                  onChange={handleDateChange}
                  dateDisplayFormat={config.format.display}
                  maxDate={config.end}
                  minDate={config.start}
                  dateFormat={config.format.backend}
                />

                {flaskData.initialTimes.hours.length > 1 && (
                  <ButtonGroup
                    label="Select Hour"
                    options={flaskData.initialTimes.hours.map((hour) => ({
                      label: `${String(hour).padStart(2, "0")}z`,
                      var: hour,
                    }))}
                    selectedOption={{ label: `${String(selectedHour).padStart(2, "0")}z`, var: selectedHour }}
                    onSelect={(option) => handleHourClick(option.var)}
                    disabledOptions={flaskData.initialTimes.hours.filter(hour => isPastEnd(selectedDatetime, hour, flaskData))}
                  />
                )}
              </div>
            );
          } else if (config.type === "ButtonGroup") {
            return (
              <ButtonGroup
                key={key}
                label={config.label}
                options={config.all}
                selectedOption={selectedValues[key]}
                onSelect={(value) => handleSelect(key, value)}
              />
            );
          } else if (config.type === "RadioButtonGroup") {
            return (
              <RadioButtonGroup
                key={key}
                label={config.label}
                options={config.all}
                selectedOption={selectedValues[key]}
                onSelect={(value) => handleSelect(key, value)}
              />
            );
          } else if (config.type === "Checkbox") {
            return (
              <TrackCheckbox
              key={key}
              label={config.label}
              options={config.all}
              selectedOption={selectedValues[key]}
              onSelect={(value) => handleSelect(key, value)}
            />
            )
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
