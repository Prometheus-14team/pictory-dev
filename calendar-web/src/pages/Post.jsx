//Post.jsx 페이지
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // 페이지 이동을 위해 추가
import { format } from "date-fns";
import PostComponent from "../components/Post/post"; 
import TagComponent from "../components/Post/Tag"; 
import FinalPost from "./finalPost";
import "../components/assets/styles.css";
import check from "../components/assets/img/check.png";


function Post() {
  const { date } = useParams(); // // URL에서 'date' 파라미터 받아오기
  const [dateObject, setDateObject] = useState(null);
  const [text, setText] = useState('');
  const [nouns, setNouns] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [isPostSubmitted, setIsPostSubmitted] = useState(false);
  const [canvasImages, setCanvasImages] = useState([]); 
  const [imgPos, setImgPos] = useState([]); 
  const [imgSize, setImgSize] = useState([]); 
  
  const formRef = useRef(null); 
  const canvasRef = useRef(null);

  const [draggingImageIndex, setDraggingImageIndex] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [mouseDown, setMouseDown] = useState(false);
  const [resizeMode, setResizeMode] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => setText(e.target.value);
  const handleReset = () => {setText('');};

  // 서버로 raw_text 데이터 전송 (POST 요청)
  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 폼 제출 방지
    try {
        const response = await fetch(`http://127.0.0.1:5000/POST/text/${date}`, {
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

  // 서버로 canvas 이미지 전송
  const handleCaptureAndSubmit = async () => {
    setIsLoading(true);  

    const canvas = canvasRef.current;
    if (!canvas) return;
  
    // 캔버스 이미지를 base64 포맷으로 캡처
    const imageData = canvas.toDataURL("sketches/png"); 
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/POST/image/${date}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageData, 
        }),
      });
  
      if (response.ok) {
        alert('이미지 전송 성공!');
        // 이미지 전송 후 finalPost 페이지로 이동
        setTimeout(() => {
          navigate(`/FinalPost/${date}`) 
        }, 1500);  
      } else {
        alert('이미지 전송 실패. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('서버 전송 중 오류 발생:', error);
      alert('서버 전송 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);  
    }
  };


  // 명사 데이터를 서버에서 가져오기 (GET 요청)
  const fetchNouns = async () => {
    setIsLoading(true);
    try {
      
      const response = await fetch(`http://127.0.0.1:5000/GET/tag/${date}`);
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

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvasImages.forEach((imageUrl, index) => {
      const { x, y } = imgPos[index];
      const { width, height } = imgSize[index];

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;

      img.onload = () => {
        ctx.drawImage(img, x, y, width, height);

        
        const handleSize = 10; 
        ctx.fillStyle = "red"; // 점선이나 canvas 캡쳐 시에는
        ctx.fillRect(x + width - handleSize, y + height - handleSize, handleSize, handleSize);
      };
      
      img.onerror = () => {
        console.error(`이미지 로드 실패: ${imageUrl}`);
      };

    });
  };

  const onImagesSelected = (imageUrl) => {
    setCanvasImages((prev) => [...prev, imageUrl]);
    setImgPos((prev) => [...prev, { x: 50 + prev.length * 220, y: 50 }]);
    setImgSize((prev) => [...prev, { width: 200, height: 200 }]);
  };

  // 크기 조절 핸들 드래그 시작
  const handleMouseDownResize = (e) => {
    const canvas = canvasRef.current;
    const offset = { x: canvas.offsetLeft, y: canvas.offsetTop };
    const startX = e.clientX - offset.x;
    const startY = e.clientY - offset.y;

    // 크기 조절 핸들 클릭 체크
    for (let i = canvasImages.length - 1; i >= 0; i--) {
      const { x, y } = imgPos[i];
      const { width, height } = imgSize[i];
      const handleSize = 10; // 핸들의 크기

      // 크기 조절 핸들이 클릭된 경우
      if (
        startX >= x + width - handleSize &&
        startX <= x + width &&
        startY >= y + height - handleSize &&
        startY <= y + height
      ) {
        setDraggingImageIndex(i);
        setResizeMode(true); // 크기 조절 모드 활성화
        setMouseDown(true);
        return;
      }
    }
  };

  // 크기 조절 핸들 드래그
  const handleMouseMoveResize = (e) => {
    if (mouseDown && draggingImageIndex !== null && resizeMode) {
      const canvas = canvasRef.current;
      const offset = { x: canvas.offsetLeft, y: canvas.offsetTop };
      const winScrollTop = window.scrollY;

      const mouseX = e.clientX - offset.x;
      const mouseY = e.clientY - offset.y + winScrollTop;

      const { x, y } = imgPos[draggingImageIndex];
      const width = mouseX - x;
      const height = mouseY - y;

      setImgSize((prev) =>
        prev.map((size, index) =>
          index === draggingImageIndex ? { width, height } : size
        )
      );
    }
  };

  // 위치 조정 (드래그 시작)
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const offset = { x: canvas.offsetLeft, y: canvas.offsetTop };
    const winScrollTop = window.scrollY;

    const startX = e.clientX - offset.x;
    const startY = e.clientY - offset.y + winScrollTop;

    for (let i = canvasImages.length - 1; i >= 0; i--) {
      const { x, y } = imgPos[i];
      const { width, height } = imgSize[i];

      if (startX >= x && startX <= x + width && startY >= y && startY <= y + height) {
        setDraggingImageIndex(i);
        setDragOffset({ x: startX - x, y: startY - y });
        setMouseDown(true);
        return;
      }
    }
  };

  // 위치 이동 (드래그)
  const handleMouseMove = (e) => {
    e.preventDefault();
    if (mouseDown && draggingImageIndex !== null && !resizeMode) {
      const canvas = canvasRef.current;
      const offset = { x: canvas.offsetLeft, y: canvas.offsetTop };
      const winScrollTop = window.scrollY;

      const mouseX = e.clientX - offset.x;
      const mouseY = e.clientY - offset.y + winScrollTop;

      const dx = mouseX - dragOffset.x;
      const dy = mouseY - dragOffset.y;

      setImgPos((prev) =>
        prev.map((pos, index) =>
          index === draggingImageIndex ? { x: dx, y: dy } : pos
        )
      );
    }
  };

  const handleMouseUp = () => {
    setMouseDown(false);
    setDraggingImageIndex(null);
    setResizeMode(false); // 크기 조절 모드 종료
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleMouseMoveResize);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleMouseMoveResize);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseDown, draggingImageIndex, resizeMode]);

  // 캔버스 이벤트 리스너 등록
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("mousedown", handleMouseDownResize);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMoveResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDownResize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMoveResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [canvasImages, imgPos, imgSize]);

  // 캔버스가 업데이트될 때마다
  useEffect(() => {
    drawCanvas();
  }, [canvasImages, imgPos, imgSize]);

  // 캔버스를 PNG로 다운로드
  const handleDownloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png"); 
      link.download = "canvas-image.png";
      link.click();
    } catch (error) {
      console.error("다운로드 오류:", error);
      alert("캔버스를 다운로드할 수 없습니다.");
    }
  };

  //뒤로 가기 시 기존 데이터 유지
  useEffect(() => {
    const savedText = sessionStorage.getItem(`textData-${date}`);
    const savedNouns = sessionStorage.getItem(`nounsData-${date}`);
   
    if (savedText) {
        setText(savedText);  // 저장된 텍스트가 있으면 상태를 업데이트
    } else {
        
        setText("");  
    }

    if (savedNouns) {
        setNouns(JSON.parse(savedNouns));  
    } else {
        setNouns([]);  
    }
}, []); 



  // POST 요청 후에만
  useEffect(() => {
    if (isPostSubmitted) {
      fetchNouns();
      setIsPostSubmitted(false); 
    
    // 세션에 날짜별로 데이터 저장
    sessionStorage.setItem(`textData-${date}`, text);  // 날짜별로 textData 저장
    sessionStorage.setItem(`nounsData-${date}`, JSON.stringify(nouns));  // 날짜별로 nounsData 저장
      
    }
  }, [isPostSubmitted]);

  useEffect(() => {
    //  console.log("현재 날짜:", date);
    if (date) {
     const dateObj = new Date(date);
     setDateObject(dateObj);
     console.log('변환된 Date 객체:', dateObj);
   }
 }, [date]);
 

  


  return (
    <div>
      <PostComponent
        currentDate={date}
        text={text}
        handleChange={(e) => setText(e.target.value)}
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
        height="447.5" 
        style={{ position:"absolute", left:"4.2vw", top:"22.3vh", border: "2px solid black" // 검은 테두리 추가
        }} 
      />
      
      <img 
        src={check}
        alt="캔버스 이미지 전송" 
        style={{position: "absolute", left: "51vw", top: "80vh", cursor: "pointer"}} 
        onClick={handleCaptureAndSubmit} 
      />
    </div>
  );
}

export default Post;
