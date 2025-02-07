//PostComponent 코드
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ko } from "date-fns/locale"; // 한국어 로케일
import "../assets/styles.css";
import { ReactComponent as PostLayer } from "../assets/post.svg";
import { useNavigate } from 'react-router-dom';  // 페이지 이동을 위해 추가

import PostSubmit from "./postsubmit";
import PostSubmit2 from "./postsubmit";
import t from "../assets/img/Text.png";
import backButton from "../assets/img/backButton.png";
import Sun from "../assets/img/Sun.png";
import cloud from "../assets/img/Cloud.png";
import Rain from "../assets/img/Rain.png";
import neutral from "../assets/img/NeutralFace.png";
import smile from "../assets/img/SmilingFace.png";
import sad from "../assets/img/SadFace.png";
import smileb from "../assets/img/smileblue.png";
import sadb from "../assets/img/sadblue.png";
import neutralb from "../assets/img/neublue.png";
import sunb from "../assets/img/sunb.png";
import cloudb from "../assets/img/cloudb.png";
import rainb from "../assets/img/rainb.png";
import group38 from "../assets/img/Group 38.png";
import textsmall from "../assets/img/textsmall.png";
import component3 from "../assets/img/Component 3.png";
import backy from "../assets/img/backy.png";
import goy from "../assets/img/goy.png";
import check from "../assets/img/check.png";


function Post({ 
  currentDate,
  text,
  rawText,
  summaryText,
  tagGenInput,
  handleTagGenTextChange,
  handleChange,
  handleSubmit,
  handleGenerateAgain,
  formRef,
  handleCaptureAndSubmit,
 }) {
  // 기존의 face 및 weather 상태
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
  const [hoveredBack, setHoveredBack] = useState(false);
  const [hoveredPost, setHoveredPost] = useState(false);

  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Group38 이미지 보이기 위한 상태
  const [showGroup38, setShowGroup38] = useState(false); 

  const [submitted, setSubmitted] = useState(false);

 
  // PostSubmit 클릭시 그룹38 이미지를 보이도록 하고, 기존 handleSubmit 호출
  const handlePostSubmit = (e) => {
    e.preventDefault();
    setShowGroup38(true); // group38 이미지 보이게
    setSubmitted(true);    // 제출 완료 상태로 변경 -> 입력폼, post submit 숨김
    handleSubmit(e); // 기존의 제출 처리 로직 호출
  };
  const formattedDate = format(new Date(currentDate), "yyyy년 M월 d일 eeee", { locale: ko });


  
  return (
    <div className="container">
      <div className="back" 
      onMouseEnter={() => setHoveredBack(true)}
      onMouseLeave={() => setHoveredBack(false)}>
        <Link to="/calendar">
          <img src={backButton} alt="backButton" className="back-img" />
          {(hoveredBack) && (
            <img
              src={backy}
              style={{
                position: "absolute",
                pointerEvents: "none",
                zIndex: "100",
              }}
            />
          )}
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
                width: "2.5vw",
                position: "absolute",
                left: "0vw",
                pointerEvents: "none",
                zIndex: "100",
              }}
              alt="smile overlay"
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
                width: "2.5vw",
                position: "absolute",
                left: "0vw",
                pointerEvents: "none",
                zIndex: "100",
              }}
              alt="neutral overlay"
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
                width: "2.5vw",
                position: "absolute",
                left: "0vw",
                pointerEvents: "none",
                zIndex: "100",
              }}
              alt="sad overlay"
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
                width: "2.5vw",
                position: "absolute",
                left: "0vw",
                pointerEvents: "none",
                zIndex: "100",
              }}
              alt="sun overlay"
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
                width: "2.5vw",
                position: "absolute",
                left: "0vw",
                pointerEvents: "none",
                zIndex: "100",
              }}
              alt="cloud overlay"
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
                width: "2.5vw",
                position: "absolute",
                left: "0vw",
                pointerEvents: "none",
                zIndex: "100",
              }}
              alt="rain overlay"
            />
          )}
        </div>
      </div>
  
      <div className="post-and-textbox">
        <PostLayer className="post-layer" />
        <text className="svg-text">
          {formattedDate} 
        </text>
        <div className="textbox">
          {/* 제출 전일 때만 렌더링 */}
          {!submitted && (
            <>
            <div       
            onMouseEnter={() => setHoveredPost(true)}
            onMouseLeave={() => setHoveredPost(false)}>
              <PostSubmit handleSubmit={handlePostSubmit} />
              {(hoveredPost) && (
            <img
              src={goy}
              style={{
                position: "absolute",
                left: "38.5vw",
                top: "-4vh",
                pointerEvents: "none",
                zIndex: "100",
              }}
            />
          )}
            </div>
              <form ref={formRef} onSubmit={handlePostSubmit}>
                <img src={t} style={{ width: "45vw" }} alt="text decoration" />
                <textarea
                  value={text}
                  onChange={handleChange}
                  className="text-input"
                  placeholder="텍스트를 입력하세요..."
                />
              </form>
            </>
          )}
        </div>
      </div>

      {/* showGroup38 상태가 true면 Group38 이미지 렌더링 */}
      {showGroup38 && (
        <div className="group38-container">
          <img src={group38} alt="Group38" style={{position:"relative", left:"58vw", top:"80vh"}} onClick={handleGenerateAgain}/>
          <form ref={formRef} onSubmit={handlePostSubmit}>
            <img src={textsmall} style={{ width: "45vw" }} className="textsmall" />
            <textarea
                  value={tagGenInput}
                  onChange={handleTagGenTextChange}
                  className="text-small"
                  placeholder="검색"
                />
          </form>
          <img src={component3} style={{ width: "3vw", left: "91vw", top:"80vh" }} className="textsmall" />

          <img 
            src={check}
            alt="캔버스 이미지 전송" 
            style={{position: "absolute", left: "51vw", top: "80vh", cursor: "pointer"}} 
            onClick={handleCaptureAndSubmit} 
          />
          </div>
      )}
    </div>
  );
}

export default Post;
