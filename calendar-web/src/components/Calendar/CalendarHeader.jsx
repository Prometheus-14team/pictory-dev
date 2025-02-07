import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format, getDay } from "date-fns";
import "../assets/styles.css";
import polygon2 from "../assets/img/Polygon 2.png";
import polygon3 from "../assets/img/Polygon 3.png";
import pictorysmall from "../assets/img/PICTORYsmall.png";
import misc from "../assets/img/GoInput-inactive.png";
import vector from "../assets/img/Vector.png";
import group29 from "../assets/img/Group 29.png";
import { ko } from "date-fns/locale";

function CalendarHeader({ currentDate, onNext, onPrev }) {
  const datePath = format(currentDate, "yyyy-MM-dd");
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="header-wrapper">
      <div className="calendar-img"
        style={{position:"absolute", left:"21vw", top: "8vh"}}>
        <img src={group29} style={{width:"15vw", height:"auto"}}/>
      </div>
      <div className="calendar-head">
        <img
          className="polygon"
          alt="Polygon"
          src={polygon2}
          onClick={onPrev}
          style={{marginRight:"1vw"}}
        />
        <span className="text-wrapper-6"
          style={{ position: "relative", top: "-2px" }}>
          {format(currentDate, "yyyy년 MMMM", { locale: ko })}
        </span>
        <img
          className="polygon-2"
          alt="Polygon"
          src={polygon3}
          onClick={onNext}
          style={{marginLeft:"1vw"}}
        />
        </div>
        <div className="logo-head">
        <Link to="/">
          <img className="group-2" alt="Group" src={pictorysmall} />
        </Link>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ position: "relative" }}
        >
          <Link to={`/post/${datePath}`}>
            <img
              className="misc"
              alt="Misc"
              src={misc}
            />
                      {isHovered && (
            <img
              src={vector}
              style={{
                position: "absolute",
                right: "0.1vw",
                width: "3vw",
                top: "4vw",
                pointerEvents: "none",
                zIndex: 12
              }}
            />
          )}
          </Link>
          </div>
        </div>
      </div>
  );
}

export default CalendarHeader;
