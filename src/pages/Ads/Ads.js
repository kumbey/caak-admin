import { useState } from "react";
import Banners from "./Banners/Banners";
import SponsoredPosts from "./Boosted/BoostedPost";

const Ads = () => {
  const menus = [
    {
      id: 0,
      name: "Бүүстэд пост",
    },
    {
      id: 1,
      name: "Баннер",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const PageSize = 10;

  return (
    <div style={{ marginTop: "80px", marginLeft: "30px" }}>
      <div className="flex  ">
        {menus.map((menu, index) => {
          return (
            <div
              className={`flex items-center px-4 my-4 border-2 h-10   hover:bg-primary-200 ${
                activeIndex === index ? "bg-primary-300" : ""
              }`}
              key={index}
              onClick={() => setActiveIndex(index)}
            >
              <h6 className="cursor-pointer">{menu.name}</h6>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center mr-3 mb-3">
          <h5>{menus[activeIndex].name}</h5>
          <div className="flex items-center ml-3">
            <div className="w-4 h-4 border border-gray-500 bg-white mr-2"></div>
            Идэвхтэй
            <div className="w-4 h-4 border border-gray-500 bg-red-50 ml-3 mr-2"></div>
            Идэвхгүй
          </div>
        </div>
        {activeIndex === 0 ? (
          <SponsoredPosts PageSize={PageSize} />
        ) : activeIndex === 1 ? (
          <Banners PageSize={PageSize} />
        ) : null}
      </div>
    </div>
  );
};

export default Ads;
