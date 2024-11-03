// src/components/UserInput/DropdownWithSearch.js
import React, { useState, useEffect, useRef } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";

const DropdownWithSearch = ({
  label = "",
  options = [],
  selectedOption = "",
  onSelect = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown open/close and reset search term
  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm(""); // Reset to blank when opening
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Convert options to uniform format
  const processedOptions = options.map((option) =>
    typeof option === "string"
      ? { label: option, var: option }
      : { label: option.label, var: option.var }
  );

  // Filter options based on search term
  const filteredOptions = processedOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-6" ref={dropdownRef}>
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
                    onSelect(option);
                    setIsOpen(false);
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