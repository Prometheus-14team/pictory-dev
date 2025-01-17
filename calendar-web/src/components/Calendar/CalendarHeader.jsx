import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import "../assets/styles.css";
import polygon2 from "../assets/img/Polygon 2.png";
import polygon3 from "../assets/img/Polygon 3.png";
import pictorysmall from "../assets/img/PICTORYsmall.png";
import misc from "../assets/img/GoInput-inactive.png";
import vector from "../assets/img/Vector.png";

function CalendarHeader({ currentDate, onNext, onPrev }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="header-wrapper">
      <div className="text-wrapper-5">날짜를 선택해주세요</div>
      
      <div>
        <img
          className="polygon"
          alt="Polygon"
          src={polygon2}
          onClick={onPrev}
        />
        <span className="text-wrapper-6">
          {format(currentDate, "MMMM yyyy")}
        </span>
        <img
          className="polygon-2"
          alt="Polygon"
          src={polygon3}
          onClick={onNext}
        />
      </div>
      <div className="link-wrapper">
        <Link to="/">
          <img className="group-2" alt="Group" src={pictorysmall} />
        </Link>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ position: "relative" }}
        >
          <Link to="/post">
            <img
              className="misc"
              alt="Misc"
              src={misc}
              style={{ position: "relative", marginRight: "10vw" }}
            />
          </Link>
          {isHovered && (
            <img
              src={vector}
              style={{
                position: "absolute",
                right: "10vw",
                width: "3vw",
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarHeader;
