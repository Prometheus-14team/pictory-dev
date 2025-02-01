//finalPost 페이지
import React from "react";
import FinalPostComponent from "../Post/finalPost";
import pictorysmall from "../assets/img/PICTORYsmall.png";
import cloud2 from "../assets/img/cloud2.png";
import Group13 from "../assets/img/Group 13.png";
import diary from "../assets/img/diary.png";
import smile from "../assets/img/smile.png";
import { Link } from 'react-router-dom';
import "../assets/styles.css";
import  Sun  from "../assets/img/Sun.png";
import  cloud  from "../assets/img/Cloud.png";
import  Rain  from "../assets/img/Rain.png";
import  neutral  from "../assets/img/NeutralFace.png";
import  smile2  from "../assets/img/SmilingFace.png";
import  sad  from "../assets/img/SadFace.png";

function FinalPost({currentDate}) {
    // 재생성 버튼 기능 추가
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
        <p className="di-text">
              {currentDate} 
          </p>
      <FinalPostComponent />
    </div>

  );
}

export default FinalPost;
