import React, { useState } from "react";
import { Link } from "react-router-dom";
import FinalPostComponent from "./FinalPost";
import { format } from "date-fns";

function FinalPost({currentDate}) {
    // 재생성 버튼 기능 추가
    // DB에서 가져올 것: content, 재생성
    // const currentDate = format(new Date(), "yyyy-MM-dd");
  return (
    <div>
      <FinalPostComponent />
    </div>

  );
}

export default FinalPost;
