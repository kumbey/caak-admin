import { useState } from "react";
import AccordionItem from "./AccordionItem";
const data = [
  { title: "Acc 1", content: "sndjhabdjshakd bsa dgsak dgsa dgshaj" },
  {
    title: "Acc 2",
    content:
      "sd bsa dgsak dgsa  ndjhabdjshakndjhabdjshakndjhabdjshakndjhabdjshakndjhabdjshakdgshaj",
  },
  {
    title: "Acc 3",
    content: "sndjhabdjshakd bsadgsha  dgsak dgsa  dgsak dgsa  dgsak dgsa j",
  },
];
const Accordion = () => {
  const [clicked, setClicked] = useState("0");

  const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked("0");
    }
    setClicked(index);
  };

  return (
    <ul className="accordion border border-gray-300 dark:border-gray-900 rounded-xl w-96">
      {data.map((data, index) => (
        <AccordionItem
          onToggle={() => handleToggle(index)}
          active={clicked === index}
          index={index}
          key={index}
          data={data}
          clicked={clicked}
        />
      ))}
    </ul>
  );
};

export default Accordion;
