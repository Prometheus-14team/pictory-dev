/* Post 컴포넌트 */
import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom";

import "../assets/styles.css";
import { ReactComponent as PostLayer } from "../assets/post.svg";

import PostSubmit from "./postsubmit";
import t from "../assets/img/Text.png";
import backButton from "../assets/img/backButton.png"
import  Sun  from "../assets/img/Sun.png";
import  cloud  from "../assets/img/Cloud.png";
import  Rain  from "../assets/img/Rain.png";
import  neutral  from "../assets/img/NeutralFace.png";
import  smile  from "../assets/img/SmilingFace.png";
import  sad  from "../assets/img/SadFace.png";
import  smileb  from "../assets/img/smileblue.png";
import  sadb  from "../assets/img/sadblue.png";
import  neutralb from "../assets/img/neublue.png";
import  sunb  from "../assets/img/sunb.png";
import  cloudb  from "../assets/img/cloudb.png";
import  rainb from "../assets/img/rainb.png";

function Post({ 
  currentDate,
  text,
  userId,
  handleChange,
  handleUserIdChange,
  handleSubmit,
  formRef,
 }) {
  const [activeSmile, setActiveSmile] = useState(false);
  const [activeNeutral, setActiveNeutral] = useState(false);
  const [activeSad, setActiveSad] = useState(false);
  const [activeSun, setActiveSun] = useState(false);
  const [activeCloud, setActiveCloud] = useState(false);
  const [activeRain, setActiveRain] = useState(false);
  
  const [hoveredSmile, setHoveredSmile] = useState(false);
  const [hoveredNeutral, setHoveredNeutral] = useState(false);
  const [hoveredSad, setHoveredSad] = useState(false);
  const [hoveredSun, setHoveredSun] = useState(false);
  const [hoveredCloud, setHoveredCloud] = useState(false);
  const [hoveredRain, setHoveredRain] = useState(false);
  
  return (
    <div className="container">
      <div className="back">
        <Link to="/calendar">
          <img src={backButton} alt="backButton" className="back-img" />
        </Link>
        
      </div>
      <div className="face">
        {/* Smile */}
        <div
          onMouseEnter={() => setHoveredSmile(true)}
          onMouseLeave={() => !activeSmile && setHoveredSmile(false)}
          onClick={() => setActiveSmile(prev => !prev)}
          style={{ position: "relative" }}
        >
          <img src={smile} style={{ width: "2.5vw" }} />
          {(hoveredSmile || activeSmile) && (
            <img
              src={smileb}
              style={{
                position: "absolute",
                left: "0vw",
                pointerEvents: "none",
                zIndex: "100",
              }}
            />
          )}
        </div>
  
        {/* Neutral */}
        <div
          onMouseEnter={() => setHoveredNeutral(true)}
          onMouseLeave={() => !activeNeutral && setHoveredNeutral(false)}
          onClick={() => setActiveNeutral(prev => !prev)}
          style={{ position: "relative" }}
        >
          <img src={neutral} style={{ width: "2.5vw" }} />
          {(hoveredNeutral || activeNeutral) && (
            <img
              src={neutralb}
              style={{
                position: "absolute",
                left: "0vw",
                pointerEvents: "none",
                zIndex: "100",
              }}
            />
          )}
        </div>
  
        {/* Sad */}
        <div
          onMouseEnter={() => setHoveredSad(true)}
          onMouseLeave={() => !activeSad && setHoveredSad(false)}
          onClick={() => setActiveSad(prev => !prev)}
          style={{ position: "relative" }}
        >
          <img src={sad} style={{ width: "2.5vw" }} />
          {(hoveredSad || activeSad) && (
            <img
              src={sadb}
              style={{
                position: "absolute",
                left: "0vw",
                pointerEvents: "none",
                zIndex: "100",
              }}
            />
          )}
        </div>
      </div>
  
      <div className="weather">
        {/* Sun */}
        <div
          onMouseEnter={() => setHoveredSun(true)}
          onMouseLeave={() => !activeSun && setHoveredSun(false)}
          onClick={() => setActiveSun(prev => !prev)}
          style={{ position: "relative" }}
        >
          <img src={Sun} style={{ width: "2.5vw" }} />
          {(hoveredSun || activeSun) && (
            <img
              src={sunb}
              style={{
                position: "absolute",
                left: "0vw",
                pointerEvents: "none",
                zIndex: "100",
              }}
            />
          )}
        </div>
  
        {/* Cloud */}
        <div
          onMouseEnter={() => setHoveredCloud(true)}
          onMouseLeave={() => !activeCloud && setHoveredCloud(false)}
          onClick={() => setActiveCloud(prev => !prev)}
          style={{ position: "relative" }}
        >
          <img src={cloud} style={{ width: "2.5vw" }} />
          {(hoveredCloud || activeCloud) && (
            <img
              src={cloudb}
              style={{
                position: "absolute",
                left: "0vw",
                pointerEvents: "none",
                zIndex: "100",
              }}
            />
          )}
        </div>
  
        {/* Rain */}
        <div
          onMouseEnter={() => setHoveredRain(true)}
          onMouseLeave={() => !activeRain && setHoveredRain(false)}
          onClick={() => setActiveRain(prev => !prev)}
          style={{ position: "relative" }}
        >
          <img src={Rain} style={{ width: "2.5vw" }} />
          {(hoveredRain || activeRain) && (
            <img
              src={rainb}
              style={{
                position: "absolute",
                left: "0vw",
                pointerEvents: "none",
                zIndex: "100",
              }}
            />
          )}
        </div>
      </div>
      <div className="post-and-textbox">
        <PostLayer className="post-layer" />
          <text className="svg-text">
              {currentDate} 
          </text>
          <div className="textbox">
            <PostSubmit handleSubmit={handleSubmit} />
            <form ref={formRef} onSubmit={handleSubmit}>
              <img src={t} style={{width:"45vw"}}/>
              <textarea
                value={text}
                onChange={handleChange}
                className="text-input"
                placeholder="텍스트를 입력하세요..."
              />
            </form>
        </div>
    </div>
  </div>
  );
}


export default Post;

