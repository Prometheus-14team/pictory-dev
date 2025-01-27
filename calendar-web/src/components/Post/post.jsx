/* Post 컴포넌트 */
import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom";

import "../assets/styles.css";
import EmotionFace from "./EmotionFace";
import  postLayer  from "../assets/post.svg";
import { ReactComponent as PostLayer } from "../assets/post.svg";

import PostSubmit from "./postsubmit";
import t from "../assets/img/Text.png";
import backButton from "../assets/img/backButton.png"
import  Sun  from "../assets/img/Sun.png";
import  cloud  from "../assets/img/Cloud.png";
import  Rain  from "../assets/img/Rain.png";


function Post({ 
  currentDate,
  text,
  userId,
  handleChange,
  handleUserIdChange,
  handleSubmit,
  formRef,
 }) {
  
  return (
    <div className="container">
      <div className="back">
        <Link to="/calendar">
          <img src={backButton} alt="backButton" className="back-img" />
        </Link>
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

