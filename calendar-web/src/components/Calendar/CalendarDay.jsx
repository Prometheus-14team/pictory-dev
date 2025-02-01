import React from "react";
import { format, getDay } from "date-fns";
import "../assets/styles.css";
import { Link } from "react-router-dom";

function CalendarDay({ date }) {
  const dayOfWeek = getDay(date); // 0 (Sunday)부터 6 (Saturday)까지 반환

  // 첫 번째 열(일요일)과 일곱 번째 열(토요일)에 투명도를 적용
  const isFirstColumn = dayOfWeek === 0; // 일요일
  const isSeventhColumn = dayOfWeek === 6; // 토요일
  const datePath = format(date, "yyyy-MM-dd"); // URL-friendly date format

  return (
    <div className="div-wrapper">
      <div className="element"
              style={{
                opacity: isFirstColumn || isSeventhColumn ? 0.5 : 1, // 투명도 적용
              }}>
        <Link to={`/post/${datePath}`}>{format(date, "d")}</Link>

      </div>
    </div>
  );
}

export default CalendarDay;