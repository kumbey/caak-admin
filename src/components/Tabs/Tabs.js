import React, { useState, createRef } from "react";
import data from "./data";
import Label from "./Label";

const Tabs = ({ ...props }) => {
  const collapseRef = createRef();
  const [isOpen, setIsOpen] = React.useState(true);

  const [activeIndex, setActiveIndex] = useState(0);

  let tabs = data;

  const closeAnim = (collapse) => {
    collapse.style.overflowY = "hidden";
    collapse.style.height = collapse.scrollHeight + "px";

    collapse.style.transitionProperty = "height, opacity";
    collapse.style.transitionDuration = "300ms";
    collapse.style.transitionTimingFunction = "ease-in-out";
    setTimeout(() => {
      collapse.style.opacity = 0;
      collapse.style.height = 0;
    }, 0);

    setIsOpen(false);
  };

  const openAnim = (collapse) => {
    collapse.style.transitionProperty = "height, opacity";
    collapse.style.transitionDuration = "300ms";
    collapse.style.transitionTimingFunction = "ease-in-out";

    setTimeout(() => {
      collapse.style.height = collapse.scrollHeight + "px";
      collapse.style.opacity = 1;
    }, 400);

    setIsOpen(true);
  };

  const toggleCollapse = (collapse) => {
    closeAnim(collapse);

    setTimeout(() => {
      openAnim(collapse);
    }, 200);
  };

  return (
    <div className="lg:flex lg:-mx-4">
      <div className="lg:w-1/2 lg:px-4">
        <div className="card p-5">
          <h3>Tabs</h3>
          <div className="tabs">
            <nav className="tab-nav mt-5">
              {tabs.map((item, index) => {
                return (
                  <Label
                    toggleCollapse={toggleCollapse}
                    collapseRef={collapseRef}
                    activeIndex={activeIndex}
                    onClick={setActiveIndex}
                    key={index}
                    index={index}
                    label={item.label}
                  />
                );
              })}
            </nav>
            <div className="tab-content mt-5">
              <div
                ref={collapseRef}
                className={`collapse  ${isOpen ? "open" : ""}`}
              >
                <div className="border border-gray-300 dark:border-gray-900 rounded-xl mt-5 p-5">
                  {isOpen ? tabs[activeIndex].content : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
