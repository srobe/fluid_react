// src/pages/missions/MapPage.js

import React from 'react';
import { useParams } from 'react-router-dom';
import WeatherMapsTemplate from '../../layouts/maps-page';
import { mapTitles } from './missions';

function MapPage() {
  const { mission, model, mapType } = useParams();
  
  // Dynamically generate JSON config file path
//   const configFilePath = `/data/${mapType}+${mission}.json`;
  const configFilePath = `/data/data5.json`; 

  return (
    <WeatherMapsTemplate
      dataEndpoint="/api/data"
      configFilePath={configFilePath}
      backLink={{ url: `/missions/${mission}/${model}`, text: `< Back to ${model.toUpperCase()} Themes` }}
      title={mapTitles[mapType] || "Unknown Map"}
      description="Explore the selected map for this mission."
      showDownloadSection={false}
    />
  );
}

export default MapPage;
