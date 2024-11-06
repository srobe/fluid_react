// src/components/RenderComponent.js

import React from "react";
import {
  DropdownWithSearch,
  CustomDatePicker,
  ButtonGroup,
  RadioButtonGroup,
  TrackCheckbox,
  Toggle
} from "."; 
import { updateLeadHours, setHourOnDate, isPastEnd, formatUTC } from "../utils/dateUtils";

const renderComponent = (key, config, handlers) => {
  const {
    setSelectedValues,
    updateLevels,
    selectedValues,
    setFlaskData,
    flaskData,
    customHandleSelect,
    customHandleDateChange,
    customHandleHourClick,
  } = handlers;

  const updateDateTime = ({ date, hour }) => {
    setSelectedValues((prev) => {
      const newDate = date !== undefined ? date : prev.datetime;
      const newHour = hour !== undefined ? hour : prev.currentHour;
      const datetime = setHourOnDate(newDate, newHour);
  
      const backendFormattedDate = formatUTC(
        datetime,
        flaskData.initialTimes.format.backend
      );
      const displayFormattedDate = formatUTC(
        datetime,
        flaskData.initialTimes.format.display
      );
  
      let newSelectedValues = {
        ...prev,
        datetime: datetime,
        currentHour: newHour,
        initialTimes: {
          var: backendFormattedDate,
          label: displayFormattedDate,
        },
      };
  
      // Update lead hours and get updated selectedValues
      newSelectedValues = updateLeadHours(
        datetime,
        flaskData,
        setFlaskData,
        prev,
        newSelectedValues
      );
  
      return newSelectedValues;
    });
  };

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
          levels: option,
        }));
        break;
      default:
        setSelectedValues((prev) => ({
          ...prev,
          [key]: option,
        }));
    }
  };

  // Updated handleDateChange function
  const defaultHandleDateChange = (date) => {
    updateDateTime({ date });
  };

  // Updated handleHourClick function
  const defaultHandleHourClick = (hour) => {
    updateDateTime({ hour });
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
            selectedDate={selectedValues.datetime}
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
              selectedOption={{
                label: `${String(selectedValues.currentHour).padStart(2, "0")}z`,
                var: selectedValues.currentHour,
              }}
              onSelect={(option) => handleHourClickHandler(option.var)}
              disabledOptions={flaskData.initialTimes.hours.filter((hour) =>
                isPastEnd(selectedValues.datetime, hour, flaskData)
              )}
            />
          )}
        </div>
      );
    case "ButtonGroup":
      // Ensure options are in the correct format
      const options =
        typeof config.all[0] === "string"
          ? config.all.map((item) => ({ var: item, label: item }))
          : config.all;
      return (
        <ButtonGroup
          key={key}
          label={config.label}
          options={options}
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
      case "Toggle":
        return (
          <Toggle
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