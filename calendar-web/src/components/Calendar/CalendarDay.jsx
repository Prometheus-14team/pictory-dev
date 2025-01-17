import React from "react";
import { format, isSameMonth } from "date-fns";
import "../assets/styles.css";

function CalendarDay({ date }) {
  return (
    <div className="div-wrapper">
      <div className="element">

      <span style={{ color: isSameMonth(date, new Date()) ? "black" : "gray" }}>
        {format(date, "d")}
      </span>

      </div>
    </div>
  );
}

export default CalendarDay;