import React from 'react';
import { useParams } from 'react-router-dom';
import LandingPageTemplate from '../../layouts/landing-page';
import GraphImg from '../../assets/graph.png';
import { missionTypes, mapTypes, mapTitles } from './missions';

function MissionLanding() {
  const { mission } = useParams();
  const missionType = missionTypes[mission] || 'base'; // Default to 'base' if not found

  // Check if mission is 'customB' and needs an FP/CF selection page
  if (missionType === 'customB') {
    const graphData = [
      {
        image: GraphImg,
        title: 'GEOS-FP Products',
        description: 'Click to explore GEOS-FP themes.',
        link: `/missions/${mission}/fp`,
      },
      {
        image: GraphImg,
        title: 'GEOS-CF Products',
        description: 'Click to explore GEOS-CF themes.',
        link: `/missions/${mission}/cf`,
      },
    ];

    return (
      <LandingPageTemplate
        pageTitle={`${mission} Mission`}
        introText="Select a GEOS model to continue."
        graphData={graphData}
      />
    );
  }

  // Otherwise, show all available themes directly
  const themes = mapTypes["fp"][missionType] || []; // Get FP themes for this missionType

  const graphData = themes.map((theme) => ({
    image: GraphImg,
    title: mapTitles[theme] || theme, // Use map title, fallback to theme name
    description: 'Explore this mission theme in detail.',
    link: `/missions/${mission}/fp/${theme}`,
  }));

  return (
    <LandingPageTemplate
      pageTitle={`${mission} Mission`}
      introText="Select a theme to continue."
      graphData={graphData}
      backLink={{ url: "/missions", text: "< Missions Home"}}
    />
  );
}

export default MissionLanding;

