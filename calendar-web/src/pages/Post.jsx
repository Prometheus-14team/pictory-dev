/* Post page */
import React, { useState, useEffect, useRef } from 'react';
import { format } from "date-fns";
import PostComponent from "../components/Post/post"; // Post.jsx 호출
import TagComponent from "../components/Post/Tag"; // Post.jsx 호출
import "../components/assets/styles.css";


function Post() {
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const [text, setText] = useState('');
  const [userId, setUserId] = useState(''); // user_id 상태 추가
  const [nouns, setNouns] = useState([]); //빈 배열로 초기화
  const [isLoading, setIsLoading] = useState(false);
  const [isPostSubmitted, setIsPostSubmitted] = useState(false);
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
        body: JSON.stringify({ content: text }), 
      });

      if (response.ok) {
        alert('서버에 전송 성공!');
        setText(''); // 성공적으로 전송 후 입력값 초기화
        setIsPostSubmitted(true); 
      } else {
        alert('서버 전송 실패. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('서버 전송 중 오류 발생:', error);
      alert('서버 전송 중 오류가 발생했습니다.');
    }
  };

  // 명사 데이터를 서버에서 가져오기 (GET 요청)
  const fetchNouns = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/post/text`);
      if (response.ok) {
        const data = await response.json();
        setNouns(data.nouns || []); // 명사 리스트 가져오기
      } else {
        console.error('명사 데이터를 가져오지 못했습니다.');
      }
    } catch (error) {
      console.error('명사 데이터 가져오기 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // POST 요청 후에만 명사 데이터를 가져오기
  useEffect(() => {
    if (isPostSubmitted) {
      fetchNouns();
      setIsPostSubmitted(false); // 다시 초기화
    }
  }, [isPostSubmitted]); // POST 요청이 발생했을 때만 실행
  

  return (
    <div>
      <PostComponent
        currentDate={currentDate}
        text={text}
        handleChange={handleChange}
        handleUserIdChange={handleUserIdChange}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        formRef={formRef}
      />
      {isLoading ? (
        <p>로딩중입니다~~~~~~~~~~~~~~~~~</p>
      ) : (
        <TagComponent nouns={nouns} />
      )}
    </div>
  );
}

export default Post;
