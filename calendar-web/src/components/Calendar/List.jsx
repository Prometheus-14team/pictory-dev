import React from "react";
import { posts } from "../Post/postDB"; // 데이터베이스에서 posts 가져오기
import ListPost from "./ListPost"; // Post 컴포넌트 가져오기
import "../assets/styles.css";
import group28 from "../assets/img/Group 28.png";

function List() {
  return (
    <div>
      <div style={{position:"absolute", left: "63vw", top: "6.5vh"}}>
        <img src={group28} style={{width:"7vw", height:"auto"}}/>
      </div>   
    <div className="sidebar">   
      {posts.map((post) => (
        <ListPost
          key={post.id}
          title={post.title}
          content={post.content || ""}
          image={post.image}
          date={post.date}
        />
      ))}
    </div></div>
  );
}

export default List;
