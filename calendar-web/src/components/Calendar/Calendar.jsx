import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import List from "./List";
import "../assets/styles.css";
import group11 from "../assets/img/logo.png";
import { addMonths, subMonths, format } from "date-fns";


function Calendar() {

    const [currentDate, setCurrentDate] = useState(new Date());

    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    return (
        <div className="main">
            <div className="overlap">
                <div id="Main" className="div">
                    <CalendarHeader 
                        currentDate = {currentDate}
                        onNext = {handleNextMonth}
                        onPrev = {handlePrevMonth}
                    /> 
                    
                    <CalendarGrid currentDate = {currentDate} />
                </div>

                <div id="List" className="list">    
                     <List />
                </div>
            </div>
        </div>
    );


}

export default Calendar;