import React from "react";

const SlideItem = ({ data, show, margin }) => {
  return (
    <div
      className="glide__slide"
      style={{
        width: `calc(100% / ${show} - ${margin}px)`,
        marginRight: margin / 2,
        marginLeft: margin / 2,
      }}
    >
      <div className="border border-gray-300 dark:border-gray-900 rounded-lg px-4 py-8 text-center">
        <span
          className={`text-primary text-5xl leading-none ${data.icon}`}
        ></span>
        <p className="mt-2">{data.title}</p>
        <div className="text-primary mt-5 text-3xl leading-none">
          {data.text}
        </div>
      </div>
    </div>
  );
};
export default SlideItem;
