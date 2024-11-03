// src/components/UserInput/ButtonGroup.js

import React from "react";

const ButtonGroup = ({ 
  options = [], 
  selectedOption, 
  onSelect = () => {}, 
  label = "", 
  disabledOptions = [] // Array of options to disable
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
        {processedOptions.map((option, index)  => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className={`button-item ${selectedOption && selectedOption.var === option.var ? "selected" : ""}`}
            disabled={disabledOptions.includes(option.var)} // Disable if option is in disabledOptions
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;


