import React, { useState, useEffect } from "react";
import { ReactComponent as TagActive } from "../assets/tagActive.svg";
import { ReactComponent as TagHover } from "../assets/tagHover.svg";
import "../assets/styles.css";

function Tag({ nouns, onImagesSelected }) {
  const [hoveredNoun, setHoveredNoun] = useState(null);
  const [nounImages, setNounImages] = useState({});



  return (
    <div className="tag-container">
      {nouns.map((nounData, index) => (
        <div
          key={index}
          className="tag-item"
          onMouseEnter={() => setHoveredNoun(nounData.noun)}
          onMouseLeave={() => setHoveredNoun(null)}
        >
          {hoveredNoun === nounData.noun ? (
            <TagHover className="tag" /> 
          ) : (
            <TagActive className="tag" /> 
          )}
          <span className="noun-text">{nounData.noun}</span>
          {hoveredNoun === nounData.noun && nounData.images.length > 0 && (
            <div className="image-dropdown">
              {nounData.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={image} // 이미지 경로
                  alt={`${nounData.noun} ${image}`}
                  className="dropdown-image"
                  onClick={() => onImagesSelected(image)} 
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
