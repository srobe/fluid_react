// src/components/Footer.js

import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='flex flex-row justify-between items-center h-fit bg-black text-white py-10'>
      <div id='about-text' className='flex flex-col gap-3 ml-7'>
        <h2 className="text-base font-bold">About</h2>
        <p>Global Modeling and Assimilation Office</p>
        <p>Framework for Live-User Invoked Data (FLUID)</p>
      </div>
      <div id='contact-text' className='flex flex-col gap-3 mr-7'>
        <h2 className="text-base font-bold">Contact</h2>
        <p className="flex items-center">
          <FaEnvelope className="mr-2" />
          Web Curator: Callum Wayman
        </p>
        <p className="flex items-center">
          <FaEnvelope className="mr-2" />
          NASA Official: Alexey Shiklomanov
        </p>
      </div>

    </footer>
  );
};

export default Footer;
