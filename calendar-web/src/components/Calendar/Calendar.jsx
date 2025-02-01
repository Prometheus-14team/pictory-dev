import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import List from "./List";
import "../assets/styles.css";
import { addMonths, subMonths, format } from "date-fns";
import rec49 from "../assets/img/Rectangle 47.png";


function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    return (
        <div className="main">
            <div className="overlap">
                    <CalendarHeader 
                        currentDate = {currentDate}
                        onNext = {handleNextMonth}
                        onPrev = {handlePrevMonth}
                    /> 
                <CalendarGrid currentDate = {currentDate} />
            </div>
            <div className="image-container">
                <img src={rec49} alt="Example" />
            </div>
            <div className="list">    
                 <List />
            </div>
        </div>
    );


}

export default Calendar;