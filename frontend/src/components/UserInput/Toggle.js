import React, { useState, useEffect } from "react";

const Toggle = ({ 
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

    // Initialize toggle state based on whether `selectedOption` is empty or not
    const [isOn, setIsOn] = useState(!!selectedOption.label);

    const handleToggle = () => {
        // Toggle the checked state
        const newToggleState = !isOn;
        setIsOn(newToggleState);
    
        // Update the selectedOption dictionary based on the toggle state
        const updatedOption = {
            ...selectedOption,
            var: selectedOption.var === "" ? options[0] : "",
            label: newToggleState
        };
    
        // Call onSelect with the updated option
        onSelect(updatedOption);
    };

    return (
        <div className="mb-4">
            {label && <p className="text-base font-bold mb-2">{label}</p>}  
            <div className="flex items-center gap-2">
                <div
                    role="switch"
                    aria-checked={isOn}
                    onClick={handleToggle}
                    className={`
                        relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out
                        ${isOn ? 'bg-blue-600' : 'bg-gray-300'}
                    `}
                >
                    <div 
                        className={`
                            absolute top-1 left-1 bg-white h-4 w-4 rounded-full shadow-md 
                            transform transition-transform duration-200 ease-in-out
                            ${isOn ? 'translate-x-6' : 'translate-x-0'}
                        `}
                    />
                </div>
                <span className="text-sm text-gray-600">
                    {isOn ? "On" : "Off"}
                </span>
            </div>
        </div>
    );
};

export default Toggle;
