import React from "react";

const CardIcon = (props) => {
  return (
    <div className="sm:w-1/2 xl:w-1/3 sm:px-4">
      <div className="card card_hoverable card_list">
        <div className="image image_icon">
          <span className={`la la-${props.icon || 'folder'} la-4x`} />
        </div>
        <div className="body">
          <h5>{props.title || "Here is Title"}</h5>
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

export default CardIcon;
