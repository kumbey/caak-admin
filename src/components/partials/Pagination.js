import React from "react";
import Tippy from "@tippyjs/react";

export default function Pagination() {
  return (
    <div className="card lg:flex">
      <nav className="flex flex-wrap p-5">
        <a href="#1" className="btn mr-2 mb-2 lg:mb-0 btn_primary">
          First
        </a>
        <a href="#1" className="btn mr-2 mb-2 lg:mb-0 btn_primary">
          1
        </a>
        <a
          href="#1"
          className="btn mr-2 mb-2 lg:mb-0 btn_outlined btn_secondary"
        >
          2
        </a>
        <a
          href="#1"
          className="btn mr-2 mb-2 lg:mb-0 btn_outlined btn_secondary"
        >
          3
        </a>
        <a
          href="#1"
          className="btn mr-2 mb-2 lg:mb-0 btn_outlined btn_secondary"
        >
          4
        </a>
        <a
          href="#1"
          className="btn mr-2 mb-2 lg:mb-0 btn_outlined btn_secondary"
        >
          5
        </a>
        <a href="#1" className="btn mr-2 mb-2 lg:mb-0 btn_secondary">
          Last
        </a>
      </nav>
      <div className="flex items-center ml-auto p-5 border-t lg:border-t-0 border-gray-200 dark:border-gray-900">
        Displaying 1-5 of 100 items
      </div>
      <div className="flex items-center p-5 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-900">
        <span className="mr-2">Show</span>
        <div className="dropdown">
          <Tippy
            theme={"light-border"}
            zIndex={25}
            offset={[0, 8]}
            arrow={false}
            interactive={true}
            allowHTML={true}
            placement={"bottom-start"}
            animation={"shift-toward-extreme"}
            content={
              <div className="dropdown-menu">
                <a href="#1">5</a>
                <a href="#1">10</a>
                <a href="#1">15</a>
              </div>
            }
          >
            <button
              className="btn btn_outlined btn_secondary"
              data-toggle="dropdown-menu"
            >
              5
              <span className="ml-3 la la-caret-down text-xl leading-none" />
            </button>
          </Tippy>
        </div>
        <span className="ml-2">items</span>
      </div>
    </div>
  );
}
