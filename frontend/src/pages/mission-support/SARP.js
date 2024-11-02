import React, { useState, useEffect, useCallback } from "react";
import useFetchData from "../../hooks/useFetchData2";
import generateGraph from "../../hooks/generateGraph";
import { setHourOnDate, updateLeadHours, isPastEnd, formatUTC } from "../../utils/dateUtils";
import {
  DropdownWithSearch,
  CustomDatePicker,
  ButtonGroup,
  RadioButtonGroup,
  TrackCheckbox,
  renderComponent
} from "../../components";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function WeatherForecasts() {
  const {
    flaskData,
    selectedValues,
    order,
    selectedDatetime,
    setSelectedDatetime,
    setSelectedValues,
    setFlaskData,
    updateLevels,
  } = useFetchData("/api/data", "/data/data5.json", { name: "data/data5.json", age: 30 });

  const [imageSrc, setImageSrc] = useState(`${process.env.PUBLIC_URL}/assets/graph.png`);
  const [selectedHour, setSelectedHour] = useState(null);

  useEffect(() => {
    if (selectedDatetime) {
      const utcHour = selectedDatetime.getUTCHours();
      setSelectedHour(utcHour);
    }
  }, [selectedDatetime]);

  // Extracted handlers for specific state updates
  const handleFieldSelect = useCallback((option) => {
    setSelectedValues((prev) => ({
      ...prev,
      fields: option,
    }));
    updateLevels(option.var);
  }, [setSelectedValues, updateLevels]);

  const handleLevelSelect = useCallback((option) => {
    setFlaskData((prevData) => ({
      ...prevData,
      levels: { ...prevData.levels, selected: option },
    }));
  }, [setFlaskData]);

  const handleSelect = useCallback((key, option) => {
    switch (key) {
      case "fields":
        handleFieldSelect(option);
        break;
      case "levels":
        handleLevelSelect(option);
        break;
      default:
        setSelectedValues((prev) => ({
          ...prev,
          [key]: option,
        }));
    }
  }, [handleFieldSelect, handleLevelSelect, setSelectedValues]);

  const handleDatetimeChange = useCallback((date, hour) => {
    const datetime = setHourOnDate(date, hour);
    setSelectedDatetime(datetime);

    const backendFormattedDate = formatUTC(datetime, flaskData.initialTimes.format.backend);
    const displayFormattedDate = formatUTC(datetime, flaskData.initialTimes.format.display);

    setSelectedValues((prev) => ({
      ...prev,
      initialTimes: {
        var: backendFormattedDate,
        label: displayFormattedDate,
      },
    }));

    updateLeadHours(datetime, flaskData, setFlaskData, selectedValues, setSelectedValues);
  }, [flaskData, selectedValues, setFlaskData, setSelectedDatetime, setSelectedValues]);

  const handleDateChange = useCallback((date) => {
    handleDatetimeChange(date, selectedHour);
  }, [handleDatetimeChange, selectedHour]);

  const handleHourClick = useCallback((hour) => {
    setSelectedHour(hour);
    handleDatetimeChange(selectedDatetime, hour);
  }, [handleDatetimeChange, selectedDatetime]);

  const handleSubmit = useCallback(async () => {
    const img = await generateGraph(selectedValues, flaskData.urlInfo);
    setImageSrc(img);
  }, [selectedValues, flaskData.urlInfo]);

  return (
    <div className="flex flex-col md:flex-row container mx-auto py-10 px-4">
      <aside className="md:w-1/3 lg:w-1/4 bg-gray-100 border border-black p-4 mr-8 rounded-sm mb-6 md:mb-0">
        {order.map((key) => renderComponent(key, flaskData[key], {
          setSelectedValues,
          updateLevels,
          selectedValues,
          selectedDatetime,
          selectedHour,
          setSelectedDatetime,
          setSelectedHour,
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
