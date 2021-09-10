import React from "react"
import tippy from "tippy.js";
export default function TipOver(props) {
    React.useEffect(() => {
        tippy('[data-toggle="tooltip"]', {
            theme: "light-border tooltip",
            touch: ["hold", 500],
            offset: [0, 12],
            interactive: true,
            animation: "scale",
        });
    },[])
    return (
        <div>
            <button 
                type="button" 
                className={`
                    btn 
                    btn_${props.styles}
                    uppercase
                `} 
                data-toggle="tooltip"
                data-tippy-content="Content looks in hover" 
                data-tippy-placement={`${props.placement}`}
                >
                    Button
            </button>
        </div>
    )
}
