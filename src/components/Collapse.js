import React from "react";

const Collapse = (props) => {
  const collapseRef = React.createRef();
  const [isOpen, setIsOpen] = React.useState();
  React.useEffect(() => {
    if (props.open) {
      setIsOpen(true);
    }
  }, [props.open]);
  React.useEffect(() => {
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          accusamus porro eos soluta! Debitis ab quis nam sed, dolorum dolore
          illum qui iure eius voluptatum nemo accusamus blanditiis neque id.
        </div>
      </div>
    </div>
  );
};

export default Collapse;
