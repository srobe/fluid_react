// src/pages/mission-support/MissionSupport.js

import React from 'react';
import LandingPageTemplate from '../../layouts/landing-page'

const MissionLanding = () => {
  const graphData = [
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'ARCSIX',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/mission-support/ARCSIX'
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'BLUEFLUX',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/mission-support/BLUEFLUX'
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'PACE-PAX',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/mission-support/PACE-PAX'
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'SARP',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/mission-support/SARP'
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'SARP-EAST',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/mission-support/SARP-EAST'
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'SARP-WEST',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/mission-support/SARP-WEST'
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/graph.png`,
      title: 'SCOAPE-II',
      description: 'The Goddard Earth Observing System model is designed to study various Earth Science questions.',
      items: [
      ],
      link: '/mission-support/SCOAPE-II'
    },
  ];

  const backgroundImage = `${process.env.PUBLIC_URL}/assets/hero-background.png`;

  return (
    <LandingPageTemplate
      pageTitle="Mission Support"
      introText="The Goddard Earth Observing System (GEOS) model is designed
                 to study various Earth Science questions by connecting
                 different model components flexibly."
      graphData={graphData}
      // backgroundImage={`${process.env.PUBLIC_URL}/assets/hero-background.png`}
    />
  );
};

export default MissionLanding;