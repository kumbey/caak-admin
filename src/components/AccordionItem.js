import {useEffect, useRef, useState} from "react";

const AccordionItem = ({ data, active, onToggle, clicked, index }) => {
  const { content, title } = data;
    const [rotate, setRotate] = useState('transform duration-200 ease')
    useEffect(()=> {
        setRotate(clicked === index ? 'transform duration-200 ease' : 'transform duration-200 ease rotate-180')
    }, [clicked, index])

  const contentEl = useRef(null);

  return (
    <li className={`accordion_item ${active ? "active" : ""}`}>
      <h5
        onClick={onToggle}
        className="border-t border-gray-300 dark:border-gray-900 p-5 active"
        data-toggle="collapse"
        data-target="#accordion"
      >
        {title}
        <span className={`${rotate} collapse-indicator la la-arrow-circle-down`} />
      </h5>
      <div
        ref={contentEl}
        id="accordion"
        className="answer_wrapper"
        style={
          active
            ? { height: contentEl.current.scrollHeight }
            : { height: "0px" }
        }
      >
        <div className="answer p-5 pt-0">{content}</div>
      </div>
    </li>
  );
};

export default AccordionItem;
