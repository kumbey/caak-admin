import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import { useEffect, useState } from "react";
import { getPostByStatus } from "../graphql-custom/post/queries";
import { listCommentsByStatus } from "../graphql-custom/comment/queries";
import { getReturnData } from "../utility/Util";
import CommentList from "../components/Dashboard/CommentList";
import UserList from "../components/Dashboard/UserList";
import { listUsersByStatus } from "../graphql-custom/user/queries";
import {
  ListReportedPostOrderByCreatedAt,
  listReportedPosts,
} from "../graphql-custom/report/queries";
import ReportList from "../components/Dashboard/ReportList";
import PendingPostList from "../components/Dashboard/PendingPostList";
import {
  listFeedBackOrderByCreatedAt,
  listFeedBacks,
} from "../graphql-custom/feedback/queries";
import FeedBackList from "../components/Dashboard/FeedBackList";
import GroupList from "../components/Dashboard/GroupList";
import { listGroups } from "../graphql-custom/group/queries";
import PostList from "../components/Dashboard/PostList";

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
    {
      id: 6,
      name: "Groups",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [reportedPosts, setReportedPosts] = useState([]);
  const [feedBacks, setFeedBacks] = useState([]);
  const [groups, setGroups] = useState([]);

  const PageSize = 10;

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
          limit: 5000,
        },
      });
      setPendingPosts(getReturnData(resp).items);
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
          limit: 5000,
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
          limit: 5000,
        },
      });
      setUsers(getReturnData(resp).items);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getAllReportedPosts = async () => {
    try {
      const resp = await API.graphql(
        graphqlOperation(ListReportedPostOrderByCreatedAt, {
          sortDirection: "DESC",
          typeName: "REPORTED_POST",
          limit: 5000,
        })
      );
      setReportedPosts(getReturnData(resp).items);
    } catch (ex) {
      console.log(ex);
    }
  };
  const getAllFeedBacks = async () => {
    try {
      const resp = await API.graphql(
        graphqlOperation(listFeedBackOrderByCreatedAt, {
          sortDirection: "DESC",
          typeName: "FEEDBACK",
          limit: 5000,
        })
      );
      setFeedBacks(getReturnData(resp).items);
    } catch (ex) {
      console.log(ex);
    }
  };
  const getAllGroups = async () => {
    try {
      const resp = await API.graphql(graphqlOperation(listGroups));
      setGroups(getReturnData(resp).items);
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
    getAllGroups();
  }, []);

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
        <div className="mb-3">
          <h5>{menus[activeIndex].name}</h5>
        </div>
        {activeIndex === 0 ? (
          <PostList posts={posts} PageSize={PageSize} />
        ) : activeIndex === 1 ? (
          <PendingPostList pendingPosts={pendingPosts} PageSize={PageSize} />
        ) : activeIndex === 2 ? (
          <CommentList comments={comments} PageSize={PageSize} />
        ) : activeIndex === 3 ? (
          <UserList users={users} PageSize={PageSize} />
        ) : activeIndex === 4 ? (
          <ReportList
            reportedPosts={reportedPosts}
            setReportedPosts={setReportedPosts}
            PageSize={PageSize}
          />
        ) : activeIndex === 5 ? (
          <FeedBackList feedBacks={feedBacks} PageSize={PageSize} />
        ) : activeIndex === 6 ? (
          <GroupList groups={groups} PageSize={PageSize} />
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
