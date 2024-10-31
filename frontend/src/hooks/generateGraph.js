// src/hooks/generateGraph.js

import { fetchImageSrc } from "./fetchImageSrc"; // Adjust path as necessary
import { getMappedValues } from "../utils/mappedValues";

const grabGraph = async (selectedValues,instance, url_theme, stream, theme) => {
  // Destructure selected values with the `.var` property where needed
  const { field, level, initialTime, region, leadHour } = selectedValues;
  console.log("Selected Values:", selectedValues);

  // Construct the dynamic URL with template literals
  const dynamicUrl = `https://fluid.nccs.nasa.gov/${instance}/${url_theme}/?stream=${stream}&field=${selectedValues.fields}&level=${selectedValues.levels}&fcst=${selectedValues.initialTimes}&region=${selectedValues.regions}&tau=${selectedValues.leadHours}`;

  console.log("Generated URL:", dynamicUrl);

  try {
    // Attempt to fetch the image source from the generated URL
    const imageSrc = await fetchImageSrc(dynamicUrl);
    if (imageSrc) {
      return imageSrc; // Return the fetched image source if successful
    } else {
      console.warn("Image not found, returning error image.");
      return "/assets/fluid_error.png"; // Path to error image in the public directory
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return "/assets/fluid_error.png"; // Return error image on failure
  }
};


const generateGraph = async (selectedValues,urlinfo) => {
  console.log(
    "Sent selected data:",
    JSON.stringify({ ...getMappedValues(selectedValues), mission: "SARP-East" })
  );

  // Call grabGraph with the required parameters and return the result
  const img = await grabGraph(getMappedValues(selectedValues), urlinfo.instance,urlinfo.url_theme, urlinfo.stream, urlinfo.theme);
  return img; // Return image source
};

export default generateGraph;
