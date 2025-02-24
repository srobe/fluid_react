// src/pages/reanalysis/ClimateStatistics_Reanalysis.js

import React from 'react';
import WeatherMapsTemplate from '../../layouts/maps-page';

function WeatherForecasts() {
  return (
    <WeatherMapsTemplate
      dataEndpoint="/api/data"
      configFilePath="/data/classic_merra2.json"
      backLink={{ url: "/reanalysis", text: "< Reanalysis" }}
      title="Climate Statistics"
      description="The Goddard Earth Observing System (GEOS) model is designed
                   to study various Earth Science questions by connecting
                   different model components flexibly."
      showDownloadSection = {false}
    />
  );
}

export default WeatherForecasts;
