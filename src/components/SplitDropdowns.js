import React from "react"
import tippy from "tippy.js"

export default function SplitDropdowns(props) {
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
            <div className="btn-group">
                <button type="button" className={`btn btn_${props.style} uppercase`}>Split Dropdown</button>
                <button type="button" className={`btn btn_${props.style} uppercase`} data-toggle="dropdown-menu">
                    <span className="la la-caret-down text-xl leading-none"></span>
                </button>
            </div>
            <div className="dropdown-menu">
                <a href="#">Dropdown Action</a>
                <a href="#">Link</a>
                <hr/>
                <h6 className="uppercase">Header</h6>
                <a href="#">Something Else</a>
            </div>
        </div>
    )
}
