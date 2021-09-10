import React from "react";
import tippy from "tippy.js";

export default function Dropdowns(props) {
    
    React.useEffect(()=> {
        tippy ('[data-toggle="dropdown-menu"]', {
            theme: "light-border",
            zIndex: 25,
            offset: [0, 8],
            arrow: false,
            placement: "bottom-start",
            interactive: true,
            allowHTML: true,
            animation: "shift-toward-extreme",
            content: (reference) => {
                let dropdownMenu = reference
                    .closest(".dropdown")
                    .querySelector(".dropdown-menu");
                dropdownMenu = dropdownMenu.outerHTML;
                return dropdownMenu;
            },
        });
    },[])
    
    return (
        <div className="dropdown">
            <button 
                className={`
                    btn
                    uppercase
                    btn_${props.style}
                `} 
                data-toggle="dropdown-menu" 
            >
                Dropdown
                <span className="la la-caret-down text-xl leading-none"></span>
            </button>
            <div className="dropdown-menu">
                <a href="/">Dropdown Action</a>
                <a href="/">Link</a>
                <hr/>
                <a href="/">Something Else</a>
            </div>
        </div>
    )
}
