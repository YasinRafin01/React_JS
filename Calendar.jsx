import React, { useState, useEffect } from 'react';
import './NavBar.css'; // Add your styles for the date picker here

const DatePicker = ({ isVisible, onDateSelect, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCheckIn, setSelectedCheckIn] = useState(null);
  const [selectedCheckOut, setSelectedCheckOut] = useState(null);
  const [selectedDateRangeOption, setSelectedDateRangeOption] = useState("");
  
  useEffect(() => {
    if (isVisible) {
      renderCalendar();
    }
  }, [isVisible, currentDate, selectedCheckIn, selectedCheckOut]);

  const toggleDatePicker = () => {
    onClose(); // Close the date picker when toggled
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.setMonth(prev.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.setMonth(prev.getMonth() + 1)));
  };

  const renderCalendar = () => {
    datePickerBody.innerHTML = '';
    const months = [getCurrentMonthDays(), getNextMonthDays()];
  
    months.forEach((month, index) => {
      const monthElement = document.createElement('div');
      monthElement.className = 'month';
  
      // Create month header
      const monthHeader = document.createElement('div');
      monthHeader.className = 'month-header';
      monthHeader.textContent = new Date(currentDate.getFullYear(), currentDate.getMonth() + index).toLocaleString('default', { month: 'long', year: 'numeric' });
      monthElement.appendChild(monthHeader);
  
      // Create weekdays header
      const weekdaysElement = document.createElement('div');
      weekdaysElement.className = 'weekdays';
      ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        weekdaysElement.appendChild(dayElement);
      });
      monthElement.appendChild(weekdaysElement);
  
      // Create days
      const daysElement = document.createElement('div');
      daysElement.className = 'days';
      month.forEach(day => {
        const dayElement = document.createElement('div');
        if (day) {
          dayElement.textContent = day.getDate();
          dayElement.className = 'day';
          dayElement.addEventListener('click', () => selectDate(day));
          if (isDateSelected(day)) {
            dayElement.classList.add('selected');
          }
        } else {
          dayElement.className = 'day empty';
        }
        daysElement.appendChild(dayElement);
      });
      monthElement.appendChild(daysElement);
  
      datePickerBody.appendChild(monthElement);
    });
  };
  const selectDate = (date) => {
    if (!selectedCheckIn) {
      setSelectedCheckIn(date);
      setSelectedCheckOut(null);
    } else if (selectedCheckIn && !selectedCheckOut) {
      if (selectedCheckIn.getTime() === date.getTime()) {
        setSelectedCheckIn(null);
      } else {
        setSelectedCheckOut(date);
        if (selectedCheckOut < selectedCheckIn) {
          setSelectedCheckIn(selectedCheckOut);
          setSelectedCheckOut(selectedCheckIn);
        }
      }
    } else if (selectedCheckIn && selectedCheckOut) {
      if (selectedCheckOut.getTime() === date.getTime()) {
        setSelectedCheckOut(null);
      } else if (selectedCheckIn.getTime() === date.getTime()) {
        setSelectedCheckIn(null);
      } else {
        setSelectedCheckIn(date);
        setSelectedCheckOut(null);
      }
    }
    onDateSelect(selectedCheckIn, selectedCheckOut);
  };

  return (
    <div className={`date-picker ${isVisible ? 'visible' : ''}`}>
      <button onClick={toggleDatePicker}>Close</button>
      <button onClick={handlePrevMonth}>Previous</button>
      <button onClick={handleNextMonth}>Next</button>
      {/* Render calendar here */}
    </div>
  );
};

export default DatePicker;