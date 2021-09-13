import React from "react";

const CardShowcase = () => {
  return (
    <div className="lg:flex lg:-mx-4 mt-5">
      <div className="lg:w-1/4 lg:px-4">
        <div className="card px-4 py-8 text-center">
          <span className="text-primary text-5xl leading-none la la-sun" />
          <p className="mt-2">Published Posts</p>
          <div className="text-primary mt-5 text-3xl leading-none">18</div>
        </div>
      </div>
    </div>
  );
};

export default CardShowcase;
