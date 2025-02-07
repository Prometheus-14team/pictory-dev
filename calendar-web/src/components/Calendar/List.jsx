import React, { useState, useEffect } from "react";
import ListPost from "./ListPost"; // Post 컴포넌트 가져오기
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import "../assets/styles.css";
import group28 from "../assets/img/Group 28.png";

function List() {
  const [posts, setPosts] = useState([]); // API로 받은 데이터를 저장할 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    fetch("http://127.0.0.1:5000/GET/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "API 응답 내용");
        setPosts(data.all || []); // data.all이 undefined일 경우 빈 배열로 설정
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); 
      });
  }, []);

  return (
    <div className="sidebar">
      <div>
        <img src={group28} style={{ width: "7vw", height: "auto" }} />
      </div>
      {/* 로딩 상태 처리 */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        // posts가 배열일 경우 map을 실행
        Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
          <Link
            to={`/finalpost/${format(new Date(post.date), 'yyyy-MM-dd')}`} 
            key={post.id} 
          >
            <ListPost
              date={post.date}
              content={post.summarized_text_kr}
              image={post.image}
            />
            </Link>
          ))
        ) : (
          <p>No posts available</p>
        )
      )}
    </div>
  );
}

export default List;
