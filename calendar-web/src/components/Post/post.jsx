import React, { useState, useEffect } from "react"
import { format } from "date-fns";
import "../assets/styles.css";
import EmotionFace from "./EmotionFace";
import  postLayer  from "../assets/post.svg";
import  Sun  from "../assets/img/Sun.png";
import  cloud  from "../assets/img/Cloud.png";
import  Rain  from "../assets/img/Rain.png";




function Post({ post }) {

  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  // 텍스트 입력 값 변경 처리
  const handleChange = (e) => setText(e.target.value);

  // 입력 값 초기화 처리
  const handleReset = () => setText('');

  // 서버로 데이터 전송 (POST 요청)
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/get/text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: text }),
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

  // 서버로부터 메시지를 받아오기 (GET 요청)
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

    fetchMessage();  // 컴포넌트가 마운트될 때 데이터 요청
  }, []);  // 빈 배열로 useEffect가 컴포넌트 마운트 시 한 번만 실행됨

  return (
    <div>
       <img src={postLayer} alt="postInput" />
    </div>
  );
}


export default Post;