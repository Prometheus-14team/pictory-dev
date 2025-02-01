/* Post page */
import React, { useState, useEffect, useRef } from 'react';
import { format } from "date-fns";
import PostComponent from "../components/Post/post"; // Post.jsx 호출
import TagComponent from "../components/Post/Tag"; // Post.jsx 호출
import "../components/assets/styles.css";


function Post() {
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const [text, setText] = useState('');
  const [nouns, setNouns] = useState([]); //빈 배열로 초기화
  const [isLoading, setIsLoading] = useState(false);
  const [isPostSubmitted, setIsPostSubmitted] = useState(false);
  const [canvasImages, setCanvasImages] = useState([]);
  const formRef = useRef(null); 
  const canvasRef = useRef(null);


  const handleChange = (e) => setText(e.target.value);
  const handleReset = () => {
    setText('');
    
  };

  // 서버로 데이터 전송 (POST 요청)
  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 폼 제출 방지
    try {
        const response = await fetch(`http://127.0.0.1:5000/POST/text/${currentDate}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw_text: text }), 
      });

      if (response.ok) {
        alert('서버에 전송 성공!');
        setText(''); 
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
      const currentDate = format(new Date(), "yyyy-MM-dd");
      const response = await fetch(`http://127.0.0.1:5000/GET/tag/${currentDate}`);
      if (response.ok) {
        const data = await response.json();
        const nounsWithImages = data.tag.map(([noun, ...imagePath]) => ({
          noun: noun,
          images: imagePath,
        }));  
        setNouns(nounsWithImages); 
        
      } else {
        console.error('명사 데이터를 가져오지 못했습니다.');
      }
    } catch (error) {
      console.error('명사 데이터 가져오기 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 이미지를 선택할 때마다 선택된 이미지 목록 업데이트
  const onImagesSelected = (imageUrl) => {
    setCanvasImages((prevImages) => [...prevImages, imageUrl]);
  }

  // 캔버스
  const drawCanvas = (imageUrl) => {
    const canvas = canvasRef.current;

    if(!canvas) {
      console.error("캔버스 not found");
      return;
    }

    
    const ctx = canvas.getContext("2d"); // 여기를 src위에다..
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화

    canvasImages.forEach((imageUrl, index) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const x = 50 + index* 220;
        const y = 50;
        const width = 200;
        const height = 200;
        ctx.drawImage(img, x, y, width, height);
      }
    })
  
  }; 

  // 캔버스가 업데이트될 때마다 그리기
  useEffect(() => {
    drawCanvas();
  }, [canvasImages]); // canvasImages가 변경될 때마다 호출
  
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
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        formRef={formRef}
      />
      {isLoading ? (
        <p>로딩중입니다~~~~~~~~~~~~~~~~~</p>
      ) : (
        <TagComponent nouns={nouns} onImagesSelected={onImagesSelected} />
      )}
      <canvas 
        ref={canvasRef} 
        width="895" 
        height="555" 
        style={{ position:"relative", left:"4.2vw", top:"-76vh"}} 
      />
    </div>
  );
}

export default Post;
