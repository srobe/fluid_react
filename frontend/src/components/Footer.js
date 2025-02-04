// src/components/Footer.js

import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    // <footer className="bg-black text-white py-10">
    //   <div className=" flex flex-row gap-5 justify-center">
    //     <div className="flex flex-wrap  justify-between">
    //       <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
    //         <h2 className="text-base font-bold mb-4">About</h2>
    //         <p className="mb-2">Global Modeling and Assimilation Office (GMAO)</p>
    //         <p>Framework for Live-User Invoked Data (FLUID)</p>
    //       </div>
    //       <div className="w-full lg:w-1/2">
    //         <h2 className="text-base font-bold mb-4">Contact</h2>
    //         <p className="flex items-center mb-2">
    //           <FaEnvelope className="mr-2" />
    //           Web Curator: Callum Wayman
    //         </p>
    //         <p className="flex items-center">
    //           <FaEnvelope className="mr-2" />
    //           NASA Official: Alexey Shiklomanov
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </footer>

    
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
