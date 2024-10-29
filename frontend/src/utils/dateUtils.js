// src/utils/dateUtils.js
import { addHours, format, parse } from "date-fns";

export const setHourOnDate = (date, hour) => {
  const newDate = new Date(date);
  newDate.setHours(parseInt(hour.substring(0, 2), 10), 0, 0, 0);
  return newDate;
};

export const updateLeadHours = (datetime, dropdownData, setDropdownData, selectedValues, setSelectedValues) => {
  const hours = [0, 3, 6, 9, 12];
  const currentLeadHourIndex = dropdownData.leadHours.all.indexOf(selectedValues.leadHours);

  const newLeadHours = hours.map((hour) => {
    const date = addHours(datetime, hour);
    return `${String(hour).padStart(3, "0")}h ${format(date, "ddMMMyyyy HH'z'")}`;
  });

  const newSelectedLeadHour = newLeadHours[currentLeadHourIndex] || newLeadHours[0];

  setDropdownData((prevData) => ({
    ...prevData,
    leadHours: { ...prevData.leadHours, all: newLeadHours },
  }));

  setSelectedValues((prev) => ({
    ...prev,
    leadHours: newSelectedLeadHour,
  }));
};
