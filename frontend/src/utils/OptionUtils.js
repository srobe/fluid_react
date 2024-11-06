// src/utils/optionUtils.js

/**
 * Utility function to process dropdown options.
 * Ensures that each option has a `label` and a `var` property.
 *
 * @param {Array} options - The array of options, which can be strings or objects.
 * @returns {Array} Processed options with `label` and `var` properties.
 */
export const processOptions = (options) => {
    return options.map((option) =>
      typeof option === "string"
        ? { label: option, var: option }
        : { label: option.label, var: option.var }
    );
  };
  