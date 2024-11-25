import React, { useState, useEffect, useRef } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useKeyboardNavigation, useOutsideClick } from "../../hooks"
import { processOptions } from "../../utils";

const Dropdown = ({
  options = [],
  selectedOption = "",
  onSelect = () => {},
}) => {

// Use the utility function to process options
  const processedOptions = processOptions(options);

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const optionsRef = useRef([]);

  // Use the keyboard navigation from utility function
  useKeyboardNavigation({
    isOpen,
    options,
    highlightedIndex,
    setHighlightedIndex,
    onSelect,
    processedOptions,
    setIsOpen,
    optionsRef,
  });

  useOutsideClick({
    isOpen,
    componentRef: dropdownRef,
    setHighlightedIndex,
    setIsOpen,
  });

  return (
    <div ref={dropdownRef}>
      <div className="relative">
        <button
          ref={buttonRef}
          tabIndex={0}
          onClick={() => {
            setIsOpen((prev) => !prev);
            setHighlightedIndex(-1);
          }}
          className="w-full px-2 py-1 border border-gray-300 rounded-sm bg-white text-left flex items-center justify-between"
        >
          <span>
            {selectedOption
              ? typeof selectedOption === "string"
                ? selectedOption
                : selectedOption.label
              : "Select..."}
          </span>
          <span className="text-gray-500 ml-2">
            <FaCaretDown />
          </span>
        </button>
        {isOpen && (
          <div className="absolute w-full bg-white border border-gray-300 rounded-sm mt-1 z-10">
            <ul className="max-h-48 overflow-y-auto">
              {processedOptions.map((option, index) => (
                <li
                  ref={(el) => (optionsRef.current[index] = el)}
                  key={index}
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                    setHighlightedIndex(-1);
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

export default Dropdown;
