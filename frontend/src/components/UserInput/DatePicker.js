import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { format, getYear, getMonth } from "date-fns";
import Dropdown from "./Dropdown";

const customStyles = `
.react-datepicker {
  border: 1px solid rgb(209 213 219);
  border-radius: 0.375rem;
  padding: 1rem;
  width: 100%;
  background: white;
}

.react-datepicker__month-container {
  width: 100%;
}

.react-datepicker__month {
  margin: 0;
}

.react-datepicker__header {
  background: white;
  border: none;
  padding: 0;
  margin: 0;
}

.react-datepicker__day-names, 
.react-datepicker__week {
  display: flex;
  justify-content: space-between;
  padding: 0;
}

.react-datepicker__day {
  margin: 0.125rem;
  width: 2.25rem;
  height: 2.25rem;
  line-height: 2.25rem;
  border-radius: 0;
  flex: 1;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.react-datepicker__day:hover {
  background-color: rgb(229 231 235);
  border-radius: 0;
}

.react-datepicker__day--selected {
  background-color: rgb(37 99 235) !important;
  color: white !important;
  border-radius: 0 !important;
}

.react-datepicker__day--keyboard-selected {
  background-color: rgb(219 234 254);
  color: rgb(37 99 235);
  border-radius: 0;
}

.react-datepicker__day--today {
  font-weight: 500;
  color: rgb(37 99 235);
}

.react-datepicker__day-names {
  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
}

.react-datepicker__day-name {
  margin: 0.125rem;
  width: 2.25rem;
  color: rgb(107 114 128);
  font-weight: 500;
  flex: 1;
  text-align: center;
}

.react-datepicker__day--outside-month {
  color: rgb(209 213 219);
}

.react-datepicker__triangle {
  display: none;
}
`;

const CustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthOptions = months.map((month, index) => ({
    label: month,
    value: index
  }));

  const currentYear = getYear(date);
  const yearOptions = Array.from({ length: 201 }, (_, i) => {
    const year = currentYear - 100 + i;
    return {
      label: year.toString(),
      value: year
    };
  });

  return (
    <div className="flex items-center justify-between mb-2">
      <button
        type="button"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded"
      >
        <FaChevronLeft className="h-4 w-4 text-gray-400" />
      </button>

      <div className="flex items-center gap-2">
        <div className="w-32">
          <Dropdown
            options={monthOptions}
            selectedOption={months[getMonth(date)]}
            onSelect={(option) => changeMonth(option.value)}
            label=""
          />
        </div>
        <div className="w-24">
          <Dropdown
            options={yearOptions}
            selectedOption={currentYear.toString()}
            onSelect={(option) => changeYear(option.value)}
            label=""
          />
        </div>
      </div>

      <button
        type="button"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded"
      >
        <FaChevronRight className="h-4 w-4 text-gray-400" />
      </button>
    </div>
  );
};

const CustomDatePicker = ({
  label,
  selectedDate,
  onChange,
  dateDisplayFormat = "MMM dd, yyyy",
  minDate,
  maxDate,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const calRef = useRef(null);

  const handleClickOutside = (event) => {
    if (calRef.current && !calRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = customStyles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="mb-6"> {/* Added mb-6 for consistent spacing */}
      {label && (
        <h2 className="text-xl font-bold mb-4">{label}</h2> 
      )}
      <div className="relative" ref={calRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm text-left 
                   flex items-center justify-between hover:border-gray-400 
                   focus:outline-none focus:ring-0
                   transition-all duration-200"
        >
          <span className="text-gray-700">
            {selectedDate 
              ? format(new Date(selectedDate), dateDisplayFormat)
              : "Select date..."}
          </span>
          <FaCalendarAlt className="h-4 w-4 text-gray-400" />
        </button>
        
        {isOpen && (
          <div className="absolute left-0 right-0 z-50 mt-2">
            <DatePicker
              selected={selectedDate ? new Date(selectedDate) : null}
              onChange={(date) => {
                onChange(date);
                setIsOpen(false);
              }}
              inline
              minDate={minDate ? new Date(minDate) : null}
              maxDate={maxDate ? new Date(maxDate) : null}
              renderCustomHeader={CustomHeader}
              calendarClassName="shadow-none bg-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDatePicker;