import { useState, useEffect, createRef } from "react";

const Collapse = ({ children }, ...props) => {
  const collapseRef = createRef();
  const [isOpen, setIsOpen] = useState();
  useEffect(() => {
    if (props.open) {
      setIsOpen(true);
    }
  }, [props.open]);
  useEffect(() => {
    if (props.closeCollapse === true) {
      isOpen ? closeCollapse(collapseRef.current) : setIsOpen(false);
      props.setIsOpen(false);
    }
  }, [props.closeCollapse, collapseRef, props, isOpen]);

  const openCollapse = (collapse) => {
    collapse.style.transitionProperty = "height, opacity";
    collapse.style.transitionDuration = "200ms";
    collapse.style.transitionTimingFunction = "ease-in-out";

    setTimeout(() => {
      collapse.style.height = collapse.scrollHeight + "px";
      collapse.style.opacity = 1;
    }, 200);

    setIsOpen(true);
  };
  const closeCollapse = (collapse) => {
    collapse.style.overflowY = "hidden";
    collapse.style.height = collapse.scrollHeight + "px";

    collapse.style.transitionProperty = "height, opacity";
    collapse.style.transitionDuration = "200ms";
    collapse.style.transitionTimingFunction = "ease-in-out";

    setTimeout(() => {
      collapse.style.opacity = 0;
      collapse.style.height = 0;
    }, 200);

    setIsOpen(false);
    collapse.addEventListener(
      "transitionend",
      () => {
        collapse.classList.remove("open");

        collapse.style.removeProperty("overflow-y");
        collapse.style.removeProperty("height");
        collapse.style.removeProperty("opacity");

        collapse.style.removeProperty("transition-property");
        collapse.style.removeProperty("transition-duration");
        collapse.style.removeProperty("transition-timing-function");
      },
      { once: true }
    );
  };

  const toggleCollapse = (collapse) => {
    isOpen ? closeCollapse(collapse) : openCollapse(collapse);
  };
  return (
    <div>
      <button
        className="btn btn_primary uppercase"
        onClick={() => toggleCollapse(collapseRef.current)}
      >
        Toggle Collapse
      </button>
      <div
        ref={collapseRef}
        className={`collapse multiple-collapse ${props.open ? "open" : ""}`}
      >
        <div className="border border-gray-300 dark:border-gray-900 rounded-xl mt-5 p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Collapse;
