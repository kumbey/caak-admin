import { useTheme } from "../context/ThemeContext";

const Container = ({ children, ...props }) => {
  const { theme, menuStyle, overlay } = useTheme();

  return (
    <div
      {...props}
      className={`${theme} ${menuStyle} ${overlay ? "overlay active" : ""}`}
      style={{ display: "flex" }}
    >
      {children}
    </div>
  );
};

export default Container;
