// src/utils/mappedValues.js
export const getMappedValues = (selectedValues) => {
    return Object.fromEntries(
      Object.entries(selectedValues).map(([key, value]) =>
        typeof value === "object" && value !== null && "var" in value
          ? [key, value.var] // Use value.var if it's an object with a `var` property
          : [key, value] // Otherwise, use the value directly
      )
    );
  };