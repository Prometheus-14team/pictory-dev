/* Post page */
import React, { useState, useEffect, useRef } from 'react';
import { format } from "date-fns";
import PostComponent from "../components/Post/post"; // Post.jsx 호출
import TagComponent from "../components/Post/Tag"; // Post.jsx 호출
import "../components/assets/styles.css";


function Post() {
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const [text, setText] = useState('');
  const [nouns, setNouns] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [isPostSubmitted, setIsPostSubmitted] = useState(false);
  const [canvasImages, setCanvasImages] = useState([]); 
  const [imgPos, setImgPos] = useState([]); 
  const [imgSize, setImgSize] = useState([]); 
  
  const formRef = useRef(null); 
  const canvasRef = useRef(null);

  let mouseDown = false;
  let draggingImageIndex = null;
  let dragOffset = { x: 0, y: 0 };

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
        const { x, y } = imgPos[index];
        const { width, height } = imgSize[index];
        ctx.drawImage(img, x, y, width, height); 
      };
    });
  };
  
  
  const onImagesSelected = (imageUrl) => {
    setCanvasImages((prev) => [...prev, imageUrl]);
    setImgPos((prev) => [...prev, { x: 50 + prev.length * 220, y: 50 }]);
    setImgSize((prev) => [...prev, { width: 200, height: 200 }]);
  };
  
  // 마우스 이벤트 핸들러
  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const canvas = canvasRef.current;
    const offset = { x: canvas.offsetLeft, y: canvas.offsetTop };
    const winScrollTop = window.scrollY;
    const startX = e.clientX - offset.x;
    const startY = e.clientY - offset.y + winScrollTop;

    for (let i = canvasImages.length - 1; i >= 0; i--) {
      const { x, y } = imgPos[i];
      const { width, height } = imgSize[i];

      if (startX >= x && startX <= x + width && startY >= y && startY <= y + height) {
        draggingImageIndex = i;
        dragOffset = { x: startX - x, y: startY - y };
        mouseDown = true;
        return;
      }
    }
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (mouseDown && draggingImageIndex !== null) {
      const canvas = canvasRef.current;
      const offset = { x: canvas.offsetLeft, y: canvas.offsetTop };
      const winScrollTop = window.scrollY;
      const mouseX = e.clientX - offset.x;
      const mouseY = e.clientY - offset.y + winScrollTop;

      setImgPos((prev) => {
        const newPos = [...prev];
        newPos[draggingImageIndex] = { x: mouseX - dragOffset.x, y: mouseY - dragOffset.y };
        return newPos;
      });

      drawCanvas();
    }
  };

  const handleMouseUp = () => {
    mouseDown = false;
    draggingImageIndex = null;
  };

  // 캔버스 이벤트 리스너 등록
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [canvasImages, imgPos, imgSize]);
    
  // 캔버스가 업데이트될 때마다
  useEffect(() => {
    drawCanvas();
  }, [canvasImages, imgPos, imgSize]); 
  
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
