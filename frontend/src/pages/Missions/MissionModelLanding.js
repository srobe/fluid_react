import React from 'react';
import { useParams } from 'react-router-dom';
import LandingPageTemplate from '../../layouts/landing-page';
import GraphImg from '../../assets/graph.png';
import { missionTypes, mapTypes, mapTitles } from './missions';

function MissionModelLanding() {
  const { mission, model } = useParams(); // model is "fp" or "cf"
  const missionType = missionTypes[mission] || 'base';

  // Get available themes for the mission type and selected model
  const themes = mapTypes[model][missionType] || [];

  const graphData = themes.map((theme) => ({
    image: GraphImg,
    title: mapTitles[theme] || theme, // Use readable title
    description: 'Explore this mission theme in detail.',
    link: `/missions/${mission}/${model}/${theme}`,
  }));

  return (
    <LandingPageTemplate
      pageTitle={`${mission.toUpperCase()} - ${model.toUpperCase()} Themes`}
      introText="Select a theme to view maps."
      graphData={graphData}
      backLink={{ url: `/missions/${mission}`, text: `< ${mission} Home`}}
    />
  );
}

export default MissionModelLanding;
