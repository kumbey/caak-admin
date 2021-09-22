import { useEffect, useState } from "react";
import { showActivePage } from "../assets/js/menu";
import { useTheme } from "../context/ThemeContext";
import MenuData from "./MenuData";

export default function MenuBar({ menuBarRef, menuItemsRef, setOverlay }) {
  const { menuStyle, menu, setMenu } = useTheme();
  const [selectedMenu, setSelectedMenu] = useState("");

  useEffect(() => {
    showActivePage();
  }, [menuBarRef]);

  useEffect(() => {
    if (selectedMenu) {
      setOverlay(true);
    } else {
      setOverlay(false);
    } // eslint-disable-next-line
  }, [selectedMenu]);

  const subMenuOpen = (e) => {
    setSelectedMenu(e);
    if (menu.wide) {
      setMenu({ ...menu, wide: false });
    }
  };
  return (
    <aside ref={menuBarRef} className={`menu-bar menu-sticky ${menuStyle}`}>
      <div ref={menuItemsRef} className="menu-items">
        <div className="menu-header hidden">
          <a href="#1" className="flex items-center mx-8 mt-8">
            <span className="avatar w-16 h-16">JD</span>
            <div className="ml-4 text-left text-gray-700 dark:text-gray-500">
              <h5>John Doe</h5>
              <p className="mt-2">Editor</p>
            </div>
          </a>
          <hr className="mx-8 my-4" />
        </div>

        {MenuData.map((data, index) => {
          return (
            <a
              key={index}
              href="#qwe"
              className="link"
              onClick={() => subMenuOpen(data.name)}
            >
              <span className={data.icon} />
              <span className="title">{data.name}</span>
            </a>
          );
        })}
      </div>
      {MenuData.map((data, i) => {
        return (
          <div
            key={i}
            className={`menu-detail ${
              (selectedMenu === data.name) & (data.sections !== null)
                ? "open"
                : ""
            }`}
          >
            {data.sections &&
              data.sections.map((section, i) => {
                return (
                  <div key={i} className="menu-detail-wrapper">
                    <h6 className="uppercase">{section.name}</h6>
                    {section.sub &&
                      section.sub.map((sub, i) => {
                        return (
                          <a key={i} href="#qwe">
                            <span className={sub.icon} />
                            {sub.name}
                          </a>
                        );
                      })}
                    <hr />
                  </div>
                );
              })}
          </div>
        );
      })}
    </aside>
  );
}
