import React, { useState } from 'react';

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
      days.push(<div key={`empty-${i}`} className="flex items-center justify-center rounded cursor-default opacity-0 relative text-sm font-medium min-h-7 h-7"></div>);
    }
    
    // Add days of the month (1 to actual days in month)
    for (let day = 1; day <= daysInMonth; day++) {
      const isTodayClass = isToday(day) ? 'bg-white bg-opacity-20 text-white font-semibold border border-white border-opacity-30' : '';
      const hasEventClass = hasEvent(day) ? 'bg-transparent border-none' : '';
      const selectedClass = selectedDay === day ? 'bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-300 transform scale-105' : '';
      const todayWithEventClass = isToday(day) && hasEvent(day) ? 'bg-white bg-opacity-90 text-gray-800 border-none' : '';
      const selectedWithEventClass = hasEvent(day) && selectedDay === day ? 'bg-blue-500 text-white border-none' : '';
      
      days.push(
        <div
          key={day}
          className={`flex items-center justify-center rounded cursor-pointer transition-all duration-200 relative text-sm font-medium min-h-7 h-7 hover:bg-white hover:bg-opacity-10 ${isTodayClass} ${hasEventClass} ${selectedClass} ${todayWithEventClass} ${selectedWithEventClass}`}
          onClick={() => handleDateClick(day)}
        >
          <span className="day-number">{day}</span>
          {hasEvent(day) && <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-green-500 rounded-full shadow-sm shadow-green-500"></div>}
        </div>
      );
    }
    
    // Only add empty cells to complete the current week, not extra rows
    const currentWeekCells = (firstDay + daysInMonth) % 7;
    if (currentWeekCells !== 0) {
      const remainingCells = 7 - currentWeekCells;
      for (let i = 0; i < remainingCells; i++) {
        days.push(<div key={`empty-end-${i}`} className="flex items-center justify-center rounded cursor-default opacity-0 relative text-sm font-medium min-h-7 h-7"></div>);
      }
    }
    
    return days;
  };
  
  
  return (
    <div className="bg-gray-800 rounded-xl p-6 text-white shadow-lg min-w-80 overflow-visible h-auto flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <button className="bg-white bg-opacity-10 border-none rounded-md p-2 text-white cursor-pointer transition-colors duration-200 flex items-center justify-center hover:bg-white hover:bg-opacity-20" onClick={() => navigateMonth(-1)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
        <h3 className="text-2xl font-bold m-0 text-white">
          {months[currentDate.getMonth()]}
        </h3>
        <button className="bg-white bg-opacity-10 border-none rounded-md p-2 text-white cursor-pointer transition-colors duration-200 flex items-center justify-center hover:bg-white hover:bg-opacity-20" onClick={() => navigateMonth(1)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>
      
      <div className="flex flex-col h-auto overflow-visible">
        <div className="w-full box-border">
          <div className="grid grid-cols-7 gap-0.5 mb-1 ml-0 mr-0 p-0 box-border">
            {daysOfWeek.map(day => (
              <div key={day} className="text-xs font-medium text-white text-center py-1 px-0.5 bg-transparent border-none shadow-none rounded-none m-0 whitespace-nowrap overflow-visible">{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 grid-rows-auto gap-0.5 ml-0 mr-0 box-border">
            {renderCalendarDays()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
