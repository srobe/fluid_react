// src/utils/dateUtils.js
import { addHours, parse } from "date-fns";
import { toZonedTime,formatInTimeZone } from "date-fns-tz";
import {leadHoursFormatter} from "./formatStrings"

export const setHourOnDate = (date, hour) => {
  const utcDate = setUTCDate(date);

  // Set the specified hour as UTC, preserving the rest of the date in UTC
  utcDate.setUTCHours(hour, 0, 0, 0);

  return utcDate;
};

export const setUTCDate = (date) => {
  // Ensure the date is treated as UTC by creating a new Date in UTC
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
};

// Corrected getLeadHours function
export const getLeadHours = (datetime, flaskData) => {
  const hours = flaskData.leadHours.options || [0, 3, 6, 9, 12];
  const paddingLength = flaskData.leadHours.format.var
    ? parseInt(flaskData.leadHours.format.var.match(/\d+/)[0], 10)
    : 2;

  // Generate new lead hours as array of objects with `label` and `var`
  const newLeadHours = hours.map((hour) => {
    const label = leadHoursFormatter(
      hour,
      datetime,
      flaskData.leadHours.format,
      paddingLength
    );
    return {
      label: label,
      var: String(hour).padStart(paddingLength, '0'),
    };
  });
  // Return the array directly
  return newLeadHours;
};

// updateLeadHours function remains the same
export const updateLeadHours = (
  datetime,
  flaskData,
  setFlaskData,
  prevSelectedValues,
  newSelectedValues
) => {
  const newLeadHours = getLeadHours(datetime, flaskData);

  // Update flaskData with new lead hours
  setFlaskData((prevData) => ({
    ...prevData,
    leadHours: { ...prevData.leadHours, all: newLeadHours },
  }));

  // Find the index of the previously selected lead hour based on `var`
  const previousLeadHourVar = prevSelectedValues.leadHours?.var;
  let currentLeadHourIndex = newLeadHours.findIndex(
    (leadHour) => leadHour.var === previousLeadHourVar
  );

  // If the previous selection isn't found, default to the first lead hour
  if (currentLeadHourIndex === -1) {
    currentLeadHourIndex = 0;
  }

  // Get the new selected lead hour
  const newSelectedLeadHour = newLeadHours[currentLeadHourIndex];

  // Update selectedValues with the new lead hour
  return {
    ...newSelectedValues,
    leadHours: newSelectedLeadHour,
  };
};

export const isPastEnd = (selectedDatetime, hour, data) => {
  const endDateTime = parseUTCDate(data.initialTimes.end, data.initialTimes.format.backend);
  const buttonTime = setHourOnDate(selectedDatetime,hour)
  return endDateTime.getTime() < buttonTime.getTime();
};


/**
 * Parses a date string in a specified timezone based on a provided date format.
 * @param {string} datetimeStr - The date string to parse.
 * @param {string} datetimeFmt - The format of the date string.
 * @param {string} [timeZone="UTC"] - The timezone to interpret the date in.
 * @returns {Date} - The parsed Date object interpreted in the specified timezone.
 */
export function parseTZDate(datetimeStr, datetimeFmt, timeZone = "UTC") {
  const parsedDate = parse(datetimeStr, datetimeFmt, new Date());
  const tzDate = toZonedTime(parsedDate, timeZone);
  return tzDate;
}

/**
 * Parses a date string as UTC using the provided format.
 * @param {string} dateStr - The date string to parse.
 * @param {string} dateFormat - The format of the date string.
 * @returns {Date} - The parsed Date object in UTC.
 */
export function parseUTCDate(dateStr, dateFormat) {
  if (!dateStr) return new Date(); // Default to current date if dateStr is missing

  const parsedDate = parse(dateStr, dateFormat, new Date());

  // Ensure the parsed date is treated as UTC
  return new Date(
    Date.UTC(
      parsedDate.getFullYear(),
      parsedDate.getMonth(),
      parsedDate.getDate(),
      parsedDate.getHours(),
      parsedDate.getMinutes(),
      parsedDate.getSeconds()
    )
  );
}

/**
 * Formats a given date in UTC based on a provided format.
 * @param {Date} date - The date to format.
 * @param {string} dateFormat - The format string.
 * @returns {string} - The formatted date string in UTC.
 */
export function formatUTC(date, dateFormat) {
  return formatInTimeZone(date, 'UTC', dateFormat);
}

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