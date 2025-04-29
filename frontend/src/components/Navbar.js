// src/components/Navbar.js

import React, { useState, useRef, useEffect } from 'react';
import { FaCaretDown, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SearchModal from './SearchModal';
import NasaLogo from '../assets/nasa-logo.png';

const Navbar = () => {
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [missionMenuOpen, setMissionMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [currentFocus, setCurrentFocus] = useState(null);
  const timeoutRef = useRef(null);

  const productMenuRef = useRef(null);
  const missionMenuRef = useRef(null);
  const productButtonRef = useRef(null);
  const missionButtonRef = useRef(null);
  const aboutLinkRef = useRef(null);
  const glossaryLinkRef = useRef(null);
  const searchButtonRef = useRef(null);
  const firstProductItemRef = useRef(null);
  const firstMissionItemRef = useRef(null);

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

  const handleKeyDown = (e, type) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (type === 'products') {
        setProductMenuOpen(!productMenuOpen);
        setMissionMenuOpen(false);
        if (!productMenuOpen) {
          // Focus first item in menu when opening
          setTimeout(() => {
            firstProductItemRef.current?.focus();
          }, 10);
        } else {
          // Return focus to button when closing
          productButtonRef.current?.focus();
        }
      } else if (type === 'mission') {
        setMissionMenuOpen(!missionMenuOpen);
        setProductMenuOpen(false);
        if (!missionMenuOpen) {
          // Focus first item in menu when opening
          setTimeout(() => {
            firstMissionItemRef.current?.focus();
          }, 10);
        } else {
          // Return focus to button when closing
          missionButtonRef.current?.focus();
        }
      }
    } else if (e.key === 'Escape') {
      if (productMenuOpen) {
        setProductMenuOpen(false);
        productButtonRef.current?.focus();
      } else if (missionMenuOpen) {
        setMissionMenuOpen(false);
        missionButtonRef.current?.focus();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if ((type === 'products' && !productMenuOpen) || (type === 'mission' && !missionMenuOpen)) {
        // Open menu on arrow down
        if (type === 'products') {
          setProductMenuOpen(true);
          setMissionMenuOpen(false);
          setTimeout(() => {
            firstProductItemRef.current?.focus();
          }, 10);
        } else if (type === 'mission') {
          setMissionMenuOpen(true);
          setProductMenuOpen(false);
          setTimeout(() => {
            firstMissionItemRef.current?.focus();
          }, 10);
        }
      }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (type === 'products') {
        missionButtonRef.current?.focus();
      } else if (type === 'mission') {
        aboutLinkRef.current?.focus();
      } else if (type === 'about') {
        glossaryLinkRef.current?.focus();
      } else if (type === 'glossary') {
        searchButtonRef.current?.focus();
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (type === 'mission') {
        productButtonRef.current?.focus();
      } else if (type === 'about') {
        missionButtonRef.current?.focus();
      } else if (type === 'glossary') {
        aboutLinkRef.current?.focus();
      } else if (type === 'search') {
        glossaryLinkRef.current?.focus();
      }
    } else if (e.key === 'Tab') {
      // Close menus when tabbing outside
      if (productMenuOpen || missionMenuOpen) {
        setTimeout(() => {
          const activeElement = document.activeElement;
          if (productMenuOpen && !productMenuRef.current?.contains(activeElement)) {
            setProductMenuOpen(false);
          }
          if (missionMenuOpen && !missionMenuRef.current?.contains(activeElement)) {
            setMissionMenuOpen(false);
          }
        }, 10);
      }
    }
  };

  // Handle menu item navigation
  const handleMenuItemKeyDown = (e, menuType, index, links, category) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextItem = e.target.nextElementSibling;
      if (nextItem) {
        nextItem.focus();
      } else {
        // Move to the next category's first item
        const currentCategoryIndex = menuType === 'products' 
          ? productItems.findIndex(item => item.category === category)
          : missionItems.findIndex(item => item.category === category);
        
        const nextCategory = menuType === 'products' 
          ? productItems[currentCategoryIndex + 1]
          : missionItems[currentCategoryIndex + 1];
          
        if (nextCategory) {
          const nextCategoryFirstItem = document.querySelector(`[data-category="${nextCategory.category}"] a`);
          nextCategoryFirstItem?.focus();
        }
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevItem = e.target.previousElementSibling;
      if (prevItem && prevItem.tagName === 'A') {
        prevItem.focus();
      } else {
        // Move to previous category's last item
        const currentCategoryIndex = menuType === 'products' 
          ? productItems.findIndex(item => item.category === category)
          : missionItems.findIndex(item => item.category === category);
        
        const prevCategory = menuType === 'products' 
          ? productItems[currentCategoryIndex - 1]
          : missionItems[currentCategoryIndex - 1];
          
        if (prevCategory) {
          const prevCategoryItems = document.querySelectorAll(`[data-category="${prevCategory.category}"] a`);
          const lastItem = prevCategoryItems[prevCategoryItems.length - 1];
          lastItem?.focus();
        } else {
          // Focus back on the menu button if at the top
          if (menuType === 'products') {
            productButtonRef.current?.focus();
          } else {
            missionButtonRef.current?.focus();
          }
        }
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (menuType === 'products') {
        setProductMenuOpen(false);
        productButtonRef.current?.focus();
      } else {
        setMissionMenuOpen(false);
        missionButtonRef.current?.focus();
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      // Focus the first item of the current category
      const firstItemInCategory = document.querySelector(`[data-category="${category}"] a`);
      firstItemInCategory?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      // Focus the last item of the current category
      const itemsInCategory = document.querySelectorAll(`[data-category="${category}"] a`);
      const lastItem = itemsInCategory[itemsInCategory.length - 1];
      lastItem?.focus();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productMenuRef.current && !productMenuRef.current.contains(event.target)) {
        setProductMenuOpen(false);
      }
      if (missionMenuRef.current && !missionMenuRef.current.contains(event.target)) {
        setMissionMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);  

  // Set up refs when menus change
  useEffect(() => {
    if (productMenuOpen) {
      // Save reference to first focusable item
      const firstItem = document.querySelector('[data-menu="products"] a');
      if (firstItem) firstProductItemRef.current = firstItem;
    }
    
    if (missionMenuOpen) {
      // Save reference to first focusable item
      const firstItem = document.querySelector('[data-menu="mission"] a');
      if (firstItem) firstMissionItemRef.current = firstItem;
    }
  }, [productMenuOpen, missionMenuOpen]);

  const productItems = [
    {
      category: "WEATHER FORECASTS",
      links: [
        { name: "Datagrams", path: "/weather-forecasts/datagrams" },
        { name: "WxMaps", path: "/weather-forecasts/weather-maps" },
        { name: "Observing System Statistics", path: "/weather-forecasts/observing-system-statistics" },
        { name: "Radiance Monitoring", path: "/weather-forecasts/radiance-monitoring" },
        { name: "Observation Impacts", path: "/weather-forecasts/observation-impacts" }
      ]
    },
    {
      category: "REANALYSIS: MERRA-2",
      links: [
        { name: "Weather Maps", path: "/merra2/weather-maps" },
        { name: "Chem Maps", path: "/merra2/chem-maps" },
        { name: "Anomalies", path: "/merra2/anomalies-maps" },
        { name: "Climate Statistics", path: "/merra2/climate-statistics-maps" }
      ]
    },
    {
      category: "REANALYSIS: CARBON",
      links: [
        { name: "Datagrams", path: "/carbon/carbon-datagrams" },
        { name: "Surface Concentration", path: "/carbon/surface-maps" },
        { name: "Total Column", path: "/carbon/total-column" }
      ]
    },
    {
      category: "AEROSOL & GAS: COMPOSITION FORECASTING",
      links: [
        { name: "Datagrams", path: "/cf/cf-datagrams" },
        { name: "Total Column", path: "/cf/total-column-maps" },
        { name: "Surface Concentration", path: "/cf/surface-maps" }
      ]
    },
    {
      category: "AEROSOL & GAS: FORWARD PROCESSING",
      links: [
        { name: "Aerosol Datagrams", path: "/aerosol-gas/fp-datagrams" },
        { name: "2-D Chem Maps", path: "/aerosol-gas/fp-chem-maps-2d" },
        { name: "3-D Chem Maps", path: "/aerosol-gas/fp-chem-maps-3d" }
      ]
    }
  ];

  const missionItems = [
    {
      category: "ACTIVE",
      links: [
        { name: "AGEST", path: "/mission-support/agest" },
        { name: "BLUEFLUX", path: "/mission-support/blueflux" },
        { name: "PACE-PAX", path: "/mission-support/pace-pax" },
        { name: "SARP-EAST", path: "/mission-support/sarp-east" }
      ]
    },
    {
      category: "NON-ACTIVE",
      links: [
        { name: "ABOVE", path: "/mission-support/above" },
        { name: "ACCLIP", path: "/mission-support/acclip" },
        { name: "ACE-ENA", path: "/mission-support/ace-ena" },
        { name: "AEOLUS-CALVAL", path: "/mission-support/aeolus-calval" },
        { name: "ASIA-AQ", path: "/mission-support/asia-aq" },
      ]
    }
  ];

  return (
    <nav className="bg-black py-4 border-b border-white relative z-50 sticky top-0">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={`${process.env.PUBLIC_URL}/assets/nasa-logo.png`} alt="NASA Logo" className="h-8" />
          <span className="text-white font-light tracking-wide">
            <span className="font-medium italic">FLUID</span> by NASA GMAO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          {/* Products Dropdown */}
          <div className="relative" ref={productMenuRef}>
            <button 
              ref={productButtonRef}
              onClick={() => {
                setProductMenuOpen(!productMenuOpen);
                setMissionMenuOpen(false);
              }}
              onKeyDown={(e) => handleKeyDown(e, 'products')}
              className="text-white text-sm font-semibold hover:text-gray-300 flex items-center pr-8"
              aria-expanded={productMenuOpen}
              aria-haspopup="true"
            >
              Products
              <svg 
                className={`ml-1 h-4 w-4 transition-transform ${productMenuOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {productMenuOpen && (
              <div 
                className="fixed left-0 right-0 bg-black mt-6 border-b shadow-xl z-50"
                data-menu="products"
                role="menu"
                aria-labelledby="products-menu"
              >
                <div className="container mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-6">
                    {productItems.map((category, idx) => (
                      <div key={idx} className="mb-4" data-category={category.category}>
                        <h3 className="text-sm text-gray-400 mb-3">{category.category}</h3>
                        <ul className="space-y-2">
                          {category.links.map((link, linkIdx) => (
                            <li key={linkIdx}>
                              <Link 
                                to={link.path} 
                                className="text-white hover:text-blue-400 text-sm"
                                onKeyDown={(e) => handleMenuItemKeyDown(e, 'products', linkIdx, category.links, category.category)}
                                role="menuitem"
                                tabIndex={0}
                                ref={idx === 0 && linkIdx === 0 ? firstProductItemRef : null}
                              >
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mission Support Dropdown */}
          <div className="relative" ref={missionMenuRef}>
            <button 
              ref={missionButtonRef}
              onClick={() => {
                setMissionMenuOpen(!missionMenuOpen);
                setProductMenuOpen(false);
              }}
              onKeyDown={(e) => handleKeyDown(e, 'mission')}
              className="text-white text-sm font-semibold hover:text-gray-300 flex items-center pr-8"
              aria-expanded={missionMenuOpen}
              aria-haspopup="true"
            >
              Mission Support
              <svg 
                className={`ml-1 h-4 w-4 transition-transform ${missionMenuOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {missionMenuOpen && (
              <div 
                className="fixed left-0 right-0 mt-6 bg-black border-b shadow-xl z-50"
                data-menu="mission"
                role="menu"
                aria-labelledby="mission-menu"
              >
                <div className="container mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-6">
                    {missionItems.map((category, idx) => (
                      <div key={idx} className="mb-4" data-category={category.category}>
                        <h3 className="text-sm text-gray-400 mb-3">{category.category}</h3>
                        <ul className="space-y-2">
                          {category.links.map((link, linkIdx) => (
                            <li key={linkIdx}>
                              <Link 
                                to={link.path} 
                                className="text-white hover:text-blue-400 text-sm"
                                onKeyDown={(e) => handleMenuItemKeyDown(e, 'mission', linkIdx, category.links, category.category)}
                                role="menuitem"
                                tabIndex={0}
                                ref={idx === 0 && linkIdx === 0 ? firstMissionItemRef : null}
                              >
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* About */}
          <Link 
            to="/about" 
            className="text-white text-sm font-semibold hover:text-gray-200 pr-8"
            ref={aboutLinkRef}
            onKeyDown={(e) => handleKeyDown(e, 'about')}
          >
            About
          </Link>

          {/* Glossary */}
          <Link 
            to="/glossary" 
            className="text-white text-sm font-semibold hover:text-gray-200 pr-8"
            ref={glossaryLinkRef}
            onKeyDown={(e) => handleKeyDown(e, 'glossary')}
          >
            Glossary
          </Link>

          {/* Search Button */}
          <div ref={searchButtonRef} onKeyDown={(e) => handleKeyDown(e, 'search')}>
            <SearchModal />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 mt-2">
          <div className="py-2 px-4 space-y-4">
            <button
              onClick={() => setProductMenuOpen(!productMenuOpen)}
              className="w-full text-left text-white py-2 flex justify-between items-center"
            >
              Products
              <svg 
                className={`h-4 w-4 transition-transform ${productMenuOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {productMenuOpen && (
              <div className="ml-4 space-y-4">
                {productItems.map((category, idx) => (
                  <div key={idx} className="mb-4">
                    <h3 className="text-sm text-gray-400 mb-2">{category.category}</h3>
                    <ul className="space-y-2 ml-2">
                      {category.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <Link 
                            to={link.path} 
                            className="text-white hover:text-blue-400 text-sm block py-1"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setMissionMenuOpen(!missionMenuOpen)}
              className="w-full text-left text-white py-2 flex justify-between items-center"
            >
              Mission Support
              <svg 
                className={`h-4 w-4 transition-transform ${missionMenuOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {missionMenuOpen && (
              <div className="ml-4 space-y-4">
                {missionItems.map((category, idx) => (
                  <div key={idx} className="mb-4">
                    <h3 className="text-sm text-gray-400 mb-2">{category.category}</h3>
                    <ul className="space-y-2 ml-2">
                      {category.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <Link 
                            to={link.path} 
                            className="text-white hover:text-blue-400 text-sm block py-1"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            <Link to="/about" className="block text-white py-2">
              About
            </Link>

            <Link to="/glossary" className="block text-white py-2">
              Glossary
            </Link>

            <button className="flex items-center text-white py-2">
              <FaSearch size={18} className="mr-2" />
              Search
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
