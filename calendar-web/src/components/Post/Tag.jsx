// Tag 컴포넌트
import React, { useState, useEffect } from "react"
import { ReactComponent as TagActive } from "../assets/tagActive.svg";
import "../assets/styles.css";


function Tag({ nouns }) {
    return (
      <div className="tag-container">
        
        {nouns.slice(0, 10).map((noun, index) => (
          <div key={index} className="tag-item">
            
            <TagActive className="tag" />
            
            <span className="noun-text">{noun}</span>
          </div>
        ))}
      </div>
    );
  }
  
  export default Tag;





// function Tag({ nouns }) {
//     return (
//       <div>
//         <TagActive className="tag" />
//         {/* 명사 리스트를 화면에 렌더링 */}
//         <div>
//           {nouns.length > 0 ? (
//             nouns.map((noun, index) => (
//               <span key={index} className="noun-tag">
//                 {noun}
//               </span>
//             ))
//           ) : (
//             <p>명사를 찾을 수 없습니다.</p>
//           )}
//         </div>
//       </div>
//     );
//   }
  
//   export default Tag;