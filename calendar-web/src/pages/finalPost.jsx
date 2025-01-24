//finalPost 페이지
import React from "react";
import finalPostComponent from "../components/Post/finalPost";


import "../components/assets/styles.css";
import img from "../components/img";

function finalPost() {
    // 재생성 버튼 기능 추가
    // current date 기능
    // DB에서 가져올 것: content, 재생성
  return (
    <div>
      <finalPostComponent />
      <p>final post 페이지 랜더링</p>
    </div>

  );
}

export default finalPost;
