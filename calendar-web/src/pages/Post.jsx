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
  const [imgPos, setImgPos] = useState([]); // 이미지 위치 상태
  const [imgSize, setImgSize] = useState([]); // 이미지 크기 상태
  const [draggingImageIndex, setDraggingImageIndex] = useState(null); // 현재 드래그 중인 이미지
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); //드래그 시작 지점과 이미지의 현재 위치 사이의 차이를 저장하는 값
  const formRef = useRef(null); 
  const canvasRef = useRef(null);


  const handleChange = (e) => setText(e.target.value);
  const handleReset = () => {setText('');};


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

  // 이미지목록 업데이트
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
        
        const pos = imgPos[index] || { x, y }; 
        const size = imgSize[index] || { width, height };
        ctx.drawImage(img, pos.x, pos.y, size.width, size.height);
      }
    })
  
  }; 

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent || {}; //기본 객체로 대체
    

    // 클릭한 이미지 찾기 (역순 탐색: 가장 위의 이미지 먼저 선택)
    for (let i = canvasImages.length - 1; i >= 0; i--) {
      const { x, y } = imgPos[i];
      const { width, height } = imgSize[i];
  
      if (
        offsetX >= x && offsetX <= x + width &&
        offsetY >= y && offsetY <= y + height
      ) {
        setDraggingImageIndex(i); // 해당 이미지 선택
        setDragOffset({ x: offsetX - x, y: offsetY - y }); // 클릭 지점과 이미지 위치 차이 저장
        return;
      }
    }
  };
  
  const handleMouseMove = (e) => {
    if (draggingImageIndex !== null) {
      const { offsetX, offsetY } = e.nativeEvent;
      const newPos = {
        x: offsetX - dragOffset.x,
        y: offsetY - dragOffset.y,
      };
      
      const newImgPos = [...imgPos];
      newImgPos[draggingImageIndex] = newPos;
      setImgPos(newImgPos);
    }
  };
  
  const handleMouseUp = () => {
    setDraggingImageIndex(null);
  };
  
  const handleMouseWheel = (e) => {
    if (draggingImageIndex !== null) {
      const newSize = [...imgSize];
      const newWidth = newSize[draggingImageIndex].width + (e.deltaY < 0 ? 10 : -10);
      const newHeight = newSize[draggingImageIndex].height + (e.deltaY < 0 ? 10 : -10);
  
      newSize[draggingImageIndex] = {
        width: Math.max(30, newWidth), // 최소 크기 제한
        height: Math.max(30, newHeight),
      };
      setImgSize(newSize);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
      canvas.addEventListener("wheel", handleMouseWheel);
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
        canvas.removeEventListener("wheel", handleMouseWheel);
      }
    };
  }, [imgPos, imgSize, draggingImageIndex]);


  // 캔버스가 업데이트될 때마다
  useEffect(() => {
    drawCanvas();
  }, [imgPos, imgSize, canvasImages]); 
  
  // POST 요청 후에만
  useEffect(() => {
    if (isPostSubmitted) {
      fetchNouns();
      setIsPostSubmitted(false); 
    }
  }, [isPostSubmitted]); 
  
  

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
