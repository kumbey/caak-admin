import React from "react";
import Breadcrumb from "./Breadcrumb";
import SearchInput from "./SearchInput";
import Tippy from "@tippyjs/react";

const Header = (props) => {
  return (
    <section className="breadcrumb lg:flex items-center">
      <Breadcrumb />

      {/*View Sort*/}
      <div className="lg:flex items-center ml-auto mt-5 lg:mt-0">
        <div className="flex mt-5 lg:mt-0">
          <div
            onClick={() =>
              props.setViewSortType
                ? props.setViewSortType("list")
                : console.log("List sorting working")
            }
            className="btn btn-icon btn-icon_large btn_outlined btn_primary cursor-pointer"
          >
            <span className="la la-bars" />
          </div>
          <div
            onClick={() =>
              props.setViewSortType
                ? props.setViewSortType("row")
                : console.log("Row sorting working")
            }
            className="btn btn-icon btn-icon_large btn_outlined btn_secondary ml-2 cursor-pointer"
          >
            <span className="la la-list" />
          </div>
          <div
            onClick={() =>
              props.setViewSortType
                ? props.setViewSortType("column")
                : console.log("Column sorting working")
            }
            className="btn btn-icon btn-icon_large btn_outlined btn_secondary ml-2 cursor-pointer"
          >
            <span className="la la-th-large" />
          </div>
        </div>

        {/*Search -->*/}
        <SearchInput />
        <div className="flex mt-5 lg:mt-0">
          {/*Sort By -->*/}
          <div className="dropdown lg:ml-2">
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
                  <a href="sda#">Ascending</a>
                  <a href="fafaas">Descending</a>
                </div>
              }
            >
              <button
                className="btn btn_outlined btn_secondary uppercase"
                data-toggle="dropdown-menu"
              >
                Sort By
                <span className="ml-3 la la-caret-down text-xl leading-none" />
              </button>
            </Tippy>
          </div>

          {/*Add New -->*/}
          <button className="btn btn_primary uppercase ml-2">Add New</button>
        </div>
      </div>
    </section>
  );
};

export default Header;
