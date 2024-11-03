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
          <label key={index} className="radio-item p-2 m-1 flex items-center">
            <input
              type="radio"
              name={label} // Use the group label as the radio group name
              value={option.var}
              checked={selectedOption && selectedOption.var === option.var}
              onChange={() => onSelect(option)}
              className="mr-2"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
