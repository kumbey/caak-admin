import React from "react"
import tippy from "tippy.js";
export default function Popover(props) {
    React.useEffect(() => {
        tippy('[data-toggle="popover"]', {
            theme: "light-border popover",
            offset: [0, 12],
            interactive: true,
            allowHTML: true,
            trigger: "click",
            animation: "shift-toward-extreme",
            content: (reference) => {
              const title = reference.dataset.popoverTitle;
              const content = reference.dataset.popoverContent;
              const popover =
                "<h5>" + title + "</h5>" + '<div class="mt-5">' + content + "</div>";
              return popover;
            },
          });
    },[])
    return (
        <div>
        <button type="button" className={`btn btn_${props.style} uppercase`} data-toggle="popover"
            data-popover-title="Popover Title"
            data-popover-content="Here’s some amazing content. It’s very engaging. Right?"
            data-tippy-placement={`${props.placement}`}>Toggle Popover</button>
    </div>
    )
}
