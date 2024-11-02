import { useState, useEffect } from "react";
import { parseUTCDate,formatUTC } from "../utils/dateUtils";
import { leadHoursFormatter } from "../utils/formatStrings";
import resolvePlaceholders from "../utils/resolvePlaceholders";

const apiUrl = process.env.REACT_APP_API_URL;

export default function useFetchData(primaryUrl, fallbackLocalPath, requestData) {
  const [flaskData, setFlaskData] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [order, setOrder] = useState([]);
  const [selectedDatetime, setSelectedDatetime] = useState(new Date());
  const [fetchCompleted, setFetchCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (fetchCompleted) return;
      let defaultData = {}; // Initialize as an empty object

      try {
        const response = await fetch("/data/defaults.json");
        if (!response.ok) throw new Error("Failed to load defaults.json");
        
        defaultData = await response.json();
        
        // Resolve placeholders in defaults.json (e.g., $today, $todayMinus2Weeks)
        defaultData = resolvePlaceholders(defaultData);
      } catch (error) {
        console.warn("Could not load defaults.json. Using empty defaultData:", error);
      }
      
      let data;

      try {
        const primaryResponse = await fetch(`${apiUrl}${primaryUrl}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });
        if (!primaryResponse.ok) throw new Error("Primary fetch failed");

        data = await primaryResponse.json();
      } catch (error) {
        console.error("Error fetching from primary URL, attempting fallback:", error);

        try {
          const fallbackResponse = await fetch(fallbackLocalPath);
          if (!fallbackResponse.ok) throw new Error("Fallback fetch failed");

          data = await fallbackResponse.json();
        } catch (fallbackError) {
          console.error("Error fetching from fallback URL:", fallbackError);
          return;
        }
      }

      // Merge fetched data with default data
      const mergedData = { ...defaultData, ...data };
      console.log("Merged data:", mergedData);
      // Set flaskData
      setFlaskData(mergedData);

      // Set selectedDatetime based on initialTimes.selected
      const parsedDate = parseUTCDate(mergedData.initialTimes.selected, mergedData.initialTimes.format.backend);
      setSelectedDatetime(parsedDate);

      // Populate selectedValues based on mergedData
      const newSelectedValues = {
        fields: extractLabelVar(mergedData.fields),
        regions: extractLabelVar(mergedData.regions),
        levels: { var: mergedData.levels.selected, label: mergedData.levels.selected },
        initialTimes: {
          var: formatUTC(parsedDate, mergedData.initialTimes.format.backend),
          label: formatUTC(parsedDate, mergedData.initialTimes.format.display),
        },
        leadHours: {
          var: mergedData.leadHours.selected,
          // label: `${String(mergedData.leadHours.selected).padStart(3, '0')}h + ${formatUTC(parsedDate, mergedData.leadHours.format.date)}`,
          label:leadHoursFormatter(mergedData.leadHours.selected, parsedDate, mergedData.leadHours.format),
        },
        streams: extractLabelVar(mergedData.streams, true),
        tracks: { var: mergedData.tracks.selected, label: false },
        currentHour: {
          var: parsedDate.getUTCHours(),
          label: `${String(parsedDate.getUTCHours()).padStart(2, "0")}z`,
        }
      };
      setSelectedValues(newSelectedValues);
      console.log("Selected values:", newSelectedValues);
      // Set order
      setOrder(mergedData.order || []);

      setFetchCompleted(true);
    };

    fetchData();
  }, [primaryUrl, fallbackLocalPath, requestData, fetchCompleted]);

  const updateLevels = (fieldVar) => {
    const selectedField = flaskData.fields.all.find((field) => field.var === fieldVar);
    setFlaskData((prevData) => ({
      ...prevData,
      levels: {
        all: selectedField?.levels || ["0"],
        selected: selectedField?.levels?.[0] || "0",
        label: flaskData.levels.label || "Levels",
        type: flaskData.levels.type || "ButtonGroup",
      },
    }));
  };

  return { flaskData, selectedValues, order, selectedDatetime, setSelectedDatetime, setSelectedValues, setFlaskData, updateLevels };
}

// Helper function to extract "var" and "label"
function extractLabelVar(data, useVarAsLabelIfMissing = false) {
  const selectedVar = data.selected;
  const selectedItem = data.all.find((item) => item.var === selectedVar);
  return selectedItem
    ? { var: selectedVar, label: selectedItem.label || selectedVar }
    : { var: selectedVar, label: useVarAsLabelIfMissing ? selectedVar : "" };
}


