import React, { useState, useEffect, useRef } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useKeyboardNavigation, useOutsideClick } from "../../hooks"
import { processOptions } from "../../utils";

const Dropdown = ({
  label = "",
  options = [],
  selectedOption = "",
  onSelect = () => {},
  className = "", // Add className prop
  isCalendarDropdown = false // Add flag for calendar-specific styling
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

  // Calendar-specific styles
  const calendarStyles = isCalendarDropdown ? {
    container: "mb-0",
    button: "px-1 py-0.5 border-transparent text-sm",
    optionsContainer: "absolute w-full bg-white border border-gray-300 rounded-sm mt-1 shadow-sm",
    optionsList: "max-h-32 overflow-y-auto",
    option: "py-1 px-2 text-sm"
  } : {
    button: "px-2 py-1 border border-gray-300",
    optionsContainer: "absolute w-full bg-white border border-gray-300 rounded-sm mt-1",
    optionsList: "max-h-48 overflow-y-auto",
    option: "p-2"
  };

  return (
    <div className={`${calendarStyles.container} ${className}`} ref={dropdownRef}>
      {label && <p className="text-base font-bold mb-2">{label}</p>}
      <div className="relative">
        <button
          ref={buttonRef}
          tabIndex={0}
          onClick={() => {
            setIsOpen((prev) => !prev);
            setHighlightedIndex(-1);
          }}
          className={`${calendarStyles.button} rounded-sm bg-white text-left flex items-center justify-between hover:border-gray-300 w-full`}
        >
          <span>
            {selectedOption
              ? typeof selectedOption === "string"
                ? selectedOption
                : selectedOption.label
              : "Select..."}
          </span>
          <span className="text-gray-500 ml-1">
            <FaCaretDown className="h-3 w-3" />
          </span>
        </button>
        {isOpen && (
          <div className={calendarStyles.optionsContainer} style={{ zIndex: isCalendarDropdown ? 60 : 10 }}>
            <ul className={calendarStyles.optionsList}>
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
                  className={`${calendarStyles.option} cursor-pointer ${
                    highlightedIndex === index ? "bg-gray-100" : "hover:bg-gray-100"
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