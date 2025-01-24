// finalPost 컴포넌트
import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom";

import "../assets/styles.css";
import  postLayer  from "../assets/finalPost.svg";
import { ReactComponent as finalPostSVG } from "../assets/finalPost.svg";



function finalPost({currentdate}){ //currentdate 구현해야 함.

    return(

        <div>
            <finalPostSVG className="final-post-layer"/>
            <p>
                finalPost 컴포넌트 랜더링
            </p>
        </div>
            );
}

export default finalPost;