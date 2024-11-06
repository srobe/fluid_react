import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { addYears } from "date-fns";
import { useOutsideClick } from "../../hooks";
import { parseUTCDate, toCurrentOffset, toDateOffset } from "../../utils";

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

  // Use outside click hook to close the date picker when clicking outside
  useOutsideClick({
    isOpen,
    componentRef: calRef,
    setIsOpen,
  });

  // Parse and set minDate and maxDate as UTC dates
  const parsedMinDate = minDate ? parseUTCDate(minDate, dateFormat) : new Date(Date.UTC(1980, 0, 1));
  const parsedMaxDate = maxDate ? parseUTCDate(maxDate, dateFormat) : addYears(new Date(Date.UTC(2024, 0, 1)), 1);

  return (
    <div className="mb-6" ref={calRef}>
      <p className="text-base font-bold mb-2">{label}</p>
      <div className="datepicker-container relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full px-2 py-1 border border-gray-300 rounded-sm bg-white text-left flex items-center justify-between"
        >
          <span>{selectedDate ? toCurrentOffset(selectedDate).toLocaleDateString() : "Select date..."}</span>
          <FaCalendarAlt className="datepicker-icon ml-2 text-gray-500" />
        </button>
        {isOpen && (
          <DatePicker
            selected={toCurrentOffset(selectedDate)} // Adjust for the current timezone
            onChange={(value) => {
              onChange(toDateOffset(value));
              setIsOpen(false); // Close after selecting a date
            }}
            dateFormat={dateDisplayFormat} // Ensure date appears in standard format
            className="datepicker-input absolute top-full mt-1 border border-gray-300 rounded-sm bg-white z-10"
            minDate={toCurrentOffset(parsedMinDate)}
            maxDate={toCurrentOffset(parsedMaxDate)}
            inline // Ensures that the picker is displayed inline in the container
          />
        )}
      </div>
    </div>
  );
};

export default CustomDatePicker;

