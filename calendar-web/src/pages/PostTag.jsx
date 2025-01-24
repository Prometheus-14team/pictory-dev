// Post 컴포넌트와 Tag 컴포넌트를 포함하는 페이지.jsx
import React, { useState, useEffect, useRef } from "react"
import PostComponent from "../components/Post/post";
import Tag from "../components/Post/Tag";
import img from "../components/img";

import "../components/assets/styles.css";


function PostTag({post}) {

    return(

        <div>
            <PostComponent />
            dddddddddf
            <Tag />
        </div>
        
    );
}

export default PostTag;