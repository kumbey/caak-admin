import React from "react";
import Tippy from "@tippyjs/react";

export default function SplitDropDown(props) {
  return (
    <div className="dropdown">
      <div className="btn-group">
        <button type="button" className={`btn btn_${props.style} uppercase`}>
          Split Dropdown
        </button>
        <Tippy
          theme={"light-border"}
          zIndex={25}
          offset={[0, 8]}
          arrow={false}
          interactive={true}
          allowHTML={true}
          animation={"shift-toward-extreme"}
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
            className={`btn btn_${props.style} uppercase`}
            data-toggle="dropdown-menu"
          >
            <span className="la la-caret-down text-xl leading-none" />
          </button>
        </Tippy>
      </div>
    </div>
  );
}
