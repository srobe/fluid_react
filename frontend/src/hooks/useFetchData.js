// src/hooks/useFetchData.js
import { useState, useEffect } from "react";
import { parse } from "date-fns";
import { parseUTCDate } from "../utils/dateUtils";

export default function useFetchData(primaryUrl, fallbackUrl, requestData) {
  const [flaskData, setFlaskData] = useState({
    levels: { all: [], selected: "", label: "Levels", type: "ButtonGroup" },
  });
  const [selectedValues, setSelectedValues] = useState({});
  const [order, setOrder] = useState([]);
  const [selectedDatetime, setSelectedDatetime] = useState(new Date());
  const [fetchCompleted, setFetchCompleted] = useState(false); // Track fetch completion

  useEffect(() => {
    const fetchData = async () => {
      if (fetchCompleted) return; // Prevent re-fetching if already completed

      let data;

      try {
        const response = await fetch(primaryUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });
        if (!response.ok) throw new Error("Primary fetch failed");

        data = await response.json();
      } catch (error) {
        console.error("Error fetching from primary URL, attempting fallback:", error);

        try {
          const fallbackResponse = await fetch(fallbackUrl);
          if (!fallbackResponse.ok) throw new Error("Fallback fetch failed");

          data = await fallbackResponse.json();
        } catch (fallbackError) {
          console.error("Error fetching from fallback URL:", fallbackError);
          return; // Exit if both fetches fail
        }
      }

      // Log the data to verify its structure and contents
      console.log("Fetched data:", data);

      // Set flaskData and other state variables after fetching
      setFlaskData((prevData) => ({
        ...prevData,
        ...data,
        levels: {
        //   all: data.fields.all.find((field) => field.var === data.fields.selected)?.levels || ["0"],
        //   selected: data.fields.all.find((field) => field.var === data.fields.selected)?.levels?.[0] || "0",
          all: data.levels?.all || ["0"],
          selected: data.levels?.selected || "0",
          label: data.levels?.label || "Levels",
          type: data.levels?.type || "ButtonGroup",
        },
      }));

      // setSelectedValues(
      //   Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value.selected || ""]))
      // );

      setSelectedValues(
        Object.fromEntries(
          Object.entries(data)
            .map(([key, value]) => {
              // If `value.selected` exists but `value.all` does not, return `value.selected` directly
              if (!value.all) {
                return [key, value.selected];
              }
      
              // Skip entries without `value.selected`
              if (!value.selected) return null;
      
              // Find the matching item in `value.all` based on `value.selected`
              const selectedItem = value.all.find((item) =>
                typeof item === "object" ? item.var === value.selected : item === value.selected
              );
      
              return [
                key,
                {
                  var: value.selected || "",
                  label: selectedItem ? (typeof selectedItem === "object" ? selectedItem.label : selectedItem) : ""
                }
              ];
            })
            .filter(Boolean) // Remove null entries from the array before passing to `Object.fromEntries`
        )
      );
      
      
      setOrder(data.order || []);
      if (data.initialTimes) {
        const parsedDate = parseUTCDate(data.initialTimes.selected, data.initialTimes.format_backend);
        setSelectedDatetime(parsedDate);
      }

      setFetchCompleted(true); // Mark fetch as completed to prevent re-fetching
    };

    fetchData();
  }, [primaryUrl, fallbackUrl, requestData, fetchCompleted]); // Add fetchCompleted to dependencies

  // Update levels based on selected field
  const updateLevels = (fieldVar) => {
  // Log the fieldVar and flaskData.fields.all to verify structure and content
  console.log("Field var:", fieldVar);
  console.log("Available fields:", flaskData.fields.all);

  const selectedField = flaskData.fields.all.find((field) => field.var === fieldVar);

  if (selectedField) {
    console.log("Selected field levels:", selectedField.levels);
  } else {
    console.warn(`No field found for var ${fieldVar}, defaulting to [0]`);
  }

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
