// src/hooks/useFetchData.js

import { useState, useEffect } from "react";
import { parseUTCDate, formatUTC } from "../utils/dateUtils";
import resolvePlaceholders from "../utils/resolvePlaceholders";

const apiUrl = process.env.REACT_APP_API_URL;

export default function useFetchData(primaryUrl, fallbackLocalPath, requestData) {
  const [flaskData, setFlaskData] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [order, setOrder] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // To prevent state updates on unmounted components

    const fetchData = async () => {
      try {
        // Fetch data from API or fallback
        const data = await fetchDataWithFallback(primaryUrl, fallbackLocalPath, requestData);

        // Initialize data
        const initializedData = initializeData(data);

        if (isMounted) {
          setFlaskData(initializedData.flaskData);
          setSelectedValues(initializedData.selectedValues);
          setOrder(initializedData.order);
        }
      } catch (err) {
        console.error("Error in useFetchData:", err);
        if (isMounted) setError(err.message);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };
  }, [primaryUrl, fallbackLocalPath, requestData]);

  const updateLevels = (fieldVar) => {
    // Update levels based on fieldVar and dependencies
    setFlaskData((prevData) => {
      const levelsMapping = prevData.dependencies?.levels?.mapping || {};
      const newLevels = levelsMapping[fieldVar] || ["0"];

      return {
        ...prevData,
        levels: {
          ...prevData.levels,
          all: newLevels,
        },
      };
    });

    // Optionally update selected level
    setSelectedValues((prevSelected) => ({
      ...prevSelected,
      levels: flaskData.levels.all[0] || "0",
    }));
  };

  const updateLeadHours = (datetime) => {
    // Extract the hour from datetime
    const hour = datetime.getUTCHours().toString();

    setFlaskData((prevData) => {
      const leadHoursMapping = prevData.dependencies?.leadHours?.mapping || {};
      const newLeadHours = leadHoursMapping[hour] || [];

      return {
        ...prevData,
        leadHours: {
          ...prevData.leadHours,
          options: newLeadHours,
        },
      };
    });

    // Optionally update selected leadHour
    setSelectedValues((prevSelected) => ({
      ...prevSelected,
      leadHours: flaskData.leadHours.options[0] || null,
    }));
  };

  return {
    flaskData,
    selectedValues,
    order,
    setSelectedValues,
    setFlaskData,
    updateLevels,
    updateLeadHours,
    error,
  };
}

// Helper functions

async function fetchDataWithFallback(primaryUrl, fallbackLocalPath, requestData) {
  try {
    const primaryResponse = await fetch(`${apiUrl}${primaryUrl}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });
    if (!primaryResponse.ok) throw new Error("Primary fetch failed");
    const data = await primaryResponse.json();
    return data;
  } catch (error) {
    console.error("Error fetching from primary URL:", error);
    console.warn("Attempting to fetch from fallback URL");

    const fallbackResponse = await fetch(fallbackLocalPath);
    if (!fallbackResponse.ok) throw new Error("Fallback fetch failed");
    const data = await fallbackResponse.json();
    return data;
  }
}

function initializeData(data) {
  const order = data.order || [];
  data = resolvePlaceholders(data);
  // Initialize selectedValues based on 'selected' section
  const selectedValues = { ...data.selected };

  // Parse initialTimes
  const initialTimes = data.initialTimes;
  const initialTimeFormat = initialTimes.format.backend;
  const selectedInitialTimeStr = selectedValues.initialTimes;
  const parsedInitialTime = parseUTCDate(selectedInitialTimeStr, initialTimeFormat);

  // Update selectedValues with parsed datetime
  selectedValues.datetime = parsedInitialTime;

  // Update leadHours options based on dependencies
  const leadHoursMapping = data.dependencies?.leadHours?.mapping || {};
  const initialHour = parsedInitialTime.getUTCHours().toString();
  const leadHoursOptions = leadHoursMapping[initialHour] || [];

  // Update flaskData with leadHours options
  const flaskData = {
    ...data,
    leadHours: {
      ...data.leadHours,
      options: leadHoursOptions,
    },
  };

  // Set default selected leadHour if not set
  if (!selectedValues.leadHours && leadHoursOptions.length > 0) {
    selectedValues.leadHours = leadHoursOptions[0];
  }

  // Update levels based on selected field and dependencies
  const fieldVar = selectedValues.fields;
  const levelsMapping = data.dependencies?.levels?.mapping || {};
  const levelsOptions = levelsMapping[fieldVar] || ["0"];

  flaskData.levels = {
    ...data.levels,
    all: levelsOptions,
  };

  // Set default selected level if not set
  if (!selectedValues.levels && levelsOptions.length > 0) {
    selectedValues.levels = levelsOptions[0];
  }

  return {
    flaskData,
    selectedValues,
    order,
  };
}
