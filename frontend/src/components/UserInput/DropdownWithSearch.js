// src/components/UserInput/DropdownWithSearch.js
import React, { useState, useEffect, useRef } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import { useKeyboardNavigation, useOutsideClick } from "../../hooks";
import { processOptions } from "../../utils";

const DropdownWithSearch = ({
  label = "",
  options = [],
  selectedOption = "",
  onSelect = () => {},
}) => {
  const processedOptions = processOptions(options);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const optionsRef = useRef([]);

  // Toggle dropdown open/close and reset search term
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setSearchTerm(""); // Reset to blank when opening
      setHighlightedIndex(-1); // Reset highlighted index
    }
  };

  // Filter options based on search term
  const filteredOptions = processedOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Use the keyboard navigation hook
  useKeyboardNavigation({
    isOpen,
    options: filteredOptions, // Pass filtered options
    highlightedIndex,
    setHighlightedIndex,
    onSelect: (option) => {
      onSelect(option);
      setIsOpen(false);
      setSearchTerm(""); // Clear search when selecting an option
    },
    processedOptions: filteredOptions,
    setIsOpen,
    optionsRef,
  });

  // Use outside click hook
  useOutsideClick({
    isOpen,
    componentRef: dropdownRef,
    setHighlightedIndex,
    setIsOpen,
  });

  return (
    <div className="mb-6" ref={dropdownRef}>
      <p className="text-base font-bold mb-2">{label}</p>
      <div className="relative">
        <button
          ref={buttonRef}
          tabIndex={0}
          onClick={handleOpen}
          className="w-full px-2 py-1 border border-gray-300 rounded-sm bg-white text-left flex items-center justify-between"
        >
          <span>
            {selectedOption
              ? typeof selectedOption === "string"
                ? selectedOption
                : selectedOption.label
              : "Select..."}
          </span>
          <FaCaretDown />
        </button>
        {isOpen && (
          <div className="absolute w-full bg-white border border-gray-300 rounded-sm mt-1 z-10">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 border-b border-gray-300 pl-10"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            {/* Options List */}
            <ul className="max-h-48 overflow-y-auto">
              {filteredOptions.map((option, index) => (
                <li
                  ref={(el) => (optionsRef.current[index] = el)}
                  key={index}
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                    setHighlightedIndex(-1);
                    setSearchTerm(""); // Reset search term after selecting
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`p-2 cursor-pointer ${
                    highlightedIndex === index ? "bg-gray-200" : "hover:bg-gray-200"
                  }`}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownWithSearch;
