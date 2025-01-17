import React from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from "date-fns";
import CalendarDay from "./CalendarDay";
import "../assets/styles.css";

function CalendarGrid({ currentDate }) {
  const startDate = startOfWeek(startOfMonth(currentDate));
  const endDate = endOfWeek(endOfMonth(currentDate));

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
      <div className="calendar-container">
        <div className="week-days">
        {weekDays.map((weekday, index) => (
          <div key={index}>
            {weekday}
          </div>
        ))}
        </div>
        <div className="navbar">
        {days.map((day, index) => (
          <CalendarDay
            className = "calendar-date-instance"
            ellipseClassName = "design-component-instance"
            property1 = "normal" 
            key={index} date={day} 
          />
        ))}
      </div>  
    </div>
  );
}

export default CalendarGrid;
