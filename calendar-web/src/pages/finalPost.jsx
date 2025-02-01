//finalPost 페이지
import React from "react";
import finalPostComponent from "../components/Post/finalPost";
import pictorysmall from "../components/assets/img/PICTORYsmall.png";
import cloud2 from "../components/assets/img/cloud2.png";
import Group13 from "../components/assets/img/Group 13.png";
import diary from "../components/assets/img/diary.png";
import smile from "../components/assets/img/smile.png";
import { Link } from 'react-router-dom';
import "../components/assets/styles.css";
import  Sun  from "../components/assets/img/Sun.png";
import  cloud  from "../components/assets/img/Cloud.png";
import  Rain  from "../components/assets/img/Rain.png";
import  neutral  from "../components/assets/img/NeutralFace.png";
import  smile2  from "../components/assets/img/SmilingFace.png";
import  sad  from "../components/assets/img/SadFace.png";

function finalPost({currentDate}) {
    // 재생성 버튼 기능 추가
    // current date 기능
    // DB에서 가져올 것: content, 재생성
  return (
    <div>
        <Link to="/post">
          <img className="postsmall" alt="Group" src={pictorysmall} />
        </Link>
        <img className="cloud2" alt="Group" src={cloud2} />
        <img className="Group13" alt="Group" src={Group13} />
        <img className="smile" alt="Group" src={smile} />
        <img className="diary" alt="Group" src={diary} />
        <div className="face2">
                  <img src={smile2} style={{ width: "2.5vw" }} />
                  <img src={neutral} style={{ width: "2.5vw" }} />
                  <img src={sad} style={{ width: "2.5vw" }} />
        </div>
        <div className="weather2">
                  <img src={Sun} style={{ width: "2.5vw" }} />
                  <img src={cloud} style={{ width: "2.5vw" }} />
                  <img src={Rain} style={{ width: "2.5vw" }} />
        </div>
        <text className="di-text">
              {currentDate} 
          </text>
      <finalPostComponent />
    </div>

  );
}

export default finalPost; 
