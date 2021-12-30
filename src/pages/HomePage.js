import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import { useEffect, useState } from "react";
import { getPostByStatus } from "../graphql-custom/post/queries";
import { listComments } from "../graphql-custom/comment/queries";
import { getReturnData } from "../utility/Util";
import DashList from "../components/Dashboard/DashList";
import CommentList from "../components/Dashboard/CommentList";
import UserList from "../components/Dashboard/UserList";
import { listUsers } from "../graphql-custom/user/queries";
import { listReportedPosts } from "../graphql-custom/report/queries";
import ReportList from "../components/Dashboard/ReportList";

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

  const [activeIndex, setActiveIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [reportedPosts, setReportedPosts] = useState([]);

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

  const getAllComments = async () => {
    try {
      const resp = await API.graphql(graphqlOperation(listComments));
      setComments(getReturnData(resp).items);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getAllUsers = async () => {
    try {
      const resp = await API.graphql(graphqlOperation(listUsers));
      setUsers(getReturnData(resp).items);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getAllReportedPosts = async () => {
    try {
      const resp = await API.graphql(graphqlOperation(listReportedPosts));
      setReportedPosts(getReturnData(resp).items);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    getPostsByStatus();
    getAllComments();
    getAllUsers();
    getAllReportedPosts();
  }, []);

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
                className={`flex items-center px-4 my-4 border-2 h-10   hover:bg-primary-200 ${
                  activeIndex === index ? "bg-primary-300" : ""
                }`}
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
          <CommentList comments={comments} />
        ) : activeIndex === 2 ? (
          <UserList users={users} />
        ) : activeIndex === 3 ? (
          <ReportList
            reportedPosts={reportedPosts}
            setReportedPosts={setReportedPosts}
          />
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
