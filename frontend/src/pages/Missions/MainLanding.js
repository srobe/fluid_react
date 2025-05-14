import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPageTemplate from '../../layouts/landing-page';
import GraphImg from '../../assets/graph.png';
import BackgroundImg from "../../assets/hero-background.png";
import GraphCard from '../../components/GraphCard';
import { activeMissions, recentMissions, missionTypes } from './missions';

const MissionLanding = () => {
  const navigate = useNavigate();

  // Get all missions from `missionTypes`
  const allMissions = Object.keys(missionTypes);

  // Determine inactive missions (anything not in active or recent)
  const inactiveMissions = allMissions.filter(
    (mission) => !activeMissions.includes(mission) && !recentMissions.includes(mission)
  );

  // Generate GraphCard data dynamically
  const generateGraphData = (missions) =>
    missions.map((mission) => ({
      image: GraphImg,
      title: mission,
      description: `Explore ${mission} mission details.`,
      link: `/missions/${mission}`,
    }));

  return (
    <div className="relative w-full" > 
      <div className="container mx-auto py-16">
        {/* Back link navigation */}
        <nav className="mb-4">
          <a href="/" className="text-blue-600 underline">&lt; Home</a>
        </nav>

        {/* Active Missions Section */}
        <h2 className="text-2xl font-bold mb-4">Active Missions</h2>
        <div className="flex flex-wrap -mx-4">
          {generateGraphData(activeMissions).map((graph, index) => (
            <GraphCard key={index} {...graph} />
          ))}
        </div>

        {/* Recent Missions Section */}
        <h2 className="text-2xl font-bold mb-4 mt-10">Recent Missions</h2>
        <div className="flex flex-wrap -mx-4">
          {generateGraphData(recentMissions).map((graph, index) => (
            <GraphCard key={index} {...graph} />
          ))}
        </div>

        {/* Inactive Missions Section */}
        <h2 className="text-2xl font-bold mb-4 mt-10">Inactive Missions</h2>
        <div className="flex flex-wrap -mx-4">
          {generateGraphData(inactiveMissions).map((graph, index) => (
            <GraphCard key={index} {...graph} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MissionLanding;


