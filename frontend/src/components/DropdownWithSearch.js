// src/components/DropdownWithSearch.js

import React, { useState } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";

const DropdownWithSearch = ({
  label = "", // Default label
  options = [], // Default to an empty array if options are not provided
  selectedOption = "", // Default selected option as an empty string
  onSelect = () => {}, // Default to a no-op function if onSelect is not provided
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown open/close and reset search term
  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm(""); // Reset to blank when opening
    }
  };

  // Convert options to uniform format: array of objects with `label` and `value`
  const processedOptions = options.map((option) =>
    typeof option === "string"
      ? { label: option, value: option }
      : { label: option.label, value: option.value }
  );

  // Filter options based on search term
  const filteredOptions = processedOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-6">
      <p className="text-base font-bold mb-2">{label}</p>
      <div className="relative">
        <button
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
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 border-b border-gray-300 pl-10"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <ul className="max-h-48 overflow-y-auto">
              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => {
                    onSelect(option); // Pass entire option object or string to parent
                    setIsOpen(false); // Close dropdown
                  }}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
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


