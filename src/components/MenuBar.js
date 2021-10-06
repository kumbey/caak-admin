import { useEffect, useState } from "react";
import { showActivePage } from "../assets/js/menu";
import { useTheme } from "../context/ThemeContext";
import MenuData from "./MenuData";
import { Link } from "react-router-dom";

export default function MenuBar({ menuBarRef, menuItemsRef }) {
  const { menuStyle, menu, setMenu } = useTheme();
  const [selectedMenu, setSelectedMenu] = useState("");

  useEffect(() => {
    showActivePage();
  }, [menuBarRef]);

  const subMenuOpen = (name) => {
    setSelectedMenu(name);
    if (menu.wide) {
      setMenu({ ...menu, wide: false });
    }
  };
  //TODO MenuBar Sticky not working
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
            <Link
              to={data.path}
              key={index}
              className="link cursor-pointer"
              onClick={() => subMenuOpen(data.name)}
            >
              <span className={data.icon} />
              <span className="title">{data.name}</span>
            </Link>
          );
        })}
      </div>
      {MenuData.map((data, i) => {
        return (
          <div
            key={i}
            className={`menu-detail ${
              selectedMenu === data.name && data.sections !== null ? "open" : ""
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
                          <a key={i} href="#">
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
