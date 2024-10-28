import React from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ label, selectedDate, onChange, dateFormat }) => {
    return (
        <div className="mb-6">
            <p className="text-base font-bold mb-2">{label}</p>
            <div className="datepicker-container">
                <DatePicker
                    selected={selectedDate}
                    onChange={onChange}
                    dateFormat={dateFormat}
                    className="datepicker-input"
                />
                <FaCalendarAlt className="datepicker-icon" />
                
            </div>
        </div>
    );
};

export default CustomDatePicker;
