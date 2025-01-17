import React from "react";
import Calendar from "../components/Calendar/Calendar";
import { Link } from "react-router-dom";
import "../components/assets/styles.css";
import img from "../components/img";

function CalendarPage() {
  return (
    <div>
      <Calendar />
    </div>

  );
}

export default CalendarPage;

// <div>
// <Link to ='/'>
//     Back to the Home
// </Link>
// <Calendar />
// </div>


// <div className="overlap">
// <div className="div">
//   <div className="group-wrapper">
//     <img className="img" alt ="Group" src={img.PICTORYsmall} />
//   </div>

// </div>
// </div>
// </div>