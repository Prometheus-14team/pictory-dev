import React, {useState, useEffect } from "react";
import "../assets/styles.css";
import { format } from "date-fns";
import group28 from "../assets/img/Group 28.png";

function ListPost({ date, content, image }) {

 
  return (
    <div className="overlap-group">
      <div className="over-text">{date}</div> 
      <p className="div">{content || "(쓸 내용 없음)"}</p>
      <div className="ellipse" /> 
      <div className="group-wrapper">
         {/* 이미지가 있을 경우에만 이미지 출력 */}
         {image ? (
          <img src={`http://127.0.0.1:5000${image}`} className="post-image" />
        ) : null}
      </div>
    </div>
  );
}

export default ListPost;

