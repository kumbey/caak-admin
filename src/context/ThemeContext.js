import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext();

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(`useTheme must be used within a ThemeProvider`);
  }

  return context;
};

function ThemeProvider(props) {
  const [theme, setTheme] = useState(
    localStorage.getItem("scheme") ? localStorage.getItem("scheme") : "light"
  );
  const [menu, setMenu] = useState(
    localStorage.getItem("menuType")
      ? JSON.parse(localStorage.getItem("menuType"))
      : {
          hidden: false,
          icons: false,
          wide: false,
        }
  );
  const [menuStyle, setMenuStyle] = useState("");

  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    localStorage.setItem("scheme", theme);
  }, [theme]);

  useEffect(() => {
    let style = "";

    if (menu.hidden) {
      style += "menu-hidden ";
    }

    if (menu.icons) {
      style += "menu-icon-only ";
    }

    if (menu.wide) {
      style += "menu-wide ";
    }

    setMenuStyle(style);
    localStorage.setItem("menuType", JSON.stringify(menu));
  }, [menu]);

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const toggleMenu = () => {
    setMenu({ ...menu, hidden: !menu.hidden });
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      changeTheme,
      menu,
      setMenu,
      toggleMenu,
      menuStyle,
      overlay,
      setOverlay,
    }),
    // eslint-disable-next-line
    [theme, menu, menuStyle, overlay]
  );
  return <ThemeContext.Provider value={value} {...props} />;
}

export { ThemeProvider, useTheme };
