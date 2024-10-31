// src/hooks/fetchImageSrc.js

export async function fetchImageSrc(
  url = "https://fluid.nccs.nasa.gov/wxmaps/"
) {
  try {
    // Fetch the HTML content of the page
    const response = await fetch(url, {
      mode: 'no-cors'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the HTML text
    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");

    // Find the first <img> tag and get its src attribute
    const imgElement = doc.querySelector("img");

    if (imgElement) {
      return imgElement.src; // Return the src attribute of the <img>
    } else {
      console.warn("No <img> tag found in the HTML");
      return null; // Return null if no image is found
    }
  } catch (error) {
    console.error("Failed to fetch image src:", error);
    return null;
  }
}


