// src/components/Navbar.js

import React, { useState, useRef } from 'react';
import { FaCaretDown, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const timeoutRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 300); // Adjust the delay as needed
  };

  return (
    <nav className="bg-black p-5 flex flex-row w-full h-fit border-b justify-center border-white z-50 relative ">
      <div className=" w-full flex justify-between items-center">
        
        {/* LOGO */}
        <div className=" items-center">
          <Link to='/'>
            <img src={`${process.env.PUBLIC_URL}/assets/nasa-logo.png`} alt="NASA Logo" className="h-10 mr-3 shrink-0 w-auto object-contain" />
          </Link>
        </div>

        {/* MOBILE */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <ul className={`md:flex justify-end md:space-x-6 w-full h-full text-white items-center font-helvetica sm:text-xs text-base ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          
          {/* Home */}
          <li className="relative group w-fit">
            <Link to="/" className="flex items-center hover:text-blue-400 w-full md:w-auto">
              Home 
            </Link>
          </li>
          {/* Weather Forecasts */}
          <li className="relative group w-fit text-nowrap" onMouseEnter={() => handleMouseEnter('weather')} onMouseLeave={handleMouseLeave}>
            <Link to="/weather-forecasts" className="flex items-center hover:text-blue-400 w-full md:w-auto ">
              Weather Maps <FaCaretDown className="ml-1 inline" />
            </Link>
            <ul className={`bg-black mt-1 p-4 space-y-2 w-full md:w-52 md:absolute md:bg-black md:p-4 md:space-y-2
            transition-opacity duration-300 ease-in-out 
            ${hoveredMenu === 'weather' ? 'opacity-100' : 'opacity-0'}`}>
              <li><a href="/weather-forecasts/datagrams" className="hover:text-blue-400 whitespace-nowrap">Datagrams</a></li>
              <li><a href="/weather-forecasts/weather-maps" className="hover:text-blue-400 whitespace-nowrap">WxMaps</a></li>
              <li><a href="/weather-forecasts/observing-system-statistics" className="hover:text-blue-400 whitespace-nowrap">Observing System Statistics</a></li>
              <li><a href="/weather-forecasts/radiance-monitoring" className="hover:text-blue-400 whitespace-nowrap">Radiance Monitoring</a></li>
            </ul>
          </li>
          
          {/* Aerosol & Gas Forecasts */}
          <li className="relative group w-fit text-nowrap" onMouseEnter={() => handleMouseEnter('aerosol')} onMouseLeave={handleMouseLeave}>
            <Link to="/aerosol-gas" className="flex items-center hover:text-blue-400 w-full md:w-auto">
              Aerosol & Gas Forecasts <FaCaretDown className="ml-1" />
            </Link>
            <ul className={`bg-black mt-1 p-4 space-y-2 w-full md:w-64 md:absolute md:bg-black md:p-4 md:space-y-2 transition-opacity duration-300 ease-in-out ${hoveredMenu === 'aerosol' ? 'opacity-100' : 'opacity-0'}`}>
              <li className="text-gray-400 whitespace-nowrap">Forward Processing</li>
              <li><a href="/aerosol-gas/datagrams" className="hover:text-blue-400 whitespace-nowrap">Datagrams (Aerograms)</a></li>
              <li><a href="/aerosol-gas/chem-maps" className="hover:text-blue-400 whitespace-nowrap">2D Chem (Atmospheric Composition)</a></li>
              <li><a href="/aerosol-gas/chem-maps" className="hover:text-blue-400 whitespace-nowrap">3D Chem (Atmospheric Composition)</a></li>
              <li className="text-gray-400 whitespace-nowrap">Composition Forecast</li>
              <li><a href="/aerosol-gas/surface-concentrations" className="hover:text-blue-400 whitespace-nowrap">Surface Concentrations</a></li>
              <li><a href="/aerosol-gas/total-column" className="hover:text-blue-400 whitespace-nowrap">Total Column</a></li>
            </ul>
          </li>

          {/* Seasonal Prediction */}
          <li>
            <Link to="/seasonal-prediction" className="w-fit text-nowrap hover:text-blue-400 block md:inline-block">
              Seasonal Prediction
            </Link>
          </li>
          
          {/* Reanalysis */}
          <li className="relative group w-fit text-nowrap" onMouseEnter={() => handleMouseEnter('reanalysis')} onMouseLeave={handleMouseLeave}>
            <Link to="/reanalysis" className="flex items-center hover:text-blue-400 w-full md:w-auto">
              Reanalysis <FaCaretDown className="ml-1" />
            </Link>
            <ul className={`bg-black mt-1 p-4 space-y-2 w-full md:w-48 md:absolute md:bg-black md:p-4 md:space-y-2 transition-opacity duration-300 ease-in-out ${hoveredMenu === 'reanalysis' ? 'opacity-100' : 'opacity-0'}`}>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">MERRA-2</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">Wx Maps</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">Chem Maps</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">Anomalies</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">Climate Statistics</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">Carbon</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">Spatial Maps</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">Datagrams</a></li>
            </ul>
          </li>

          {/* Mission Support */}
          <li className="relative group w-fit text-nowrap" onMouseEnter={() => handleMouseEnter('mission')} onMouseLeave={handleMouseLeave}>
            <Link to="/mission-support" className="flex items-center hover:text-blue-400 w-full md:w-auto">
              Mission Support <FaCaretDown className="ml-1" />
            </Link>
            <ul className={`bg-black mt-1 p-4 space-y-2 w-full md:w-48 md:absolute md:bg-black md:p-4 md:space-y-2 transition-opacity duration-300 ease-in-out ${hoveredMenu === 'mission' ? 'opacity-100' : 'opacity-0'}`}>
              <li className="text-gray-400 whitespace-nowrap">Active</li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">AGEST</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">BLUEFLUX</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">PACE-PAX</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">SARP-EAST</a></li>
              <li className="text-gray-400 whitespace-nowrap">Non-active</li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">ABOVE</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">ACCLIP</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">ACE-ENA</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">AEOLUS-CALVAL</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">ASIA-AQ</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">ATOM</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">CAMP2EX</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">DCOTSS</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">EPOCH</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">MOSAIC</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">ORACLES</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">PRDUST</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">SCOPE</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">SOCRATES</a></li>
              <li><a href="#" className="hover:text-blue-400 whitespace-nowrap">TRACER-AQ</a></li>
            </ul>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
