// src/pages/weather-forecasts/WeatherMaps_Weather.js
import React from 'react';
import WeatherMapsTemplate from '../../layouts/maps-page';

function WeatherForecasts() {
  return (
    <WeatherMapsTemplate
      dataEndpoint="/api/data"
      configFilePath="/data/wxmaps.json"
      backLink={{ url: "/weather-forecasts", text: "< Weather Forecasts" }}
      title="Weather Maps"
      description="The Goddard Earth Observing System (GEOS) model is designed
                   to study various Earth Science questions by connecting
                   different model components flexibly."
      showDownloadSection = {true}
    />
  );
}

export default WeatherForecasts;