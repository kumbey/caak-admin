import { useEffect, useState } from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

const ColorPicker = ({ setHex }) => {
  const [picker, setPicker] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });
  const [show, setShow] = useState(false);

  const styles = reactCSS({
    default: {
      color: {
        width: "30px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${picker.r}, ${picker.g}, ${picker.b}, ${picker.a})`,
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

  const componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  const handleClick = () => {
    setShow(!show);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (color) => {
    setPicker(color.rgb);
  };

  useEffect(() => {
    setHex(rgbToHex(picker.r, picker.g, picker.b));
  }, [picker]);

  return (
    <div className="flex items-center">
      <p className="mr-4">{rgbToHex(picker.r, picker.g, picker.b)}</p>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {show ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={picker} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
