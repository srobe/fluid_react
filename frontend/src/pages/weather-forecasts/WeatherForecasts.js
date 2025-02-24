// src/pages/weather-forecasts/WeatherForecasts.js

import React from 'react';
import LandingPageTemplate from '../../layouts/landing-page'

const WeatherLanding = () => {
  const graphData = [
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'Datagrams',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/weather-forecasts/datagrams'
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'Observing System Statistics',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/weather-forecasts/observing-system-statistics'
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'Radiance Monitoring',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/weather-forecasts/radiance-monitoring'
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'Weather Maps',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/weather-forecasts/weather-maps'
    },
    
  ];

  const backgroundImage = `${process.env.PUBLIC_URL}/assets/hero-background.png`;
  return (
    <LandingPageTemplate
      pageTitle="Weather Analysis and Forecasts"
      introText="The Goddard Earth Observing System (GEOS) model is designed
                 to study various Earth Science questions by connecting
                 different model components flexibly."
      graphData={graphData}
      // backgroundImage={`${process.env.PUBLIC_URL}/assets/hero-background.png`}
    />
  );

};

export default WeatherLanding;
