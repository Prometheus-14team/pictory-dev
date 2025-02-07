import React, { useState } from "react";
import { format, getDay } from "date-fns";
import "../assets/styles.css";
import { Link } from "react-router-dom";

function CalendarDay({ date }) {
  const dayOfWeek = getDay(date); // 0 (Sunday)부터 6 (Saturday)까지 반환

  // 첫 번째 열(일요일)과 일곱 번째 열(토요일)에 투명도를 적용
  const isFirstColumn = dayOfWeek === 0; // 일요일
  const isSeventhColumn = dayOfWeek === 6; // 토요일
  const datePath = format(date, "yyyy-MM-dd"); 
  return (
    <div className="div-wrapper" >
      <div className="hover-circle">
      <div className="element"
              style={{
                opacity: isFirstColumn || isSeventhColumn ? 0.5 : 0.99, // 투명도 적용
                width: "2vw",
                height: "2vw"
              }}>
        <Link to={`/finalpost/${datePath}`} style={{ textDecoration: "none", color: "inherit" }}>
          {format(date, "d")}
        </Link></div>
      </div>
    </div>
  );
}

export default CalendarDay;