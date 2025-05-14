// src/components/Navbar.js

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import SearchModal from "./SearchModal";
import NasaLogo from '../assets/nasa-logo.png';

/****************************
 * DATA ────────────────────
 ***************************/
const PRODUCT_ITEMS = [
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

const MISSION_ITEMS = [
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
      { name: "ASIA-AQ", path: "/mission-support/asia-aq" }
    ]
  }
];

/****************************
 * HOOKS ────────────────────
 ***************************/
const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = e => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
};

/****************************
 * COMPONENTS ───────────────
 ***************************/
const Dropdown = ({ label, id, items, openMenu, setOpenMenu }) => {
  const wrapperRef = useRef(null);
  const isOpen = openMenu === id;
  const toggle = () => setOpenMenu(prev => (prev === id ? null : id));
  const close = () => setOpenMenu(null);
  useOnClickOutside(wrapperRef, close);

  /* keyboard support */
  const handleKey = e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    } else if (e.key === "Escape") {
      close();
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        className="nav-btn pr-6"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggle}
        onKeyDown={handleKey}
      >
        {label}
        <svg className={`ml-1 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed left-0 right-0 mt-6 bg-black border-b shadow-xl z-50">
          <div className="max-w-screen-2xl mx-auto p-6 grid gap-4 md:grid-cols-3 lg:grid-cols-5" role="menu" aria-label={label}>
            {items.map(({ category, links }) => (
              <section key={category}>
                <h3 className="text-sm text-gray-400 mb-3 uppercase tracking-wide">{category}</h3>
                <ul className="space-y-2">
                  {links.map(({ name, path }) => (
                    <li key={name}>
                      <Link to={path} className="nav-link" onClick={close} role="menuitem">
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null); // "products" | "mission" | null
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  /* close dropdowns & mobile menu on route change */
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-black border-b border-white sticky top-0 z-50 h-20">
      {/* --- main row --- */}
      <div className="flex items-center px-4 lg:px-8 w-full h-full">
        {/* logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={NasaLogo} alt="NASA logo" className="h-12" />
          <span className="text-white font-light tracking-wide"><span className="font-medium italic">FLUID</span> by NASA GMAO</span>
        </Link>
        <div className="flex-grow"></div>
        {/* desktop nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Dropdown id="products" label="Products" items={PRODUCT_ITEMS} openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <Dropdown id="mission" label="Mission Support" items={MISSION_ITEMS} openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <Link to="/about" className="nav-btn">About</Link>
          <Link to="/glossary" className="nav-btn">Glossary</Link>
          <SearchModal />
        </div>

        {/* mobile burger */}
        <button onClick={() => setMobileOpen(o => !o)} className="md:hidden text-white p-2" aria-label="Toggle menu">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* --- mobile accordions --- */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 px-4 py-6 space-y-6">
          <details className="group">
            <summary className="nav-btn justify-between">
              Products
              <span className="transition-transform group-open:rotate-180">▼</span>
            </summary>
            {PRODUCT_ITEMS.map(({ category, links }) => (
              <div key={category} className="mt-4">
                <h3 className="text-sm text-gray-400 mb-2">{category}</h3>
                <ul className="space-y-1 ml-2">
                  {links.map(({ name, path }) => (
                    <li key={name}>
                      <Link to={path} className="nav-link block py-1" onClick={() => setMobileOpen(false)}>
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </details>

          <details className="group">
            <summary className="nav-btn justify-between">
              Mission Support
              <span className="transition-transform group-open:rotate-180">▼</span>
            </summary>
            {MISSION_ITEMS.map(({ category, links }) => (
              <div key={category} className="mt-4">
                <h3 className="text-sm text-gray-400 mb-2">{category}</h3>
                <ul className="space-y-1 ml-2">
                  {links.map(({ name, path }) => (
                    <li key={name}>
                      <Link to={path} className="nav-link block py-1" onClick={() => setMobileOpen(false)}>
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </details>

          <Link to="/about" className="nav-link block" onClick={() => setMobileOpen(false)}>
            About
          </Link>
          <Link to="/glossary" className="nav-link block" onClick={() => setMobileOpen(false)}>
            Glossary
          </Link>
          <SearchModal />
        </div>
      )}
    </nav>
  );
};

export default Navbar;