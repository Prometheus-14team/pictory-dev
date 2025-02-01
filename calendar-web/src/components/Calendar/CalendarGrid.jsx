import React from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from "date-fns";
import CalendarDay from "./CalendarDay";
import "../assets/styles.css";
import { Link } from "react-router-dom";  // Link import 추가
import { format } from "date-fns";  // format을 import
import { useNavigate } from "react-router-dom";  // useNavigate 훅을 추가

function CalendarGrid({ currentDate }) {
  const navigate = useNavigate();  // useNavigate 훅을 사용하여 페이지 이동을 처리

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
        {days.map((day, index) => {
          const isCurrentMonth = day.getMonth() === currentDate.getMonth(); // 현재 달인지 확인
          if (!isCurrentMonth) {
            return <div key={index} className="empty-cell"></div>; // 빈 칸을 표시
          }
          return ( 
          <CalendarDay
          className={`calendar-date-instance ${isCurrentMonth ? "current-month-day" : ""}`}
          ellipseClassName={isCurrentMonth ? "design-component-instance" : ""} // 현재 달인 경우만 클래스 적용
          property1="normal"
          key={index}
          date={day}
        /> 
      );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;
