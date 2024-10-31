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

export const updateLeadHours = (datetime, flaskData, setflaskData, selectedValues, setSelectedValues) => {
  const hours = [0, 3, 6, 9, 12];
  const currentLeadHourIndex = flaskData.leadHours.all.indexOf(selectedValues.leadHours.label);
  const paddingLength = flaskData.leadHours.format.var
  ? parseInt(flaskData.leadHours.format.var.match(/\d+/)[0], 10) // Extract number from "<03d>" or "<02d>"
  : 2; // Default padding length

  const newLeadHours = hours.map((hour) => {   
    return leadHoursFormatter(hour, datetime, flaskData.leadHours.format, paddingLength);
  });

  const newSelectedLeadHour = newLeadHours[currentLeadHourIndex] || newLeadHours[0];
  const newSelectedVar = hours[currentLeadHourIndex] || hours[0];
  setflaskData((prevData) => ({
    ...prevData,
    leadHours: { ...prevData.leadHours, all: newLeadHours },
  }));

  setSelectedValues((prev) => ({
    ...prev,
    leadHours: {
      var: String(newSelectedVar).padStart(paddingLength, '0'), // Only the padded numeric value
      label: newSelectedLeadHour, // Full formatted string
    },
  }));
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
