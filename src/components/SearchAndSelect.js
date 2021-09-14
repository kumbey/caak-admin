import Tippy from "@tippyjs/react";
// import { useState } from "react";

export default function SearchAndSelect() {
  // const [activeItem, setActiveItem] = useState();
  //
  // let filtered_arrays = {};
  // const remove_dupplicates_from_feedData = data.filter(
  //   (obj) =>
  //     !filtered_arrays[obj["parent"]] && (filtered_arrays[obj["parent"]] = true)
  // );
  return (
    <form className="search-select">
      <Tippy
        theme={"light-border"}
        offset={[0, 8]}
        maxWidth={"none"}
        interactive={true}
        trigger={"click"}
        arrow={false}
        allowHTML={true}
        animation={"shift-toward-extreme"}
        placement={"bottom-start"}
        content={
          <div className="search-select-menu">
            <h6 className="uppercase">Nepal</h6>
            <div className="item">Kathmandu</div>
            <div className="item active">Pokhara</div>
            <div className="item">Lumbini</div>
            <h6 className="uppercase">India</h6>
            <div className="item">Delhi</div>
            <div className="item">Mumbai</div>
            <div className="item">Karnataka</div>
          </div>
        }
      >
        <label
          className="form-control-addon-within flex-row-reverse"
          data-toggle="search-select"
        >
          <input
            type="text"
            className="form-control pl-2 border-none w-full"
            placeholder="SearchAndSelect"
          />
          <span className="flex items-center pl-4">
            <span className="badge badge_primary">
              Pokhara
              <button type="button" className="ml-1 la la-times" />
            </span>
          </span>
        </label>
      </Tippy>
    </form>
  );
}
