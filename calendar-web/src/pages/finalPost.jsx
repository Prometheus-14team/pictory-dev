//finalPost 페이지
import React, { useState, useEffect } from "react";
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
import  rectangle58  from "../components/assets/img/Rectangle 58.png";
import  write  from "../components/assets/img/Group 53.png";
import  music  from "../components/assets/img/Group 54.png";
import  photo  from "../components/assets/img/Component 6.png";


function finalPost({currentDate}) {

  const [imageUrl, setImageUrl] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    // 페이지 로딩 시 자동으로 이미지와 오디오 요청하기
    fetchImage();
    fetchAudio();
  }, [currentDate]);

  const fetchImage = () => {
    fetch(`/GET/image/${currentDate}`)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Image not found");
        }
      })
      .then((imageBlob) => {
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImageUrl(imageObjectURL);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  };

  const fetchAudio = () => {
    fetch(`/GET/audio/${currentDate}`)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Audio not found");
        }
      })
      .then((audioBlob) => {
        const audioObjectURL = URL.createObjectURL(audioBlob);
        setAudioUrl(audioObjectURL);
      })
      .catch((error) => {
        console.error("Error fetching audio:", error);
      });
  };



  return (
    <div>
        <Link to="/calendar">
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
        <img className="rectangle58" alt="Group" src={rectangle58} />
        <Link to={`/post/${currentDate}`}>
          <img className="write" alt="Group" src={write} /> 
        </Link>
        <button onClick={fetchImage}><img className="photo" alt="Group" src={photo} /></button>
        <button onClick={fetchAudio}><img className="music" alt="Group" src={music} /></button>
        

      <finalPostComponent />
    </div>

  );
}

export default finalPost; 


 
  
// {/* 이미지를 보여주는 부분 */}
// {imageUrl && <img src={imageUrl} alt="Diary Image" className="diaryImage" />}
      
// {/* 오디오를 재생할 수 있는 부분 */}
// {audioUrl && (
//   <audio controls>
//     <source src={audioUrl} type="audio/mp3" />
//     Your browser does not support the audio element.
//   </audio>
// )} 

