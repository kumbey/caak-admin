import { useState } from "react";
import CommentList from "../components/Dashboard/CommentList";
import UserList from "../components/Dashboard/UserList";

import ReportList from "../components/Dashboard/ReportList";
import PendingPostList from "../components/Dashboard/PendingPostList";
import FeedBackList from "../components/Dashboard/FeedBackList";
import GroupList from "../components/Dashboard/GroupList";
import PostsTab from "../components/Dashboard/PostsTab";

const HomePage = () => {
  const menus = [
    {
      id: 0,
      name: "Пост",
    },
    {
      id: 1,
      name: "Хүлээгдэж буй постууд",
    },
    {
      id: 2,
      name: "Сэтгэгдэлүүд",
    },
    {
      id: 3,
      name: "Хэрэглэгчид",
    },
    {
      id: 4,
      name: "Репортууд",
    },
    {
      id: 5,
      name: "Feedback",
    },
    {
      id: 6,
      name: "Грүпүүд",
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
              <h6 className="cursor-pointer truncate-2">{menu.name}</h6>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col">
        <div className="">
          {activeIndex === 0 ? "" : <h5>{menus[activeIndex].name}</h5>}
        </div>
        {activeIndex === 0 ? (
          <PostsTab PageSize={PageSize} />
        ) : activeIndex === 1 ? (
          <PendingPostList PageSize={PageSize} />
        ) : activeIndex === 2 ? (
          <CommentList PageSize={PageSize} />
        ) : activeIndex === 3 ? (
          <UserList PageSize={PageSize} />
        ) : activeIndex === 4 ? (
          <ReportList PageSize={PageSize} />
        ) : activeIndex === 5 ? (
          <FeedBackList PageSize={PageSize} />
        ) : activeIndex === 6 ? (
          <GroupList PageSize={PageSize} />
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
