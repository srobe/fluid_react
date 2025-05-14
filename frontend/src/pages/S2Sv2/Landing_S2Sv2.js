// src/pages/seasonal-prediction/SeasonalPrediction.js

import React from 'react';
import LandingPageTemplate from '../../layouts/landing-page'

const Seasonal = () => {
  const graphData = [
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'Datagrams',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/seasonal-prediction/datagrams'
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'Surface Concentrations',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/seasonal-prediction/surface-concentrations'
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'Total Columns',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/seasonal-prediction/total-columns'
    },
  ];

  const backgroundImage = `${process.env.PUBLIC_URL}/assets/hero-background.png`;
  return (
    <LandingPageTemplate
      pageTitle="Seasonal Prediction"
      introText="The Goddard Earth Observing System (GEOS) model is designed
                 to study various Earth Science questions by connecting
                 different model components flexibly."
      graphData={graphData}
      // backgroundImage={`${process.env.PUBLIC_URL}/assets/hero-background.png`}
    />
  );
};

export default Seasonal;
