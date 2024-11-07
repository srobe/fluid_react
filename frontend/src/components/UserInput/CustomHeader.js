import React from 'react';
import { getMonth, getYear } from 'date-fns';
import { generateYearsArray, getFilteredMonths } from '../../utils'; // Import utility functions

// The CustomHeader component for the date picker
const CustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  minDate,
  maxDate,
}) => {
  // Generate the list of years between minDate and maxDate
  const years = generateYearsArray(minDate, maxDate);
  
  // Get the filtered months based on the selected date and min/max dates
  const filteredMonths = getFilteredMonths(date, minDate, maxDate);

  return (
    <div
      style={{
        // margin: '1px 0', // Adjust margins for top and bottom
        padding: '0 10px', // Add some horizontal padding for spacing
        display: 'flex',
        justifyContent: 'space-between', // Pushes buttons to the edges
        alignItems: 'center', // Center the dropdowns and buttons vertically
      }}
    >
      {/* Left arrow button aligned to the left edge */}
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        style={{
          fontSize: 'x-large',
          color: prevMonthButtonDisabled ? '#ccc' : 'black',
        }}
      >
        {"⭠"}
      </button>

      {/* Render the month select or display value if only one option */}
      {filteredMonths.length > 1 ? (
        <select
          value={getMonth(date)}
          onChange={({ target: { value } }) => changeMonth(parseInt(value))}
          className="custom-select" // Use custom styles
        >
          {filteredMonths.map(({ month, index }) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
      ) : (
        <span className="month-display">{filteredMonths[0].month}</span> // Display the single month value
      )}

      {/* Render the year select or display value if only one option */}
      {years.length > 1 ? (
        <select
          value={getYear(date)}
          onChange={({ target: { value } }) => changeYear(parseInt(value))}
          className="custom-select" // Use custom styles
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      ) : (
        <span className="year-display">{years[0]}</span> // Display the single year value
      )}

      {/* Right arrow button aligned to the right edge */}
      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        style={{
          fontSize: 'x-large',
          color: nextMonthButtonDisabled ? '#ccc' : 'black',
        }}
      >
        {"⭢"}
      </button>
    </div>
  );
};

export default CustomHeader;
