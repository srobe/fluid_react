// src/components/UserInput/RadioButtonGroup.js

import React from "react";

const RadioButtonGroup = ({
  options = [], // List of options
  selectedOption, // Currently selected option as an object { label, var }
  onSelect = () => {}, // Function to call when an option is selected
  label = "" // Optional label for the radio button group
}) => {
  // Convert options to a uniform format: array of objects with `label` and `var`
  const processedOptions = options.map((option) =>
    typeof option === "string"
      ? { label: option, var: option } // Treat each string as both `label` and `var`
      : { label: option.label, var: option.var } // Use `label` and `var` if object format
  );

  return (
    <div className="radio-button-group">
      {label && <p className="text-base font-bold mb-2">{label}</p>}
      <div className="flex flex-wrap">
        {processedOptions.map((option, index) => (
          <div className="radio-item" key={index}>
            <input
              type="radio"
              id={`radio-${option.var}`}
              name={label} // Use the group label as the radio group name
              value={option.var}
              checked={selectedOption && selectedOption.var === option.var}
              onChange={() => onSelect(option)}
              className="hidden" // Hide the default radio button
            />
            <label htmlFor={`radio-${option.var}`} className="flex items-center cursor-pointer">
              <span className="custom-radio"></span>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
