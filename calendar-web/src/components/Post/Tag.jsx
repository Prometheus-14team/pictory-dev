// Tag 컴포넌트
import React, { useState, useEffect } from "react"
import { ReactComponent as TagActive } from "../assets/tagActive.svg";
import { ReactComponent as TagHover } from "../assets/tagHover.svg";
import "../assets/styles.css";

function Tag({ nouns, onImagesSelected }) {
  const [hoveredNoun, setHoveredNoun] = useState(null); // 현재 hover 중인 명사
  

  return (
    <div className="tag-container">
      {nouns.map(({ noun, images }, index) => (
        <div
          key={index}
          className="tag-item"
          onMouseEnter={() => setHoveredNoun(noun)}
          onMouseLeave={() => setHoveredNoun(null)}
        >
          {hoveredNoun === noun ? (
            <TagHover className="tag" /> // hover 시 이미지
          ) : (
            <TagActive className="tag" /> // 기본 이미지
          )}
          <span className="noun-text">{noun}</span>
          {hoveredNoun === noun && images.length > 0 && (
            <div className="image-dropdown">
              {images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={`http://localhost:5000/${image}`}
                  
                  className="dropdown-image"
                  onClick={() => onImagesSelected(`http://localhost:5000/${image}`)} // 이미지 선택 시 부모 컴포넌트에 전달
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Tag;


// function Tag({ nouns }) {
//     return (
//       <div className="tag-container">
        
//         {nouns.slice(0, 10).map((noun, index) => (
//           <div key={index} className="tag-item">
            
//             <TagActive className="tag" />
            
//             <span className="noun-text">{noun}</span>
//           </div>
//         ))}
//       </div>
//     );
//   }
  
//   export default Tag;