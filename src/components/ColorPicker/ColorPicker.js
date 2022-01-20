import { useEffect, useState } from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

const ColorPicker = ({ name, setHex, hex }) => {
  const [picker, setPicker] = useState({
    color: {
      r: "0",
      g: "0",
      b: "0",
      a: "1",
    },
    hex: "#000000",
  });
  const [show, setShow] = useState(false);

  const styles = reactCSS({
    default: {
      color: {
        width: "30px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${picker.color.r}, ${picker.color.g}, ${picker.color.b}, ${picker.color.a})`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        bottom: "30px",
        right: "60px",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "-250px",
        left: "0px",
      },
    },
  });

  const handleClick = () => {
    setShow(!show);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (col) => {
    setPicker({ color: col.rgb, hex: col.hex });
    setHex({ ...hex, [name]: col.hex });
  };

  return (
    <div className="flex items-center">
      <p className="mr-4">{picker.hex}</p>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {show ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker
            name={name}
            color={picker.color}
            onChange={handleChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
