import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';

import About from './pages/About'

import MissionSupport from './pages/mission-support/MissionSupport';
import ARCSIX from './pages/mission-support/ARCSIX';
import BLUEFLUX from './pages/mission-support/BLUEFLUX';
import PACEPAX from './pages/mission-support/PACE-PAX';
import SARP from './pages/mission-support/SARP';
import SARPEAST from './pages/mission-support/SARP-EAST';
import SARPWEST from './pages/mission-support/SARP-WEST';
import SCOAPEII from './pages/mission-support/SCOAPE-II';

import * as CF from './pages/CF';
import * as Carbon from './pages/Carbon';
import * as MERRA2 from './pages/MERRA2';
import * as FP from './pages/GEOS-FP';
import * as S2Sv2 from './pages/S2Sv2';
// import * as Missions from './pages/Missions';



function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

            <Route path="/cf" element={<CF.Landing />} />
              <Route path = "/cf/cf-datagrams" element={<CF.Datagrams />} />
              <Route path = "/cf/total-column-maps" element={<CF.ColumnMaps />} />
              <Route path = "/cf/surface-maps" element={<CF.SurfaceMaps />} />
            <Route path="/aerosol-gas" element={<CF.Landing />} />
              <Route path="/aerosol-gas/cf-datagrams" element={<CF.Datagrams />} />
              <Route path="/aerosol-gas/cf-total-column-maps" element={<CF.ColumnMaps />} />
              <Route path="/aerosol-gas/cf-surface-maps" element={<CF.SurfaceMaps />} />

            <Route path="/carbon" element={<Carbon.Landing />} />
              <Route path = "/carbon/carbon-datagrams" element={<Carbon.Datagrams />} />
              <Route path = "/carbon/total-column-maps" element={<Carbon.ColumnMaps />} />
              <Route path = "/carbon/surface-maps" element={<Carbon.SurfaceMaps />} />
              <Route path = "/reanalysis/carbon-datagrams" element={<Carbon.Datagrams />} />
              <Route path = "/reanalysis/carbon-total-column-maps" element={<Carbon.ColumnMaps />} />
              <Route path = "/reanalysis/carbon-surface-maps" element={<Carbon.SurfaceMaps />} />

            <Route path="/merra2" element={<MERRA2.Landing />} />
              <Route path = "/merra2/weather-maps" element={<MERRA2.WeatherMaps />} />
              <Route path = "/merra2/chem-maps" element={<MERRA2.ChemMaps />} />
              <Route path = "/merra2/anomalies-maps" element={<MERRA2.Anomalies />} />
              <Route path = "/merra2/climate-statistics-maps" element={<MERRA2.ClimateStats />} />
              <Route path = "/reanalysis/merra2-weather-maps" element={<MERRA2.WeatherMaps />} />
              <Route path = "/reanalysis/merra2-chem-maps" element={<MERRA2.ChemMaps />} />
              <Route path = "/reanalysis/merra2-anomalies-maps" element={<MERRA2.Anomalies />} />
              <Route path = "/reanalysis/merra2-climate-statistics-maps" element={<MERRA2.ClimateStats />} />

            <Route path="/seasonal-prediction" element={<S2Sv2.Landing />} /> 
            <Route path="/s2sv2" element={<S2Sv2.Landing />} /> 
              <Route path = "/s2sv2/maps" element={<S2Sv2.ClimateMaps />} />

            <Route path="/geos-fp" element={<FP.Landing />} />
              <Route path = "/geos-fp/weather-maps" element={<FP.WeatherMaps />} />
              <Route path = "/geos-fp/chem-maps-2d" element={<FP.ChemMaps2D />} />
              <Route path = "/geos-fp/chem-maps-3d" element={<FP.ChemMaps3D />} />
              <Route path = "/geos-fp/fp-datagrams" element={<FP.Datagrams />} />
              <Route path="/aerosol-gas/fp-datagrams" element={<FP.Datagrams />} />
              <Route path="/aerosol-gas/fp-chem-maps-2d" element={<FP.ChemMaps2D />} />
              <Route path="/aerosol-gas/fp-chem-maps-3d" element={<FP.ChemMaps3D />} />

            <Route path="/mission-support" element={<MissionSupport />} />
              <Route path="/mission-support/ARCSIX" element={<ARCSIX />} />
              <Route path="/mission-support/BLUEFLUX" element={<BLUEFLUX />} />
              <Route path="/mission-support/PACE-PAX" element={<PACEPAX />} />
              <Route path="/mission-support/SARP" element={<SARP />} />
              <Route path="/mission-support/SARP-EAST" element={<SARPEAST />} />
              <Route path="/mission-support/SARP-WEST" element={<SARPWEST />} />
              <Route path="/mission-support/SCOAPE-II" element={<SCOAPEII />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
