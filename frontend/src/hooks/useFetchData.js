// src/hooks/useFetchData.js
import { useState, useEffect, useCallback } from "react";
import { parse } from "date-fns";

export default function useFetchData(primaryUrl, fallbackUrl, requestData) {
  const [dropdownData, setDropdownData] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [order, setOrder] = useState([]);
  const [selectedDatetime, setSelectedDatetime] = useState(new Date());
  const [fetchError, setFetchError] = useState(false);
  const [fetched, setFetched] = useState(false); // Tracks if fetch was already attempted

  const fetchData = useCallback(async () => {
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
        setFetchError(true);
        return;
      }
    }

    setDropdownData(data);
    setSelectedValues(
      Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value.selected || ""]))
    );
    setOrder(data.order || []);
    if (data.initialTimes) {
      const parsedDate = parse(data.initialTimes.selected, data.initialTimes.format_date, new Date());
      setSelectedDatetime(parsedDate);
    }
    setFetched(true); // Mark fetch as completed
  }, [primaryUrl, fallbackUrl, requestData]);

  useEffect(() => {
    // Only fetch if no previous error and hasn't fetched before
    if (!fetchError && !fetched) {
      fetchData();
    }
  }, [fetchData, fetchError, fetched]);

  return { dropdownData, selectedValues, order, selectedDatetime, setSelectedValues, setDropdownData };
}
