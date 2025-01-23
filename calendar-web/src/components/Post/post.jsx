import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom";
import { format } from "date-fns";

import "../assets/styles.css";
import EmotionFace from "./EmotionFace";
import  postLayer  from "../assets/post.svg";
import textBox from "../assets/textBox.svg";
import { ReactComponent as PostLayer } from "../assets/post.svg";
import { ReactComponent as TextBox } from "../assets/textBox.svg";

import PostSubmit from "./postsubmit";

import backButton from "../assets/img/backButton.png"
import  Sun  from "../assets/img/Sun.png";
import  cloud  from "../assets/img/Cloud.png";
import  Rain  from "../assets/img/Rain.png";




function Post({ post }) {

  const currentDate = format(new Date(), "yyyy-MM-dd");
  const [text, setText] = useState('');
  const [userId, setUserId] = useState(''); // user_id 상태 추가
  const [message, setMessage] = useState('');
  const formRef = useRef(null); // form을 참조할 ref

  const handleChange = (e) => setText(e.target.value);
  const handleUserIdChange = (e) => setUserId(e.target.value); // user_id 상태 업데이트
  const handleReset = () => {
    setText('');
    setUserId(''); 
  };

  // 서버로 데이터 전송 (POST 요청)
  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 폼 제출 방지
    try {
      const response = await fetch(`http://127.0.0.1:5000/get/text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, content: text }), //user_id 추가
      });

      if (response.ok) {
        alert('서버에 전송 성공!');
        setText(''); // 성공적으로 전송 후 입력값 초기화
      } else {
        alert('서버 전송 실패. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('서버 전송 중 오류 발생:', error);
      alert('서버 전송 중 오류가 발생했습니다.');
    }
  };

  // 서버로부터 메시지 받아오기 (GET 요청)
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/send/text`);
        const data = await response.json();
        setMessage(data.message); // 받은 데이터의 메시지를 상태에 저장
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };
    fetchMessage();
  }, []); // 빈 배열로 useEffect가 컴포넌트 마운트 시 한 번만 실행됨
  
  
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
            <form>
              {/* user_id 추가 */}
              <input
              value={userId}
              onChange={handleUserIdChange} // user_id 입력 필드 핸들러
              className="user-id-input" // 디자인 필요함
              placeholder="User ID를 입력하세요..."
              />
            </form>
            <PostSubmit handleSubmit={handleSubmit} />
          

          
            <form ref={formRef} onSubmit={handleSubmit} className="text-box-form">
              <svg className="text-box-svg" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
              </svg>
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

