// src/components/UserInput/DatePicker.js

import React from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { addYears } from "date-fns";
import { parseUTCDate, toCurrentOffset, toDateOffset } from "../../utils/dateUtils";

const CustomDatePicker = ({ 
  label, 
  selectedDate, 
  onChange, 
  dateDisplayFormat, 
  minDate, 
  maxDate, 
  dateFormat }) => {

  // Parse and set minDate and maxDate as UTC dates
  const parsedMinDate = minDate ? parseUTCDate(minDate, dateFormat) : new Date(Date.UTC(1980, 0, 1));
  const parsedMaxDate = maxDate ? parseUTCDate(maxDate, dateFormat) : addYears(new Date(Date.UTC(2024, 0, 1)), 1);
  return (
    <div className="mb-6">
      <p className="text-base font-bold mb-2">{label}</p>
      <div className="datepicker-container">
        <DatePicker
          selected={toCurrentOffset(selectedDate)} // React, get your act together
          onChange={value => onChange(toDateOffset(value))}
          dateFormat={dateDisplayFormat}// Ensure date appears in standard UTC format for clarity
          className="datepicker-input"
          minDate={toCurrentOffset(parsedMinDate)}
          maxDate={toCurrentOffset(parsedMaxDate)}
        />
        <FaCalendarAlt className="datepicker-icon" />
      </div>
    </div>
  );
};

export default CustomDatePicker;
