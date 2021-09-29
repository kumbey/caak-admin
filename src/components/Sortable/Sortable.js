import { useState, useEffect } from "react";

import data from "./sortData";

import List from "./List";
import "./styles.css";

const Sortable = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, []);

  const insertBefore = (id, idToInsert) => {
    if (id !== idToInsert) {
      let removed = null;
      let removedId = null;

      let newArr = items.reduce((arr, i) => {
        if (i.id.toString() === idToInsert) {
          removed = i;
          return arr;
        }
        if (i.id.toString() === id) {
          arr.push(null);
          removedId = arr.length - 1;
        }
        arr.push(i);
        return arr;
      }, []);

      newArr[removedId] = removed;

      setItems(newArr);
    }
  };

  const insertItem = (id, idToInsert, after) => {
    if (id !== idToInsert) {
      let removed = null;
      let removedId = null;

      let newArr = items.reduce((arr, i) => {
        if (i.id.toString() === idToInsert) {
          removed = i;
          return arr;
        }
        if (i.id.toString() === id) {
          if (after) {
            arr.push(i);
            arr.push(null);
            removedId = arr.length - 1;
          } else {
            arr.push(null);
            removedId = arr.length - 1;
            arr.push(i);
          }
        } else {
          arr.push(i);
        }
        return arr;
      }, []);

      newArr[removedId] = removed;

      setItems(newArr);
    }
  };

  return (
    <div className="lg:flex lg:-mx-4">
      <div className="lg:w-1/2 lg:px-4">
        <h1> Drag & Drop App </h1>
        <div className="card p-5">
          <h3>Style 1</h3>
          <div className="mt-5">
            <List
              insertItem={insertItem}
              insertBefore={insertBefore}
              items={items}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sortable;
