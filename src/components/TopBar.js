import React from "react";
import fullScreen from "../assets/js/full_screen";
import toggleDarkMode from "../assets/js/dark_mode";
import { toggleMenu } from "../assets/js/menu";
import Tippy from "@tippyjs/react";

export default function TopBar({ darkModeRef, menuBarRef }) {
  const scheme = localStorage.getItem("scheme");

  React.useEffect(() => {
    scheme && document.documentElement.classList.add(scheme);
    if (scheme === "dark") {
      darkModeRef.current.checked = "checked";
    }
  }, [darkModeRef, scheme]);
  return (
    <header className="top-bar">
      <button
        type="button"
        className="menu-toggler la la-bars"
        data-toggle="menu"
        onClick={() => toggleMenu(menuBarRef)}
      />

      <span className="brand">Yeti</span>

      <form className="hidden md:block ml-10" action="3">
        <label className="form-control-addon-within rounded-full">
          <input
            type="text"
            className="form-control border-none"
            placeholder="Search"
          />
          <button
            type="button"
            className="btn btn-link text-gray-300 dark:text-gray-700 hover:text-primary dark:hover:text-primary text-xl leading-none la la-search mr-4"
          />
        </label>
      </form>

      <div className="flex items-center ml-auto">
        <Tippy
          theme={"light-border tooltip"}
          touch={["hold", 500]}
          offset={[0, 12]}
          interactive={true}
          animation={"scale"}
          content={"Toggle Dark Mode"}
        >
          <label className="switch switch_outlined">
            <input
              id="darkModeToggler"
              ref={darkModeRef}
              onClick={() => toggleDarkMode(darkModeRef)}
              type="checkbox"
            />
            <span />
          </label>
        </Tippy>
        <Tippy
          theme={"light-border tooltip"}
          touch={["hold", 500]}
          offset={[0, 12]}
          interactive={true}
          animation={"scale"}
          content={"Toggle Full Screen"}
        >
          <button
            id="fullScreenToggler"
            type="button"
            className="hidden lg:inline-block btn-link ml-3 px-2 text-2xl leading-none la la-expand-arrows-alt"
            onClick={() => fullScreen()}
          />
        </Tippy>
        <div className="dropdown self-stretch">
          <Tippy
            theme={"light-border"}
            zIndex={25}
            offset={[0, 8]}
            arrow={true}
            interactive={true}
            allowHTML={true}
            animation={"shift-toward-extreme"}
            content={
              <div className="custom-dropdown-menu p-5 text-center">
                <div className="flex justify-around">
                  <a
                    href="1"
                    className="p-5 flex items-center flex items-center text-gray-700 dark:text-gray-500 hover:text-primary dark:hover:text-primary"
                  >
                    <span className="block la la-cog text-5xl leading-none justify-center items-center" />
                    <span>Settings</span>
                  </a>
                  <a
                    href="2"
                    className="p-5 flex items-center text-gray-700 dark:text-gray-500 hover:text-primary dark:hover:text-primary"
                  >
                    <span className="block la la-users text-5xl leading-none" />
                    <span>Users</span>
                  </a>
                </div>
                <div className="flex justify-around">
                  <a
                    href="3"
                    className="p-5 flex items-center text-gray-700 dark:text-gray-500 hover:text-primary dark:hover:text-primary"
                  >
                    <span className="block la la-book text-5xl leading-none" />
                    <span>Docs</span>
                  </a>
                  <a
                    href="3"
                    className="p-5 flex items-center text-gray-700 dark:text-gray-500 hover:text-primary dark:hover:text-primary"
                  >
                    <span className="block la la-dollar text-5xl leading-none" />
                    <span>Shop</span>
                  </a>
                </div>
              </div>
            }
          >
            <button
              type="button"
              className="flex items-center h-full btn-link ml-4 lg:ml-1 px-2 text-2xl leading-none la la-box"
              data-toggle="custom-dropdown-menu"
              data-tippy-arrow="true"
              data-tippy-placement="bottom"
            />
          </Tippy>
        </div>

        <div className="dropdown self-stretch">
          <Tippy
            theme={"light-border"}
            zIndex={25}
            offset={[0, 8]}
            arrow={true}
            interactive={true}
            allowHTML={true}
            placement={"bottom-start"}
            animation={"shift-toward-extreme"}
            content={
              <div className="custom-dropdown-menu">
                <div className="flex items-center px-5 py-2">
                  <h5 className="mb-0 uppercase">Notifications</h5>
                  <button className="btn btn_outlined btn_warning uppercase ml-auto">
                    Clear All
                  </button>
                </div>
                <hr />
                <div className="p-5 hover:bg-primary-100 dark:hover:bg-primary-900">
                  <a href="3">
                    <h6 className="uppercase">Heading One</h6>
                  </a>
                  <p>Lorem ipsum dolor, sit amet consectetur.</p>
                  <small>Today</small>
                </div>
                <hr />
                <div className="p-5 hover:bg-primary-100 dark:hover:bg-primary-900">
                  <a href="3">
                    <h6 className="uppercase">Heading Two</h6>
                  </a>
                  <p>Mollitia sequi dolor architecto aut deserunt.</p>
                  <small>Yesterday</small>
                </div>
                <hr />
                <div className="p-5 hover:bg-primary-100 dark:hover:bg-primary-900">
                  <a href="3">
                    <h6 className="uppercase">Heading Three</h6>
                  </a>
                  <p>Nobis reprehenderit sed quos deserunt</p>
                  <small>Last Week</small>
                </div>
              </div>
            }
          >
            <button
              type="button"
              className="relative flex items-center h-full btn-link ml-1 px-2 text-2xl leading-none la la-bell"
              data-toggle="custom-dropdown-menu"
              data-tippy-arrow="true"
              data-tippy-placement="bottom-end"
            >
              <span className="absolute top-0 right-0 rounded-full border border-primary -mt-1 -mr-1 px-2 leading-tight text-xs font-body text-primary">
                3
              </span>
            </button>
          </Tippy>
        </div>

        <div className="dropdown">
          <Tippy
            theme={"light-border"}
            zIndex={25}
            offset={[0, 8]}
            arrow={true}
            interactive={true}
            allowHTML={true}
            placement={"bottom-start"}
            animation={"shift-toward-extreme"}
            content={
              <div className="custom-dropdown-menu w-64">
                <div className="p-5">
                  <h5 className="uppercase">John Doe</h5>
                  <p>Editor</p>
                </div>
                <hr />
                <div className="p-5">
                  <a
                    href="3"
                    className="flex items-center text-gray-700 dark:text-gray-500 hover:text-primary dark:hover:text-primary"
                  >
                    <span className="la la-user-circle text-2xl leading-none mr-2" />
                    View Profile
                  </a>
                  <a
                    href="3sda"
                    className="flex items-center text-gray-700 dark:text-gray-500 hover:text-primary dark:hover:text-primary mt-5"
                  >
                    <span className="la la-key text-2xl leading-none mr-2" />
                    Change Password
                  </a>
                </div>
                <hr />
                <div className="p-5">
                  <a
                    href="3"
                    className="flex items-center text-gray-700 dark:text-gray-500 hover:text-primary dark:hover:text-primary"
                  >
                    <span className="la la-power-off text-2xl leading-none mr-2" />
                    Logout
                  </a>
                </div>
              </div>
            }
          >
            <button
              className="flex items-center ml-4 text-gray-700"
              data-toggle="custom-dropdown-menu"
              data-tippy-arrow="true"
              data-tippy-placement="bottom-end"
            >
              <span className="avatar">JD</span>
            </button>
          </Tippy>
        </div>
      </div>
    </header>
  );
}
