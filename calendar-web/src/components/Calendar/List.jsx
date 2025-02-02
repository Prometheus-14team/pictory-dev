import React, {useState, useEffect } from "react";
import ListPost from "./ListPost"; // Post 컴포넌트 가져오기
import "../assets/styles.css";
import group28 from "../assets/img/Group 28.png";

function List() {

  const [posts, setPosts] = useState([]); // API로 받은 데이터를 저장할 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

 
  useEffect(() => {
    fetch("http://127.0.0.1:5000/GET/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "useEffect에 출력!!!!!!!!!");
        setPosts(data.all); 
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); 
      });
  }, []);

  return (
    <div className="sidebar">
      <div style={{position:"absolute", top: "-13vh"}}>
        <img src={group28} style={{width:"7vw", height:"auto"}}/>
      </div>      
      {posts.map((post) => (
        <ListPost
          date={post.date}
          content={post.summarized_text || ""}
          image={post.image}
        />
      ))}
    </div>
  );
}

export default List;
