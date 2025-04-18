
import React from 'react';
import { Link } from 'react-router-dom';
import NasaLogo from '../assets/nasa-logo.png';
import { useState } from 'react';
import { useEffect } from 'react';


const Glossary = () => {

    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
      setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className='min-w-screen min-h-screen flex flex-row justify-center items-start gap-12 bg-white text-black p-8'>
                 
                {/* Side Menu */}
      <div className='flex flex-col w-1/2 p-4 gap-3 bg-white rounded-lg shadow-lg'>
        <h2 className='text-lg font-bold mb-4'>FLUID Glossary</h2>

        {/* GEOS-FP */}
        <div>
          <button
            className='w-full text-left font-semibold mb-2'
            onClick={() => toggleSection('geos')}
          >
            ▸ GEOS-FP: Weather Analyses and Forecasts
          </button>
          {openSection === 'geos' && (
            <ul className='pl-4 space-y-4 text-sm'>
              <li><Link to="#">Meteograms</Link></li>
              <li><Link to="#">Weather Maps</Link></li>
              <li><Link to="#">Atmospheric Composition 2D</Link></li>
              <li><Link to="#">Atmospheric Composition 3D</Link></li>
              <li><Link to="#">Observing System Statistics</Link></li>
            </ul>
          )}
        </div>

        {/* Composition Forecast */}
        <div>
          <button
            className='w-full text-left font-semibold my-2'
            onClick={() => toggleSection('composition')}
          >
            ▸ Composition Forecast Products
          </button>
          {openSection === 'composition' && (
            <ul className='pl-4 space-y-1 text-sm'>
              <li><Link to="#">Some Term A</Link></li>
              <li><Link to="#">Some Term B</Link></li>
            </ul>
          )}
        </div>

        {/* Reanalysis */}
        <div>
          <button
            className='w-full text-left font-semibold my-2'
            onClick={() => toggleSection('reanalysis')}
          >
            ▸ GMAO Reanalysis Products
          </button>
          {openSection === 'reanalysis' && (
            <ul className='pl-4 space-y-1 text-sm'>
              <li><Link to="#">Term X</Link></li>
              <li><Link to="#">Term Y</Link></li>
            </ul>
          )}
        </div>

        {/* Carbon Reanalysis */}
        <div>
          <button
            className='w-full text-left font-semibold my-2'
            onClick={() => toggleSection('carbon')}
          >
            ▸ GMAO Carbon Reanalysis
          </button>
          {openSection === 'carbon' && (
            <ul className='pl-4 space-y-1 text-sm'>
              <li><Link to="#">Carbon A</Link></li>
              <li><Link to="#">Carbon B</Link></li>
            </ul>
          )}
        </div>
      </div>
                
                {/* main search */}
                <div className= 'flex flex-col justify-center items-center text-white p-6 h-fit rounded-md shadow-lg bg-black w-full'>
                    <h1 className='text-2xl font-bold mb-4'>
                        FLUID Glossary
                    </h1>
                    <h1 className='text-md mb-4'>
                       All your terms defined here
                    </h1>
                    {/* Rounded search bar */}
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search locations..."
                    className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                </div>

               
        </div>
    )


};

export default Glossary;