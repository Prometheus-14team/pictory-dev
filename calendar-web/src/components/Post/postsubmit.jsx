// PostSubmit.jsx
import React from "react";
import { ReactComponent as SubmitButton } from "../assets/Submit.svg";

function postSubmit({ handleSubmit }) {
  const handleClick = (e) => {
    e.preventDefault();  // 기본 클릭 이벤트 방지
    handleSubmit(e);  // handleSubmit 호출
  };

  return (
    <div onClick={handleClick} style={{ display: "inline-block", cursor: "pointer" }}>
      <SubmitButton className="submit-button-svg" />
    </div>
  );
}

export default postSubmit;
