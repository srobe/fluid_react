// src/pages/aerosol-gas/Datagrams_AerosolGas.js

import React from 'react';
import DatagramsTemplate from '../../layouts/grams-page';

function Datagrams() {
  return (
    <DatagramsTemplate
      dataEndpoint="/api/data"
      configFilePath="/data/classic_geos_cf.json"
      backLink={{ url: "/aerosol-gas", text: "< Aerosol & Gas Forecasts" }}
      title="Weather Maps"
      description="The Goddard Earth Observing System (GEOS) model is designed
                   to study various Earth Science questions by connecting
                   different model components flexibly."
      showDownloadSection = {true}
    />
  );
}

export default Datagrams;
