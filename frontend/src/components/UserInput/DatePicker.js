import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { addYears, format } from "date-fns";
import styled from "styled-components";
import { useOutsideClick } from "../../hooks";
import { parseUTCDate, toCurrentOffset, toDateOffset } from "../../utils";
import CustomHeader from './CustomHeader'; 

// Styled component to make DatePicker occupy 100% of its container
const StyledDatePicker = styled(DatePicker)`
  width: 20px; // Make the datepicker take up 100% of its container
`;

// Another example styled date picker (or replace with another version or library)
const AnotherStyledDatePicker = styled(DatePicker)`
  width: 100%;
  border: 2px solid #4a90e2; // Different styling to show the example difference
`;

const CustomDatePicker = ({
  label,
  selectedDate,
  onChange,
  dateDisplayFormat = "MMM dd',' yyyy HH'z'",
  minDate,
  maxDate,
  dateFormat,
  pickerName = "StyledDatePicker",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const calRef = useRef(null);
  const buttonRef = useRef(null);

  // Use outside click hook to close the date picker when clicking outside
  useOutsideClick({
    isOpen,
    componentRef: calRef,
    setIsOpen,
  });

  // Parse and set minDate and maxDate as UTC dates
  const parsedMinDate = minDate
    ? parseUTCDate(minDate, dateFormat)
    : new Date(Date.UTC(1980, 0, 1));
  const parsedMaxDate = maxDate
    ? parseUTCDate(maxDate, dateFormat)
    : addYears(new Date(Date.UTC(2024, 0, 1)), 1);

  // Function to apply custom class to today
  const dayClassName = (date) => {
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return "highlight-today"; // Custom class for today's date
    }
    return "";
  };    
  // Mapping of pickerName to components
  const pickerComponents = {
    StyledDatePicker,
    AnotherStyledDatePicker,
  };

  // Determine the component to use for the date picker
  const PickerComponent = pickerComponents[pickerName] || StyledDatePicker;

  return (
    <div className="mb-6" ref={calRef}>
      <p className="text-base font-bold mb-2">{label}</p>
      <div className="datepicker-container relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full px-2 py-1 border border-gray-300 rounded-sm bg-white text-left flex items-center justify-between"
        >
          <span>
            {selectedDate
              ? format(toCurrentOffset(selectedDate), dateDisplayFormat)
              : "Select date..."}
          </span>
          <FaCalendarAlt className="datepicker-icon ml-2 text-gray-500" />
        </button>
        {isOpen && (
          <PickerComponent
            selected={toCurrentOffset(selectedDate)}
            onChange={(value) => {
              onChange(toDateOffset(value));
              setIsOpen(false); // Close after selecting a date
            }}
            dateFormat={dateDisplayFormat}
            minDate={toCurrentOffset(parsedMinDate)}
            maxDate={toCurrentOffset(parsedMaxDate)}
            renderCustomHeader={(params) => (
              <CustomHeader
                {...params}
                minDate={parsedMinDate}
                maxDate={parsedMaxDate}
              />
            )}
            inline
            dayClassName={dayClassName} // Apply custom styling to specific days
          />
        )}
      </div>
    </div>
  );
};

export default CustomDatePicker;
