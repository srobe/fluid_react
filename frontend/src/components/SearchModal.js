// src/components/SearchModal.js
import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';

const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    '"Merra-2"',
  ]);
  const [categories] = useState([
    'Aerosols',
    'Forecasts',
    'Reanalysis',
    'Air Quality',
    'Composition'
  ]);
  
  const searchInputRef = useRef(null);
  const modalRef = useRef(null);
  
  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);
  
  const openSearchModal = () => {
    setIsOpen(true);
  };
  
  const closeSearchModal = () => {
    setIsOpen(false);
    setSearchQuery('');
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: call search API
      console.log('Searching for:', searchQuery);
      
      // Add to recent searches if not already there
      if (!recentSearches.includes(`"${searchQuery}"`)) {
        setRecentSearches(prev => [`"${searchQuery}"`, ...prev].slice(0, 5));
      }
      
      // For demo purposes only
      // closeSearchModal();
    }
  };
  
  const searchByCategoryOrRecent = (term) => {
    setSearchQuery(term.replace(/"/g, ''));
    // Here you would call your search API with the term
    console.log('Searching for:', term);
  };
  
  return (
    <>
      {/* Search Button */}
      <button
        onClick={openSearchModal}
        className="text-white bg-white hover:text-gray-200 p-2 rounded-full w-8 h-8 flex items-center justify-center"
        aria-label="Open search"
      >
        <FaSearch className="text-black" size={18} />
      </button>
      
      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black w-full h-fit">
          <div ref={modalRef} className="w-full h-full">
            {/* Search Header */}
            <div className="flex items-center p-4 border-b border-white">
              <button
                onClick={closeSearchModal}
                className="text-white mr-4"
                aria-label="Go back"
              >
                <FaArrowLeft size={20} />
              </button>
              
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative w-full">
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or category"
                    className="w-full bg-white rounded-full py-1 px-4 pl-10 text-black focus:outline-none"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <FaSearch size={16} />
                  </div>
                </div>
              </form>
            </div>
            
            {/* Search Content */}
            <div className="p-6 overflow-y-auto h-fit bg-black border-b">
              {/* Recent Searches */}
              <div className="mb-10">
                <h2 className="text-gray-400 text-sm uppercase tracking-wide mb-4">Recently Searched</h2>
                <ul className="space-y-4">
                  {recentSearches.map((term, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => searchByCategoryOrRecent(term)}
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        {term}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Categories */}
              <div>
                <h2 className="text-gray-400 text-sm uppercase tracking-wide mb-4">By Category</h2>
                <ul className="space-y-4">
                  {categories.map((category, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => searchByCategoryOrRecent(category)}
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;