import { format, subWeeks } from "date-fns";
import { parse } from "date-fns";

// Function to dynamically resolve placeholders in the data object
function resolvePlaceholders(data) {
  const today = new Date();
  
  // Use the backend format if available; otherwise, default to "yyyyMMdd"
  const dateFormat = data.initialTimes?.format?.backend || "yyyyMMdd";
  
  // Define some dynamic placeholder values
  const placeholders = {
    $today: format(today, dateFormat),
    $todayMinus2Weeks: format(subWeeks(today, 2), dateFormat),
  };

  // Helper function to get a nested property by path
  const getNestedProperty = (obj, path) =>
    path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);

  // Recursive function to replace placeholders in the data object
  const replacePlaceholders = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        replacePlaceholders(obj[key]);
      } else if (typeof obj[key] === "string") {
        obj[key] = obj[key].replace(/\$(\w+(\.\w+)*|\w+)/g, (match) => {
          const placeholder = match;
          // First, try to match placeholder from our predefined values (e.g., $today)
          if (placeholders[placeholder] !== undefined) return placeholders[placeholder];
          // If not found, try to resolve the path in `data` (e.g., $urlInfo.stream)
          const path = placeholder.slice(1); // Remove leading `$`
          const nestedValue = getNestedProperty(data, path);
          return nestedValue !== undefined ? nestedValue : match; // Replace or keep the original if not found
        });
      }
    }
  };

  replacePlaceholders(data);
  return data;
}

export default resolvePlaceholders;
