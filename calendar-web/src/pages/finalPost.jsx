//finalPost.jsx 페이지
import React, { useState, useEffect } from "react";
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
import {ko} from 'date-fns/locale';

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

      // 첫 접근 시에는 개별적으로 데이터를 가져옴 (uf문 없애면 POST시 undefined 됨. 그래서 있어야한다.)
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
  }, [date]);

  const fetchImage = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/GET/image/${date}`);
      console.log("Image Fetch Response:", response.status, response.ok);
  
      if (!response.ok) {
        throw new Error(`이미지 GET 요청 실패: Status ${response.status}`);
      }
  
      // 서버에서 직접 이미지 경로를 응답받는다고 가정
      const data = await response.json(); // JSON 형태로 응답을 받음
      console.log("서버에서 받은 이미지 경로:", data.image); // 예: "static/image/2025-03-12.png"
  
      // 경로를 그대로 사용
      setImageUrl(data.image);
  
      console.log("이미지 성공적으로 반영됨!");
    } catch (error) {
      console.error("이미지 가져오는 중 오류 발생:", error);
    }
  };
  
  const fetchAudio = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/GET/audio/${date}`);
      console.log("Audio Fetch Response:", response.status, response.ok);
  
      if (!response.ok) {
        throw new Error(`오디오 GET 요청 실패: Status ${response.status}`);
      }
  
      // 서버에서 JSON 응답을 받아 경로 추출
      const data = await response.json();
      console.log("서버에서 받은 오디오 경로:", data.audio); // 예: "static/audios/2025-03-12.wav"
  
      // 서버에서 받은 경로를 그대로 사용
      setAudioUrl(data.audio);
  
      console.log("오디오 성공적으로 반영됨!");
    } catch (error) {
      console.error("오디오 가져오는 중 오류 발생:", error);
    }
  };

  const fetchText = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/GET/text/${date}`);
      console.log("Text Fetch Response:", response.status, response.ok);
  
      if (!response.ok) {
        throw new Error(`텍스트 GET 요청 실패: Status ${response.status}`);
      }
  
      // 서버에서 받은 JSON 데이터를 그대로 사용
      const { raw_text } = await response.json();
      console.log("서버에서 받은 요약 텍스트:", raw_text);
  
      setText(raw_text || "");
  
      console.log("텍스트 성공적으로 반영됨!");
    } catch (error) {
      console.error("텍스트 가져오는 중 오류 발생:", error);
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
        setText(diaryData.raw_text || "");
      }

      console.log("Successfully fetched all data!");
    } catch (error) {
      console.error("Error fetching all data:", error);
    }
  };

  const PostAudio = async (date) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/POST/audio/${date}`, {
        method: "POST",
      });
  
      console.log("Audio POST Response:", response.status, response.ok);
  
      if (!response.ok) {
        throw new Error(`오디오 생성 실패: Status ${response.status}`);
      }
  
      const result = await response.json();
      console.log("POST Audio Result:", result);
  
      if (result.message === "success") {
        console.log(`${date} 오디오 생성 완료!`);
        alert("오디오가 성공적으로 생성되었습니다!");
      } else {
        throw new Error("서버에서 성공 메시지를 받지 못함");
      }
    } catch (error) {
      console.error("Error posting audio:", error);
      alert("오디오 생성 중 오류가 발생했습니다.");
    }
  };
  
  


  return (
    <div className="finalpost">
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
        <p className="di-text">
          {format(dateObject, 'yyyy년 MM월 dd일 eeee', {locale: ko})}
        </p>
        <img className="rectangle58" alt="Group" src={rectangle58} />
        <Link to={`/post/${format(dateObject, 'yyyy-MM-dd')}`}>
          <img className="write" alt="Group" src={write} /> 
        </Link>

        <Link 
          to={{
            pathname: `/post/${format(dateObject, 'yyyy-MM-dd')}`,
            state: { isPhotoButtonClicked: true } // state로 클릭 상태 전달
          }}
        >
          <img className="photo" alt="Group" src={photo} />
      </Link>
        
        <button onClick={() => PostAudio(date)}>
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


 
