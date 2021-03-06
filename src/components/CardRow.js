import React from "react";

const CardRow = () => {
  return (
    <div className="card card_row card_hoverable">
      <div className="image">
        <div className="aspect-w-4 aspect-h-3">
          <img src="../assets/images/potato.jpg" alt={""} />
        </div>
        <label className="custom-checkbox absolute top-0 left-0 mt-2 ml-2">
          <input type="checkbox" data-toggle="cardSelection" />
          <span />
        </label>
        <div className="badge badge_outlined badge_secondary uppercase absolute top-0 right-0 mt-2 mr-2">
          Draft
        </div>
      </div>
      <div className="header">
        <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
        <p>
          Nunc et tincidunt tortor. Integer pellentesque bibendum neque,
          ultricies semper neque vulputate congue. Nunc fringilla mi sed nisi
          finibus vulputate. Nunc eu risus velit.
        </p>
      </div>
      <div className="body">
        <h6 className="uppercase">Views</h6>
        <p>100</p>
        <h6 className="uppercase mt-4 lg:mt-auto">Date Created</h6>
        <p>December 15, 2019</p>
      </div>
      <div className="actions">
        <div className="dropdown -ml-3 lg:ml-auto">
          <button
            className="btn-icon text-gray-600 hover:text-primary"
            data-toggle="dropdown-menu"
          >
            <span className="la la-ellipsis-v text-4xl leading-none" />
          </button>
          <div className="dropdown-menu">
            <a href="fafa">Dropdown Action</a>
            <a href="fafa">Link</a>
            <hr />
            <a href="fafa">Something Else</a>
          </div>
        </div>
        <a
          href="#fafa"
          className="btn btn-icon btn_outlined btn_secondary mt-auto ml-auto lg:ml-0"
        >
          <span className="la la-pen-fancy" />
        </a>
        <a
          href="#fafa"
          className="btn btn-icon btn_outlined btn_danger lg:mt-2 ml-2 lg:ml-0"
        >
          <span className="la la-trash-alt" />
        </a>
      </div>
    </div>
  );
};

export default CardRow;
