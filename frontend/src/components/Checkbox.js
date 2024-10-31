import React, { useState, useEffect } from "react";

const TrackCheckbox = ({ 
  label = "Enable Tracks",
  options = [],
  selectedOption = "",
  onSelect = () => {}
}) => {
  // Initialize checkbox state based on whether `selectedOption` is empty or not
  const [isChecked, setIsChecked] = useState(!!selectedOption);

  useEffect(() => {
    // Ensure `isChecked` state updates when `selectedOption` changes
    setIsChecked(!!selectedOption);
  }, [selectedOption]);

  const handleCheckboxChange = () => {
    // Toggle the checked state
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    // Call onSelect with the appropriate value
    onSelect(newCheckedState ? options[0] : ""); // Set to first option or empty string
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
