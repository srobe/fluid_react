// src/pages/seasonal-prediction/SurfaceConcentrations_Seasonal.js

import React from 'react';
import WeatherMapsTemplate from '../../layouts/maps-page';

function WeatherForecasts() {
  return (
    <WeatherMapsTemplate
      dataEndpoint="/api/data"
      configFilePath="/data/classic_merra2.json"
      backLink={{ url: "/seasonal-prediction", text: "< Seasonal Prediction" }}
      title="S2S Maps"
      description="The Goddard Earth Observing System (GEOS) model is designed
                   to study various Earth Science questions by connecting
                   different model components flexibly."
      showDownloadSection = {true}
    />
  );
}

export default WeatherForecasts;

