import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import { useEffect, useState } from "react";
import { getPostByStatus } from "../graphql-custom/post/queries";
import { listCommentsByStatus } from "../graphql-custom/comment/queries";
import { getReturnData } from "../utility/Util";
import DashList from "../components/Dashboard/DashList";
import CommentList from "../components/Dashboard/CommentList";
import UserList from "../components/Dashboard/UserList";
import { listUsersByStatus } from "../graphql-custom/user/queries";
import { listReportedPosts } from "../graphql-custom/report/queries";
import ReportList from "../components/Dashboard/ReportList";
import PendingPostList from "../components/Dashboard/PendingPostList";
import { listFeedBacks } from "../graphql-custom/feedback/queries";
import FeedBackList from "../components/Dashboard/FeedBackList";

const HomePage = () => {
  const menus = [
    {
      id: 0,
      name: "Постууд",
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
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [reportedPosts, setReportedPosts] = useState([]);
  const [feedBacks, setFeedBacks] = useState([]);

  const getAllPosts = async () => {
    try {
      let resp = await API.graphql({
        query: getPostByStatus,
        variables: {
          status: "CONFIRMED",
          sortDirection: "DESC",
        },
      });
      setPosts(getReturnData(resp).items);
      console.log(posts);
    } catch (ex) {
      console.log(ex);
    }
  };
  const getPendingPosts = async () => {
    try {
      let resp = await API.graphql({
        query: getPostByStatus,
        variables: {
          status: "PENDING",
          sortDirection: "DESC",
          limit: 500,
        },
      });
      setPendingPosts(getReturnData(resp).items);
      console.log(posts);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getAllComments = async () => {
    try {
      let resp = await API.graphql({
        query: listCommentsByStatus,
        variables: {
          status: "ACTIVE",
          sortDirection: "DESC",
        },
      });
      setComments(getReturnData(resp).items);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getAllUsers = async () => {
    try {
      const resp = await API.graphql({
        query: listUsersByStatus,
        variables: {
          status: "ACTIVE",
          sortDirection: "DESC",
        },
      });
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
  const getAllFeedBacks = async () => {
    try {
      const resp = await API.graphql(graphqlOperation(listFeedBacks));
      setFeedBacks(getReturnData(resp).items);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    getAllPosts();
    getPendingPosts();
    getAllComments();
    getAllUsers();
    getAllReportedPosts();
    getAllFeedBacks();
  }, []);

  return (
    <div style={{ marginTop: "100px", marginLeft: "30px" }}>
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
      <div className="flex flex-col">
        <div className="mb-4">
          <h1>{menus[activeIndex].name}</h1>
        </div>
        {activeIndex === 0 ? (
          <DashList posts={posts} />
        ) : activeIndex === 1 ? (
          <PendingPostList pendingPosts={pendingPosts} />
        ) : activeIndex === 2 ? (
          <CommentList comments={comments} />
        ) : activeIndex === 3 ? (
          <UserList users={users} />
        ) : activeIndex === 4 ? (
          <ReportList
            reportedPosts={reportedPosts}
            setReportedPosts={setReportedPosts}
          />
        ) : activeIndex === 5 ? (
          <FeedBackList feedBacks={feedBacks} />
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
