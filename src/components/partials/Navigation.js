import React from "react";
import MenuBar from "../MenuBar";
import TopBar from "../TopBar";

export default function Navigation() {
    const menuBarRef = React.createRef();
    const menuItemsRef = React.createRef();
    const darkModeRef = React.createRef()
    return (
        <React.Fragment>
            <TopBar darkModeRef={darkModeRef} menuBarRef={menuBarRef}/>
            <MenuBar menuBarRef={menuBarRef} menuItemsRef={menuItemsRef}/>
        </React.Fragment>
    );
}
