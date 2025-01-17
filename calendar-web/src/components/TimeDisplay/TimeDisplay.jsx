import React from "react";
import { format, isSameMonth } from "date-fns";

function CalendarDay({ date }) {
  return (
    <div style={{ padding: "10px", textAlign: "center" }}>
      <span style={{ color: isSameMonth(date, new Date()) ? "black" : "gray" }}>
        {format(date, "d")}
      </span>
    </div>
  );
}

export default CalendarDay;