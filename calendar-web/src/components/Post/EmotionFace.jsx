import React, { useState, useEffect } from "react"
import { format } from "date-fns";
import "../assets/styles.css";
import  SmilingFace   from "../assets/img/SmilingFace.png";
import  NeutralFace  from "../assets/img/NeutralFace.png";
import  SadFace  from "../assets/img/SadFace.png";


function EmotionFace() {
    return(

        <img src={SmilingFace} className="icon-smiling-face" />
        // <NeutralFaceFace className="icon-smiling-face" />
        // <SadFace className="icon-smiling-face" />

    );
}

export default EmotionFace;


