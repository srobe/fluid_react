// src/pages/weather-forecasts/Datagrams_Weather.js
import React from 'react';
import DatagramsTemplate from '../../layouts/grams-page';

function Datagrams() {
  return (
    <DatagramsTemplate
      dataEndpoint="/api/data"
      configFilePath="/data/wxmaps.json"
      backLink={{ url: "/weather-forecasts", text: "< Weather Forecasts" }}
      title="Datagrams"
      description="The Goddard Earth Observing System (GEOS) model is designed
                   to study various Earth Science questions by connecting
                   different model components flexibly."
      showDownloadSection = {true}
    />
  );
}

export default Datagrams;
