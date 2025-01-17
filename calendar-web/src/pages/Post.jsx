import React from 'react';
import { Link } from 'react-router-dom';
import PostComponent from "../components/Post/post";
import "../components/assets/styles.css";


function Post() {

    return(

        <div>
            Post page
            <PostComponent/>
        </div>
        
    );
}

export default Post;