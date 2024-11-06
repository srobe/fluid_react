
// src/components/UserInput/CalendarSelect.js
import React, { useState, useEffect } from 'react';
import { FaCaretDown, FaSearch, FaCalendarAlt } from "react-icons/fa";
import { addYears, format } from "date-fns";
import { parseUTCDate, toCurrentOffset, toDateOffset } from "../../utils/dateUtils";

const CalendarSelect = ({ 
  label, 
  selectedDate, 
  onChange, 
  dateDisplayFormat, 
  minDate, 
  maxDate, 
  dateFormat 
}) => {
  // Parse minDate and maxDate as UTC dates
  const parsedMinDate = minDate ? parseUTCDate(minDate, dateFormat) : new Date(Date.UTC(1980, 0, 1));
  const parsedMaxDate = maxDate ? parseUTCDate(maxDate, dateFormat) : addYears(new Date(Date.UTC(2024, 0, 1)), 1);

  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(selectedDate ? toCurrentOffset(selectedDate) : new Date());
  const [internalSelectedDate, setInternalSelectedDate] = useState(selectedDate ? toCurrentOffset(selectedDate) : null);

  // Update internalSelectedDate if selectedDate prop changes
  useEffect(() => {
    setInternalSelectedDate(selectedDate ? toCurrentOffset(selectedDate) : null);
    setCurrentDate(selectedDate ? toCurrentOffset(selectedDate) : new Date());
  }, [selectedDate]);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const generateDays = () => {
    const days = [];
    // Empty slots for days before the first of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateOffset = toDateOffset(date);
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = internalSelectedDate && internalSelectedDate.toDateString() === date.toDateString();
      const isWithinRange = dateOffset >= parsedMinDate && dateOffset <= parsedMaxDate;

      days.push(
        <button
          key={day}
          onClick={() => {
            if (isWithinRange) {
              setInternalSelectedDate(date);
              onChange(toDateOffset(date));
              setIsOpen(false);
            }
          }}
          className={`h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100
            ${isToday ? 'border border-blue-400' : ''}
            ${isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
            ${!isWithinRange ? 'text-gray-400 cursor-not-allowed' : ''}
          `}
          disabled={!isWithinRange}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  return (
    <div className="mb-6">
      <p className="text-base font-bold mb-2">{label}</p>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-2 py-1 border border-gray-300 rounded-sm bg-white text-left flex items-center justify-between"
        >
          <span>{internalSelectedDate ? format(internalSelectedDate, dateDisplayFormat) : 'Select date...'}</span>
          <span className="text-gray-500">
            <FaCalendarAlt className="datepicker-icon" />
          </span>
        </button>

        {isOpen && (
          <div className="absolute w-full bg-white border border-gray-300 rounded-sm mt-1 z-10 p-2">
            <div className="flex justify-between items-center mb-4">
              <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded">
                ←
              </button>
              <span className="font-medium">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
                →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {generateDays()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarSelect;
