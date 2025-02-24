// src/pages/aerosol-gas/AerosolGasForecasts.js

import React from 'react';
import LandingPageTemplate from '../../layouts/landing-page'


const AerosolGasLanding = () => {
  const graphData = [
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'Datagrams',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/aerosol-gas/datagrams'
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'Saptial Maps',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/aerosol-gas/spatial-maps'
    },
  ];

  const backgroundImage = `${process.env.PUBLIC_URL}/assets/hero-background.png`;

  return (
    <LandingPageTemplate
      pageTitle="Aerosol & Gas Forecasts"
      introText="The Goddard Earth Observing System (GEOS) model is designed
                 to study various Earth Science questions by connecting
                 different model components flexibly."
      graphData={graphData}
      // backgroundImage={`${process.env.PUBLIC_URL}/assets/hero-background.png`}
    />
  );
};

export default AerosolGasLanding;
