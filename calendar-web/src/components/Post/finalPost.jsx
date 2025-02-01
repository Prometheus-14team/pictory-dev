//finalPost 페이지
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FinalPostComponent from "../Post/finalPost";

function FinalPost({currentDate}) {
    // 재생성 버튼 기능 추가
    // DB에서 가져올 것: content, 재생성
  return (
    <div>
      <FinalPostComponent />
    </div>

  );
}

export default FinalPost;
