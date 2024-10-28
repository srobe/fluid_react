import React, { useState, useEffect } from "react";
import DropdownWithSearch from "../../components/DropdownWithSearch";
import CustomDatePicker from "../../components/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, addHours, format } from "date-fns";


function WeatherForecasts() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dropdownData, setDropdownData] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [imageSrc, setImageSrc] = useState(`${process.env.PUBLIC_URL}/assets/graph.png`);
  const [order,setOrder] = useState([]);

  useEffect(() => {
    fetch("/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "data2.json", age: 30 }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setDropdownData(data);

        // Set initial selected values from data.json
        setSelectedValues(Object.fromEntries(
          Object.entries(data).map(([key, value]) => [key, value.selected || ""])
        ));

        setOrder(data.order || []);

        // Set initial date from initialTimes in data.json if available
        if (data.initialTimes) {
          const initialDateStr = data.initialTimes.selected;
          const parsedDate = parse(initialDateStr, data.initialTimes.format_display, new Date());
          setSelectedDate(parsedDate);
        }
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  // Function to calculate lead hours based on selected initial time
  const updateLeadHours = (initialTime) => {
      const baseDate = parse(initialTime, "ddMMMyyyy HH'z'", new Date());
      const hours = [0, 3, 6, 9, 12]; // Sample lead hours  
      // Find the index of the current selected lead hour in the old options
      const currentLeadHourIndex = dropdownData.leadHours.all.indexOf(selectedValues.leadHours);
    
      const newLeadHours = hours.map(hour => {
        const date = addHours(baseDate, hour);
        return `${String(hour).padStart(3, "0")}h ${format(date, "ddMMMyyyy HH'z'")}`;
      });

      // Set the selected lead hour to the same index in the new list, or the first if out of bounds
      const newSelectedLeadHour = newLeadHours[currentLeadHourIndex] || newLeadHours[0];

      setDropdownData(prevData => ({
        ...prevData,
        leadHours: { ...prevData.leadHours, all: newLeadHours },
      }));

      setSelectedValues(prev => ({
        ...prev,
        leadHours: newSelectedLeadHour
      }));
    };
  const handleSelect = (key, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const displayFormattedDate = format(date, dropdownData.initialTimes.format_display);
    const backendFormattedDate = format(date, dropdownData.initialTimes.format_backend);
    setSelectedValues((prev) => ({
      ...prev,
      initialTimes: backendFormattedDate,
    }));

    updateLeadHours(displayFormattedDate);
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
                options={config.all}
                selectedOption={selectedValues[key]}
                onSelect={(value) => handleSelect(key, value)}
              />
            );
          } else if (config.type === "DatePicker") {
            return (
              <div className="mb-6">
                <CustomDatePicker
                    label={config.label}
                    selectedDate={selectedDate}
                    onChange={handleDateChange}
                    dateFormat={config.format_display}
                />
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


