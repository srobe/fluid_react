// src/hooks/generateGraph.js

import { getMappedValues } from "../utils/mappedValues";

const apiUrl = process.env.REACT_APP_API_URL || '';

const generateGraph = async (selectedValues, urlInfo) => {
  // Map selectedValues to get the '.var' properties
  const mappedValues = getMappedValues(selectedValues);
  console.log("Selected Values:", mappedValues);

  const { instance, url_theme, stream } = urlInfo;

  // Construct the dynamic URL with template literals
  const dynamicUrl = `https://fluid.nccs.nasa.gov/${instance}/${url_theme}/?stream=${stream}&field=${mappedValues.fields}&level=${mappedValues.levels}&fcst=${mappedValues.initialTimes}&region=${mappedValues.regions}&tau=${mappedValues.leadHours}`;

  console.log("Generated URL:", dynamicUrl);

  // Prepare the request body
  const requestBody = {
    instance: instance,
    url_theme: url_theme,
    stream: stream,
    selected: mappedValues,
    url: dynamicUrl,
  };
  
  let imageUrl;

  try {
    const response = await fetch(`${apiUrl}/api/generate-graph`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) throw new Error("Primary image fetch failed");

    const data = await response.json();

    if (data.error) {
      console.error("Error from backend:", data.error);
      return '/assets/fluid_error.png';
    }

    // Construct the full image URL
    if (data.imagePath.startsWith('/api')) {
      imageUrl = `${apiUrl}${data.imagePath}`;
    } else {
      imageUrl = data.imagePath;
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    imageUrl = '/assets/fluid_error.png';
  }

  return imageUrl; // Return the image source
};

export default generateGraph;