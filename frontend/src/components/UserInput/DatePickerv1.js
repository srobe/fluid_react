import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { addYears, format, subHours } from "date-fns";
import styled from 'styled-components';
import { useOutsideClick } from "../../hooks";
import { parseUTCDate, toCurrentOffset, toDateOffset } from "../../utils";

const StyledDatePicker = styled(DatePicker)`
width: 100%; // Make the datepicker take up 100% of its container
`;

const CustomDatePicker = ({ 
  label, 
  selectedDate, 
  onChange, 
  dateDisplayFormat, 
  minDate, 
  maxDate, 
  dateFormat 
}) => {
  const [isOpen, setIsOpen] = useState(false); // Control whether the date picker is open
  const calRef = useRef(null); // Reference for the calendar container
  const buttonRef = useRef(null); // Reference for the button to get its width

  // Use outside click hook to close the date picker when clicking outside
  useOutsideClick({
    isOpen,
    componentRef: calRef,
    setIsOpen,
  });

  // Parse and set minDate and maxDate as UTC dates
  const parsedMinDate = minDate ? parseUTCDate(minDate, dateFormat) : new Date(Date.UTC(1980, 0, 1));
  const parsedMaxDate = maxDate ? parseUTCDate(maxDate, dateFormat) : addYears(new Date(Date.UTC(2024, 0, 1)), 1);
  // Function to apply custom class to today
  const dayClassName = (date) => {
    const today = toCurrentOffset(new Date());
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return "highlight-today"; // Custom class for today's date
    }
    return "";
  };
  return (
    <div className="mb-6" ref={calRef}>
      <p className="text-base font-bold mb-2">{label}</p>
      <div className="datepicker-container relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full px-2 py-1 border border-gray-300 rounded-sm bg-white text-left flex items-center justify-between"
        >
          <span>{selectedDate ? format(toCurrentOffset(selectedDate),dateDisplayFormat) : "Select date..."}</span>
          <FaCalendarAlt className="datepicker-icon ml-2 text-gray-500" />
        </button>
        {isOpen && (
          <div
            style={{ width: buttonRef.current ? `${buttonRef.current.offsetWidth}px` : '100%' }}
            className="absolute top-full mt-1 z-10"
          >
            <StyledDatePicker
              selected={toCurrentOffset(selectedDate)} // Adjust for the current timezone
              onChange={(value) => {
                onChange(toDateOffset(value));
                setIsOpen(false); // Close after selecting a date
              }}
              dateFormat={dateDisplayFormat} // Ensure date appears in standard format
              className="datepicker-input border border-gray-300 rounded-sm bg-white w-full"
              minDate={toCurrentOffset(parsedMinDate)}
              maxDate={toCurrentOffset(parsedMaxDate)}
              dayClassName={dayClassName}
              inline // Ensures that the picker is displayed inline in the container
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDatePicker;
