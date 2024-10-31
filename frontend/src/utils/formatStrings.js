// src/utils/formatStrings.js

import { addHours } from "date-fns";
import { formatUTC } from "./dateUtils";

export const leadHoursFormatter = (
  leadHour = 0, 
  parsedDate = new Date(),  // Default to today's date
  leadFormat = {
    var: "<03d>",
    date: "ddMMMyyyy HH'z'",
    all: "{var}h {formattedDate}"
  },
  paddingLength = null
) => {
  // Ensure leadHour is treated as a number
  const leadHourNumber = typeof leadHour === "string" ? Number(leadHour) : leadHour;

  // Step 1: Extract padding length for `var` based on the format definition, if not provided
  const finalPaddingLength = paddingLength !== null 
    ? paddingLength 
    : (leadFormat.var ? parseInt(leadFormat.var.match(/\d+/)[0], 10) : 2); // Default padding length if not specified
  
  // Step 2: Adjust parsedDate by the lead hour in UTC
  const date = addHours(parsedDate, leadHourNumber);

  // Step 3: Create `var` with dynamic padding
  const formattedVar = String(leadHourNumber).padStart(finalPaddingLength, '0');
  
  // Step 4: Format `$formattedDate` as UTC
  const formattedDate = formatUTC(date, leadFormat.date);
  
  // Step 5: Replace placeholders in `all` format string
  const formattedLeadHour = leadFormat.all
    .replace("{var}", formattedVar)
    .replace("{formattedDate}", formattedDate);
  
  return formattedLeadHour;
};
