// src/components/ButtonGroup.js

import React from "react";

const ButtonGroup = ({ 
  options = [], // Generic list of options
  selectedOption, // Currently selected option as an object { label, var }
  onSelect = () => {}, // Function to call when an option is selected
  label = "" // Optional label for the button group
}) => {
  // Convert options to a uniform format: array of objects with `label` and `var`
  const processedOptions = options.map((option) =>
    typeof option === "string"
      ? { label: option, var: option } // Treat each string as both `label` and `var`
      : { label: option.label, var: option.var } // Use `label` and `var` if object format
  );

  return (
    <div className="button-group">
      {label && <p className="text-base font-bold mb-2">{label}</p>}
      <div className="flex flex-wrap">
        {processedOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className={`button-item ${selectedOption && selectedOption.var === option.var ? "selected" : ""} p-2 m-1 border border-gray-300 rounded`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;


