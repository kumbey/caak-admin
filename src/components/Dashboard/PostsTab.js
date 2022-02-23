import { useState } from "react";
import DraftedPostList from "./DraftedPostList";
import PostList from "./PostList";

const PostsTab = ({ PageSize }) => {
  const menus = [
    {
      id: 0,
      name: "Бүх постууд",
    },
    {
      id: 1,
      name: "Ноорог постууд",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="flex  ">
        {menus.map((menu, index) => {
          return (
            <div
              className={`flex items-center px-4 mb-4 border-2 h-10   hover:bg-primary-200 ${
                activeIndex === index ? "bg-primary-300" : ""
              }`}
              key={index}
              onClick={() => setActiveIndex(index)}
            >
              <h6 className="cursor-pointer truncate-2">{menu.name}</h6>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col">
        <div className="mb-3">
          <h5>{menus[activeIndex].name}</h5>
        </div>
        {activeIndex === 0 ? (
          <PostList PageSize={PageSize} />
        ) : activeIndex === 1 ? (
          <DraftedPostList PageSize={PageSize} />
        ) : null}
      </div>
    </div>
  );
};

export default PostsTab;
