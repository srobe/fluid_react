// src/components/LandingPageTemplate.js

import React from 'react';
import GraphCard from '../components/GraphCard';
import GraphImg from "../assets/graph.png";
import BackgroundImg from "../assets/hero-background.png";

const LandingPageTemplate = ({
  pageTitle,        // e.g., "Aerosol & Gas Forecasts"
  introText,        // e.g., the paragraph describing GEOS
  graphData,        // array of data for GraphCard
  backgroundImage,  // optional background image
}) => {
  return (
    <div className="relative w-full" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container mx-auto py-16">
        {/* Back link navigation */}
        <nav className="mb-4">
          <a href="/" className="text-blue-600 underline">&lt; Home</a>
        </nav>
        
        {/* Page Title */}
        <h2 className="text-2xl font-bold mb-4">{pageTitle}</h2>

        {/* Intro / Description Text */}
        <p className="text-lg mb-8 max-w-3xl">
          {introText}
        </p>

        {/* Graph Cards */}
        <div className="flex flex-wrap -mx-4">
          {graphData.map((graph, index) => (
            <GraphCard
              key={index}
              image={graph.image}
              title={graph.title}
              description={graph.description}
              items={graph.items}
              link={graph.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPageTemplate;
