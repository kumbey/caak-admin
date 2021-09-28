import { createRef, Fragment } from "react";
import MenuBar from "../MenuBar";
import TopBar from "../TopBar";

export default function Navigation() {
  const menuBarRef = createRef();
  const menuItemsRef = createRef();
  const darkModeRef = createRef();
  return (
    <Fragment>
      <TopBar darkModeRef={darkModeRef} menuBarRef={menuBarRef} />
      <MenuBar menuBarRef={menuBarRef} menuItemsRef={menuItemsRef} />
    </Fragment>
  );
}
