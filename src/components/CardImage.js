import React from "react";

const CardImage = (props) => {
  return (
    <div className="sm:w-1/2 xl:w-1/3 sm:px-4 sm:mt-0">
      <div className="card card_hoverable card_list">
        <div className="image">
          <img src={`../assets/images/${props.image}.jpg`} alt={""} />
        </div>
        <div className="body">
          <h5>{props.title}</h5>
          <p>December 15, 2019</p>
        </div>
        <div className="actions">
          <label className="custom-checkbox">
            <input type="checkbox" data-toggle="cardSelection" />
            <span />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CardImage;
