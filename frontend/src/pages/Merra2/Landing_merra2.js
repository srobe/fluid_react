// src/pages/reanalysis/Reanalysis.js

import React from 'react';
import LandingPageTemplate from '../../layouts/landing-page'

const ReanalysisLanding = () => {
  const graphData = [
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'Anomalies',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/reanalysis/anomalies'
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'Chem Maps',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/reanalysis/chem-maps'
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'Climate Statistics',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/reanalysis/climate-statistics'
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'Weather Maps',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/reanalysis/weather-maps'
    },
  ];

  const backgroundImage = `${process.env.PUBLIC_URL}/assets/hero-background.png`;
  return (
    <LandingPageTemplate
      pageTitle="Reanalysis"
      introText="The Goddard Earth Observing System (GEOS) model is designed
                 to study various Earth Science questions by connecting
                 different model components flexibly."
      graphData={graphData}
      // backgroundImage={`${process.env.PUBLIC_URL}/assets/hero-background.png`}
    />
  );
};

export default ReanalysisLanding;
