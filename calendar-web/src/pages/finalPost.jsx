//finalPost.jsx 페이지
import React, { useState, useEffect, useRef } from "react";
import { format } from 'date-fns';
import pictorysmall from "../components/assets/img/PICTORYsmall.png";
import cloud2 from "../components/assets/img/cloud2.png";
import Group13 from "../components/assets/img/Group 13.png";
import diary from "../components/assets/img/diary.png";
import smile from "../components/assets/img/smile.png";
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
import { Link, useParams } from 'react-router-dom';


function FinalPost() {
  const [imageUrl, setImageUrl] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [text, setText] = useState("");
  const { date } = useParams(); // // URL에서 'date' 파라미터 받아오기
  const [dateObject, setDateObject] = useState(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true); // 첫 접근 여부를 확인

  
  useEffect(() => {
    if (date) {
      const dateObj = new Date(date);
      setDateObject(dateObj);
      console.log('변환된 Date 객체:', dateObj);

      // 첫 접근 시에는 개별적으로 데이터를 가져옴
      if (isFirstVisit) {
        fetchImage();
        fetchAudio();
        fetchText();
        setIsFirstVisit(false); // 첫 접근 완료 후 false로 설정
      } else {
        // 첫 접근이 아니면 /GET/all 요청을 보내 데이터 가져오기
        fetchAllData();
      }
    }
  }, [date, isFirstVisit]);

  const fetchImage = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/GET/image/${date}`);
      console.log("Image Fetch Response:", response.status, response.ok);

      if (!response.ok) {
        throw new Error(`이미지 GET요청: Image fetch failed with status: ${response.status}`);
      }

      const imageBlob = await response.blob();
      console.log("Image Blob:", imageBlob);

      const imageObjectURL = URL.createObjectURL(imageBlob);
      console.log("Generated Image URL:", imageObjectURL);
      setImageUrl(imageObjectURL);

      console.log("Successfully fetched the image!");
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const fetchAudio = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/GET/audio/${date}`);
      console.log("Audio Fetch Response:", response.status, response.ok);

      if (!response.ok) {
        throw new Error(`오디오 GET요청: Audio fetch failed with status: ${response.status}`);
      }

      const audioBlob = await response.blob();
      console.log("Audio Blob:", audioBlob);

      const audioObjectURL = URL.createObjectURL(audioBlob);
      console.log("Generated Audio URL:", audioObjectURL);
      setAudioUrl(audioObjectURL);

      console.log("Successfully fetched the audio!");
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };

  const fetchText = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/GET/text/${date}`);
      console.log("Text Fetch Response:", response.status, response.ok);

      if (!response.ok) {
        throw new Error(`텍스트 GET요청: Text fetch failed with status: ${response.status}`);
      }

      const textData = await response.json();
      console.log("Fetched Text Data:", textData);

      setText(textData.summarized_text_kr || "");

      console.log("Successfully fetched the text!");
    } catch (error) {
      console.error("Error fetching text:", error);
    }
  };

  const fetchAllData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/GET/all`);
      console.log("All Data Fetch Response:", response.status, response.ok);

      if (!response.ok) {
        throw new Error(`All data GET요청: Fetch failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched All Data:", data);

      // 첫 접근이 아니므로, 하나의 응답에서 모든 데이터를 처리합니다.
      const diaryData = data.all.find(diary => diary.date === date);
      if (diaryData) {
        setImageUrl(diaryData.image);
        setAudioUrl(diaryData.audio);
        setText(diaryData.summarized_text_kr || "");
      }

      console.log("Successfully fetched all data!");
    } catch (error) {
      console.error("Error fetching all data:", error);
    }
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
          {format(dateObject, 'yyyy-MM-dd')}
        </text>
        <img className="rectangle58" alt="Group" src={rectangle58} />
        <Link to={`/post/${format(dateObject, 'yyyy-MM-dd')}`}>
          <img className="write" alt="Group" src={write} /> 
        </Link>

        {/* 🔹 버튼 클릭 시 GET 요청 실행 */}
        <button onClick={fetchImage}>
          <img className="photo" alt="Group" src={photo} />
        </button>
        <button onClick={fetchAudio}>
          <img className="music" alt="Group" src={music} />
        </button>
          
         {/* 이미지 표시 */}
         {imageUrl && <img src={imageUrl} alt="Diary Image" className="diaryImage" />}

          {/* 오디오 자동 재생 */}
          {audioUrl && (
            <audio autoPlay controls>
              <source src={audioUrl} type="audio/wav" />
            
            </audio>
          )}
          <p>{text}</p> {/* 업데이트된 텍스트 표시 */}
      
    </div>

  );
}

export default FinalPost; 


 
