import React from "react";

const Arrow = ({ direction, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className={`glide__arrow ${
        direction === "right" ? "glide__arrow--right" : "glide__arrow--left"
      }`}
    >
      <span
        className={`la ${
          direction === "right" ? "la-arrow-right" : "la-arrow-left"
        }`}
      ></span>
    </button>
  );
};

export default Arrow;
