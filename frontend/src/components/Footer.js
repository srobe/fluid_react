// src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import NasaLogo from '../assets/nasa-logo.png';
import ESDLogo from '../assets/ESD-logo.png';

const Footer = () => {
  return (
    <footer className="bg-black h-full text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* Left Side - Logo & Description */}
          <div className="mb-8 md:mb-0 md:w-1/2 pr-8">
            <div className="flex flex-row gap-4 h-fit items-center mb-4">
              <img src={NasaLogo} alt="NASA Logo" className="h-12" />
              <img src={ESDLogo} alt="ESD Logo" className="h-8" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Global Modeling and Assimilation Office</h2>
            <p className="text-gray-400 leading-relaxed">
              The purpose of FLUID is to provide applications for interactive analysis and visualizations of experimental,
              climatological data in support of the GMAO mission.
            </p>
            
            <Link to="/feedback" className="inline-block mt-6 border border-white text-white px-6 py-2 hover:bg-white hover:text-gray-900 transition-colors">
              Feedback Form
            </Link>
          </div>
          
          {/* Right Side - About & Contact */}
          <div className="md:w-1/3">
            <div className="mb-8">
              <h3 className="text-gray-400 uppercase text-sm tracking-wider mb-4">ABOUT</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="https://fluid.nccs.nasa.gov/about/" className="text-whitehover:text-blue-400 hover:text-blue-400 transition-colors">
                    Global Modeling and Assimilation (GMAO)
                  </Link>
                </li>
                <li>
                  <Link to="https://fluid.nccs.nasa.gov/about/" className="text-white hover:text-blue-400 transition-colors">
                    Framework for Live-User Invoked Data (FLUID)
                  </Link>
                </li>
                <li>
                  <Link to="https://www.nasa.gov/privacy/" className="text-white hover:text-blue-400 transition-colors">
                    Private Policy
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-gray-400 uppercase text-sm tracking-wider mb-4">CONTACT</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="alexey.shiklomanov@nasa.gov" className="text-white hover:text-blue-400 transition-colors">
                    NASA Official: Alexey Shiklomanov
                  </Link>
                </li>
                <li>
                  <Link to="sandra.roberts@nasa.gov" className="text-white hover:text-blue-400 transition-colors">
                    Web Curator: Sandra Roberts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Blue Bar */}
      {/* <div className="h-1 bg-blue-300"></div> */}
    </footer>
  );
};

export default Footer;
