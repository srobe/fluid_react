// src/components/RenderComponent.js

import React from "react";
import {
  DropdownWithSearch,
  CustomDatePicker,
  ButtonGroup,
  RadioButtonGroup,
  TrackCheckbox,
} from "."; // Adjust the import path if needed
import { updateLeadHours, setHourOnDate, isPastEnd, formatUTC } from "../utils/dateUtils";

const renderComponent = (key, config, handlers) => {
  const {
    setSelectedValues,
    updateLevels,
    selectedValues,
    selectedDatetime,
    selectedHour,
    setSelectedDatetime,
    setSelectedHour,
    setFlaskData,
    flaskData,
    customHandleSelect,
    customHandleDateChange,
    customHandleHourClick,
  } = handlers;

  // Default handleSelect function
  const defaultHandleSelect = (option) => {
    switch (key) {
      case "fields":
        setSelectedValues((prev) => ({
          ...prev,
          fields: option,
        }));
        updateLevels(option.var);
        break;
      case "levels":
        setSelectedValues((prev) => ({
          ...prev,
          levels: { ...prev.levels, selected: option },
        }));
        break;
      default:
        setSelectedValues((prev) => ({
          ...prev,
          [key]: option,
        }));
    }
  };

  // Default handleDateChange function
  const defaultHandleDateChange = (date) => {
    const datetime = setHourOnDate(date, selectedHour);
    setSelectedDatetime(datetime);

    const backendFormattedDate = formatUTC(datetime, flaskData.initialTimes.format.backend);
    const displayFormattedDate = formatUTC(datetime, flaskData.initialTimes.format.display);

    setSelectedValues((prev) => ({
      ...prev,
      initialTimes: {
        var: backendFormattedDate,
        label: displayFormattedDate,
      },
    }));

    updateLeadHours(datetime, flaskData, setFlaskData, selectedValues, setSelectedValues);
  };

  // Default handleHourClick function
  const defaultHandleHourClick = (hour) => {
    setSelectedHour(hour);
    defaultHandleDateChange(selectedDatetime);
  };

  // Use custom handlers if provided, otherwise use the defaults
  const handleSelect = customHandleSelect || defaultHandleSelect;
  const handleDateChangeHandler = customHandleDateChange || defaultHandleDateChange;
  const handleHourClickHandler = customHandleHourClick || defaultHandleHourClick;

  if ((key === "levels" || key === "streams") && config.all.length <= 1) return null;
  if (key === "tracks" && config.all.length === 0) return null;

  switch (config.type) {
    case "DropdownWithSearch":
      return (
        <DropdownWithSearch
          key={key}
          label={config.label}
          options={config.all}
          selectedOption={selectedValues[key]}
          onSelect={(value) => handleSelect(value)}
        />
      );
    case "DatePicker":
      return (
        <div className="mb-6" key={key}>
          <CustomDatePicker
            label={config.label}
            selectedDate={selectedDatetime}
            onChange={handleDateChangeHandler}
            dateDisplayFormat={config.format.display}
            maxDate={config.end}
            minDate={config.start}
            dateFormat={config.format.backend}
          />
          {flaskData.initialTimes.hours.length > 1 && (
            <ButtonGroup
              label="Select Hour"
              options={flaskData.initialTimes.hours.map((hour) => ({
                label: `${String(hour).padStart(2, "0")}z`,
                var: hour,
              }))}
              selectedOption={{ label: `${String(selectedHour).padStart(2, "0")}z`, var: selectedHour }}
              onSelect={(option) => handleHourClickHandler(option.var)}
              disabledOptions={flaskData.initialTimes.hours.filter((hour) => isPastEnd(selectedDatetime, hour, flaskData))}
            />
          )}
        </div>
      );
    case "ButtonGroup":
      return (
        <ButtonGroup
          key={key}
          label={config.label}
          options={config.all}
          selectedOption={selectedValues[key]}
          onSelect={(value) => handleSelect(value)}
        />
      );
    case "RadioButtonGroup":
      return (
        <RadioButtonGroup
          key={key}
          label={config.label}
          options={config.all}
          selectedOption={selectedValues[key]}
          onSelect={(value) => handleSelect(value)}
        />
      );
    case "Checkbox":
      return (
        <TrackCheckbox
          key={key}
          label={config.label}
          options={config.all}
          selectedOption={selectedValues[key]}
          onSelect={(value) => handleSelect(value)}
        />
      );
    default:
      return null;
  }
};

export default renderComponent;