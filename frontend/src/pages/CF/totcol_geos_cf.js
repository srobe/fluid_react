// src/pages/aerosol-gas/SpatialMaps_AerosolGas.js


import React from 'react';
import WeatherMapsTemplate from '../../layouts/maps-page';

function WeatherForecasts() {
  return (
    <WeatherMapsTemplate
      dataEndpoint="/api/data"
      configFilePath="/data/classic_geos_cf.json"
      backLink={{ url: "/aerosol-gas", text: "< Aerosol & Gas Forecasts" }}
      title="Total Column Maps"
      description="The Goddard Earth Observing System (GEOS) model is designed
                   to study various Earth Science questions by connecting
                   different model components flexibly."
      showDownloadSection = {false}
    />
  );
}

export default WeatherForecasts;

