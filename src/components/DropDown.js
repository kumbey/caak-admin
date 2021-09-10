import React from "react";
import Tippy from "@tippyjs/react";

export default function DropDown(props) {
  if (props.split) {
    return (
      <div className="dropdown">
        <div className="btn-group">
          <button
            type="button"
            className={`btn btn_${props.skin || "primary"} ${props.uppercase}`}
          >
            {props.children}
          </button>
          <Tippy
            theme={"light-border"}
            zIndex={25}
            offset={[0, 8]}
            arrow={false}
            interactive={true}
            allowHTML={true}
            animation={"shift-toward-extreme"}
            placement={props.dropDownPosition || "bottom-start"}
            content={
              <div className="dropdown-menu">
                <a href="fafa">Dropdown Action</a>
                <a href="fafa">Link</a>
                <hr />
                <h6 className="uppercase">Header</h6>
                <a href="fafa">Something Else</a>
              </div>
            }
          >
            <button
              type="button"
              className={`btn btn_${props.skin || "primary"} ${
                props.uppercase
              }`}
            >
              <span
                className={`${props.icon || "la la-caret-down"} leading-none ${
                  props.iconStyle
                }`}
              />
            </button>
          </Tippy>
        </div>
      </div>
    );
  }

  return (
    <div className="dropdown">
      <Tippy
        theme={"light-border"}
        placement={props.dropDownPosition || "bottom"}
        zIndex={25}
        offset={[0, 8]}
        arrow={false}
        interactive={true}
        allowHTML={true}
        animation={"shift-toward-extreme"}
        content={
          <div className="dropdown-menu">
            <a href="/">Dropdown Action</a>
            <a href="/">Link</a>
            <hr />
            <a href="/">Something Else</a>
          </div>
        }
      >
        <button
          className={`
                    btn
                    ${props.uppercase}
                    btn_${props.skin}
                `}
        >
          {props.children}
          <span
            className={`${props.icon || ""} "leading-none" ${props.iconStyle}`}
          />
        </button>
      </Tippy>
    </div>
  );
}
