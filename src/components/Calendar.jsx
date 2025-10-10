import React, { useState } from 'react';
import './Calendar.css';

const Calendar = ({ selectedDate, onDateSelect, events = [] }) => {
  // Get current date in IST
  const getISTDate = () => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const ist = new Date(utc + (5.5 * 3600000)); // IST is UTC+5:30
    return ist;
  };
  
  const [currentDate, setCurrentDate] = useState(selectedDate || getISTDate());
  const [selectedDay, setSelectedDay] = useState(selectedDate ? selectedDate.getDate() : getISTDate().getDate());
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday (0) to Monday (6)
  };
  
  const getWeekNumber = (date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - start) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + start.getDay() + 1) / 7);
  };
  
  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      // Ensure the date is still valid in IST
      return new Date(newDate.getTime() + (5.5 * 3600000));
    });
    // Reset selected day when changing months
    setSelectedDay(1);
  };
  
  const handleDateClick = (day) => {
    setSelectedDay(day);
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    // Convert to IST
    const istDate = new Date(clickedDate.getTime() + (5.5 * 3600000));
    if (onDateSelect) {
      onDateSelect(istDate);
    }
  };
  
  const isToday = (day) => {
    const today = getISTDate();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };
  
  const hasEvent = (day) => {
    return events.some(event => {
      const eventDate = new Date(event.date);
      // Convert event date to IST for comparison
      const istEventDate = new Date(eventDate.getTime() + (5.5 * 3600000));
      return (
        day === istEventDate.getDate() &&
        currentDate.getMonth() === istEventDate.getMonth() &&
        currentDate.getFullYear() === istEventDate.getFullYear()
      );
    });
  };
  
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Add days of the month (1 to actual days in month)
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday(day) ? 'today' : ''} ${hasEvent(day) ? 'has-event' : ''} ${selectedDay === day ? 'selected' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          <span className="day-number">{day}</span>
          {hasEvent(day) && <div className="event-indicator"></div>}
        </div>
      );
    }
    
    // Ensure we have enough rows to display all dates (minimum 6 rows)
    const totalCellsNeeded = Math.max(42, Math.ceil((firstDay + daysInMonth) / 7) * 7);
    const usedCells = firstDay + daysInMonth;
    
    // Add empty cells to complete the grid
    for (let i = usedCells; i < totalCellsNeeded; i++) {
      days.push(<div key={`empty-end-${i}`} className="calendar-day empty"></div>);
    }
    
    return days;
  };
  
  
  return (
    <div className="calendar-widget">
      <div className="calendar-header">
        <button className="nav-button" onClick={() => navigateMonth(-1)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
        <h3 className="calendar-title">
          {months[currentDate.getMonth()]}
        </h3>
        <button className="nav-button" onClick={() => navigateMonth(1)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>
      
      <div className="calendar-content">
        <div className="calendar-grid">
          <div className="days-header">
            {daysOfWeek.map(day => (
              <div key={day} className="day-header">{day}</div>
            ))}
          </div>
          
          <div className="calendar-days">
            {renderCalendarDays()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
