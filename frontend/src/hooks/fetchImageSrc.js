const apiUrl = process.env.REACT_APP_API_URL || ''; 

export async function fetchImageSrc(
  url = "https://fluid.nccs.nasa.gov/wxmaps/",
  primaryUrl = '/api/generate-graph'
) {
  let data;

  try {
    const primaryResponse = await fetch(`${apiUrl}${primaryUrl}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
    });
    if (!primaryResponse.ok) throw new Error("Primary image fetch failed");

    data = await primaryResponse.json();
    if (data.error) {
      console.error("Error from backend:", data.error);
      return '/assets/fluid_error.png';
    }
  } catch (error) {
    console.error("Error fetching image through fluid, sending fallback:", error);

    // Use local error image
    data = { imagePath: '/assets/fluid_error.png' };
  }
  let imageUrl;

  if (data.imagePath.startsWith('/api')) {
    imageUrl = `${apiUrl}${data.imagePath}`;
  } else {
    imageUrl = data.imagePath;
  }

  return imageUrl;
}

