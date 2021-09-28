import { useState } from "react";
import Arrow from "./Arrow";
import Dots from "./Dots";
import datas from "./slideData";
import SlideItem from "./SlideItem";

import "./style.css";

const Carousel = ({ show }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);

  const len = datas.length;

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      nextSlide();
    }

    if (diff < -5) {
      prevSlide();
    }

    setTouchPosition(null);
  };

  const nextSlide = () => {
    if (currentIndex < datas.length - show) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };
  const handleDotClick = (i) => {
    setCurrentIndex(i);
  };

  let bullets = [];

  for (let i = 0; i <= len - show; i++) {
    bullets.push(<Dots key={i} onClick={() => handleDotClick(i)} />);
  }

  bullets[currentIndex] = (
    <Dots
      key={currentIndex}
      filled="rgba(20, 83, 136)"
      onClick={() => handleDotClick(currentIndex)}
    />
  );

  return (
    <div className="card p-5 carousel-container">
      <h3>Style 1</h3>
      <div className=" mt-5 carousel-wrapper">
        <div
          className=" carousel-content-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={"carousel-content"}
            style={{
              transform: `translateX(-${currentIndex * (100 / show)}%)`,
            }}
          >
            {datas.map((data, i) => {
              return <SlideItem key={data.id} data={data} show={show} />;
            })}
          </div>
          {currentIndex < datas.length - show && (
            <Arrow direction="right" handleClick={nextSlide} />
          )}
          {currentIndex > 0 && (
            <Arrow direction="left" handleClick={prevSlide} />
          )}
          <div style={{ textAlign: "center" }}>{bullets}</div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
