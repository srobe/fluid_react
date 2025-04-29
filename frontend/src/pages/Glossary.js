import React, { useState, useEffect } from 'react';
import { FaSearch, FaChevronRight, FaChevronDown } from 'react-icons/fa';

const defaultSubsections = [
  { 
    id: 'meteograms', 
    title: 'Meteograms',
    description: 'Brief description of this visualization and how it works.',
    terms: [
      { term: 'Meteograms', definition: 'Brief definition of this term' },
      { term: 'Aerosols', definition: 'Brief definition of this term' },
      { term: 'Carbon Species', definition: 'Brief definition of this term' }
    ]
  },
  { 
    id: 'weather-maps', 
    title: 'Weather Maps',
    description: 'Brief description of this visualization and how it works.',
    terms: [
      { term: 'Term 1', definition: 'Brief definition of this term' },
      { term: 'Term 2', definition: 'Brief definition of this term' },
      { term: 'Term 3', definition: 'Brief definition of this term' }
    ]
  },
  { 
    id: 'atmospheric-2d', 
    title: 'Atmospheric Composition 2D',
    description: 'Brief description of this visualization and how it works.',
    terms: [
      { term: 'Term 1', definition: 'Brief definition of this term' },
      { term: 'Term 2', definition: 'Brief definition of this term' },
      { term: 'Term 3', definition: 'Brief definition of this term' }
    ]
  },
  { 
    id: 'atmospheric-3d', 
    title: 'Atmospheric Composition 3D',
    description: 'Brief description of this visualization and how it works.',
    terms: [
      { term: 'Term 1', definition: 'Brief definition of this term' },
      { term: 'Term 2', definition: 'Brief definition of this term' },
      { term: 'Term 3', definition: 'Brief definition of this term' }
    ]
  },
  { 
    id: 'observing-system', 
    title: 'Observing System Statistics',
    description: 'Brief description of this visualization and how it works.',
    terms: [
      { term: 'Term 1', definition: 'Brief definition of this term' },
      { term: 'Term 2', definition: 'Brief definition of this term' },
      { term: 'Term 3', definition: 'Brief definition of this term' }
    ]
  }
];

const glossaryData = {
  sections: [
    {
      id: 'geos-fp',
      title: 'GEOS-FP: Weather Analyses and Forecasts',
      description: 'The Goddard Earth Observing System (GEOS) model is designed to study various Earth Science questions by connecting different model components flexibly.',
      subsections: defaultSubsections
    },
    {
      id: 'composition-forecast',
      title: 'Composition Forecast Products',
      description: 'Products related to the forecasting of atmospheric composition.',
      subsections: defaultSubsections
    },
    {
      id: 'gmao-reanalysis',
      title: 'GMAO Reanalysis Products',
      description: 'Products from the Global Modeling and Assimilation Office reanalysis system.',
      subsections: defaultSubsections
    },
    {
      id: 'gmao-carbon',
      title: 'GMAO Carbon Reanalysis',
      description: 'Carbon-specific products from the GMAO reanalysis system.',
      subsections: defaultSubsections
    }
  ],
};

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSections, setFilteredSections] = useState(glossaryData.sections);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredSections(glossaryData.sections);
      return;
    }

    const filtered = glossaryData.sections.map(section => ({
      ...section,
      subsections: section.subsections.map(subsection => ({
        ...subsection,
        terms: subsection.terms.filter(term =>
          term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(subsection => subsection.terms.length > 0)
    })).filter(section => section.subsections.length > 0);

    setFilteredSections(filtered);
  }, [searchTerm]);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex mx-[100px] py-6">
      {/* Left Column - Table of Contents */}
      <div className="w-1/4 min-h-screen">
        <div className="p-6 sticky top-4">
          <p className="text-xl font-bold mb-4">FLUID Glossary</p>
          <ul className="space-y-4">
            {glossaryData.sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center text-left w-full hover:text-blue-600 text-base font-bold group"
                >
                  <div className="transform transition-transform duration-200 mr-2">
                    {expandedSections[section.id] ? (
                      <FaChevronDown className="text-gray-600 group-hover:text-blue-600" />
                    ) : (
                      <FaChevronRight className="text-gray-600 group-hover:text-blue-600" />
                    )}
                  </div>
                  {section.title}
                </button>
                <div className={`transition-all duration-200 ${expandedSections[section.id] ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                  <ul className="mt-2 ml-6 space-y-3">
                    {section.subsections.map((subsection) => (
                      <li key={subsection.id}>
                        <button
                          onClick={() => scrollToSection(`${section.id}-${subsection.id}`)}
                          className="text-left w-full hover:text-blue-600 text-base"
                        >
                          {subsection.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column - Main Content */}
      <div className="w-3/4 min-h-screen">
        <div className="py-8">
          {/* Header with Search */}
          <div className="bg-black text-white p-6 mb-8 rounded-lg">
            <h1 className="text-2xl font-medium mb-2">FLUID Glossary</h1>
            <p className="text-body mb-6">All your terms defined here.</p>
            
            {/* Search Box */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-2 py-2 pl-10 border border-gray-600 bg-white text-black focus:outline-none focus:border-blue-500"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Main Content */}
          {filteredSections.map((section) => (
            <div key={section.id} id={section.id} className="mb-12">
              <div className="bg-white">
                <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
                <p className="text-gray-600 mb-6">{section.description}</p>
                {section.subsections.map((subsection) => (
                  <div key={`${section.id}-${subsection.id}`} id={`${section.id}-${subsection.id}`} className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">{subsection.title}</h3>
                    <p className="text-gray-600 mb-4">{subsection.description}</p>
                    <div className="bg-gray-50 p-6">
                      {subsection.terms && subsection.terms.map((term, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                          <dt className="text-base font-semibold mb-1">{term.term}:</dt>
                          <dd className="text-gray-600 ml-4">{term.definition}</dd>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Glossary; 