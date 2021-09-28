import React from "react";

const Dots = ({ filled, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: filled }}
      className="glide__bullet"
    ></button>
  );
};

export default Dots;
