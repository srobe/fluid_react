// src/components/DatePicker.js
import React from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { addYears } from "date-fns";
import { setUTCDate, parseUTCDate, formatUTC } from "../utils/dateUtils";

const CustomDatePicker = ({ label, selectedDate, onChange, dateDisplayFormat, minDate, maxDate, dateFormat }) => {

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

/**
 * https://day.js.org/docs/en/manipulate/utc-offset
 * @param {Date} date
 */
export function toCurrentOffset(date) {
    // Used because react seems to only show local time in the
    // datepicker & code should show UTC time
    // Uses offset to make local time UTC time
    var dayjs = require('dayjs')
    // initialize
    let result = dayjs(date)
    // remove date offset
    result = result.subtract(result.utcOffset(), 'minutes')

    return result.toDate()
}

/**
 * https://day.js.org/docs/en/manipulate/utc-offset
 * @param {Date} date
 */
export function toDateOffset(date) {
    // Converts the local time back to its actual local time
    var dayjs = require('dayjs')
    // initialize
    let result = dayjs(date)
  // add current offset of today
    result = result.add(result.utcOffset(), 'minutes')

    return result.toDate()
}

export default CustomDatePicker;
