import API from "@aws-amplify/api";
import { useEffect, useState } from "react";
import { getPostByStatus } from "../graphql-custom/post/queries";
import { getCommentsByPost } from "../graphql-custom/comment/queries";
import { getReturnData } from "../utility/Util";
import DashList from "../components/Dashboard/DashList";
import CommentList from "../components/Dashboard/CommentList";
import UserList from "../components/Dashboard/UserList";

const HomePage = () => {
  const menus = [
    {
      id: 0,
      name: "Постууд",
    },
    {
      id: 1,
      name: "Сэтгэгдэлүүд",
    },
    {
      id: 2,
      name: "Хэрэглэгчид",
    },
    {
      id: 3,
      name: "Репортууд",
    },
  ];
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const getPostsByStatus = async () => {
    try {
      let resp = await API.graphql({
        query: getPostByStatus,
        sortDirection: "DESC",
        variables: {
          status: "CONFIRMED",
        },
      });

      resp = getReturnData(resp);
      setPosts(resp.items);
    } catch (ex) {
      console.log(ex);
    }
  };
  const getCommentsByPosts = async (postId) => {
    try {
      let resp = await API.graphql({
        query: getCommentsByPost,
        sortDirection: "DESC",
        variables: {
          post_id: postId,
        },
      });

      resp = getReturnData(resp);
      setComments(resp.items);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    getPostsByStatus();
    getCommentsByPosts();

    console.log(posts);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div style={{ marginTop: "100px", marginLeft: "30px" }}>
      <div
        className=" flex flex-col items-center w-full justify-between mx-7"
        style={{ width: "400px" }}
      >
        <div className="flex mb-10 ">
          {menus.map((menu, index) => {
            return (
              <div
                className="px-4 my-4 border-2  hover:bg-primary-200"
                key={index}
                onClick={() => setActiveIndex(index)}
              >
                <h4 className="cursor-pointer">{menu.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mb-4">
          <h1>{menus[activeIndex].name}</h1>
        </div>
        {activeIndex === 0 ? (
          <DashList posts={posts} />
        ) : activeIndex === 1 ? (
          <CommentList
            posts={posts}
            comments={comments}
            getCommentsByPosts={getCommentsByPosts}
          />
        ) : activeIndex === 2 ? (
          <UserList posts={posts} />
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
