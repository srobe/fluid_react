// src/components/UserInput/Checkbox.js

import React, { useState, useEffect } from "react";

const TrackCheckbox = ({ 
  label = "Enable Tracks",
  options = [],
  selectedOption = {"var":"","label":false},
  onSelect = () => {}
}) => {
  // Ensure selectedOption is a dictionary
  if (typeof selectedOption === "boolean") {
    selectedOption = {
      var: "",
      label: selectedOption
    };
  } else if (typeof selectedOption !== "object" || selectedOption === null) {
    selectedOption = {
      var: selectedOption,
      label: false
    };
  }
  // Initialize checkbox state based on whether `selectedOption` is empty or not
  const [isChecked, setIsChecked] = useState(!!selectedOption.label);

  const handleCheckboxChange = () => {
    // Toggle the checked state
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
  
    // Update the selectedOption dictionary based on the checkbox state
    const updatedOption = {
      ...selectedOption,
      var: selectedOption.var === "" ? options[0] : "",
      label: newCheckedState
    };
  
    // Call onSelect with the updated option
    onSelect(updatedOption);
  };

  return (
    <div className="track-checkbox">
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        {label}
      </label>
    </div>
  );
};

export default TrackCheckbox;
