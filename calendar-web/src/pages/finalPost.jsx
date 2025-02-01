import React from 'react';
import { format } from "date-fns";
import FinalPostComponent from "../components/Post/finalPost"; // Post.jsx 호출
import "../components/assets/styles.css";

function FinalPost({ currentDate }) {
    // 만약 currentDate가 전달되지 않으면, 날짜를 계산
    const formattedDate = currentDate || format(new Date(), "yyyy-MM-dd");

    return (
        <div>
            <FinalPostComponent currentDate={formattedDate} />
        </div>
    );
}

export default FinalPost;
