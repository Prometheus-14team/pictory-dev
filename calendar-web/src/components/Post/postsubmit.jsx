// PostSubmit.jsx
import React from "react";
import { ReactComponent as SubmitButton } from "../assets/Submit.svg";

function postSubmit({ handleSubmit }) {
  return (
    <SubmitButton
      className="submit-button-svg"
      onClick={handleSubmit} // post.jsx 중복 코드 확인
    />
  );
}

export default postSubmit;
