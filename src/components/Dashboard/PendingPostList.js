import { useState, useMemo, useEffect } from "react";
import Loader from "../Loader";

import Tables from "../Tables";
import { getFileUrl, getGenderImage, getReturnData } from "../../utility/Util";
import placeholder from "./../../../src/assets/images/placeholder.png";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { useUser } from "../../context/userContext";
import { convertDateTime } from "../utils";
import { updateStatus } from "../../utility/ApiHelper";
import { updatePost } from "../../graphql-custom/post/mutation";
import ConfirmAlert from "../ConfirmAlert/ConfirmAlert";
import Pagination from "../Pagination/Pagination";
import { getPostByStatus } from "../../graphql-custom/post/queries";
import { useToast } from "../Toast/ToastProvider";

const PendingPostList = ({ PageSize }) => {
  const { addToast } = useToast();
  let count = 0;

  const [pendingPosts, setPendingPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState();

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    count = (currentPage - 1) * PageSize;

    return pendingPosts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pendingPosts]);

  const { user } = useUser();

  const [type, setType] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const getPendingPosts = async () => {
    setLoading(true);
    try {
      let resp = await API.graphql({
        query: getPostByStatus,
        variables: {
          status: "PENDING",
          sortDirection: "DESC",
        },
      });
      setPendingPosts(getReturnData(resp).items);
      setLoading(false);
    } catch (ex) {
      setLoading(false);

      console.log(ex);
    }
  };

  const postHandler = async (post, postId, status) => {
    try {
      const resp = await API.graphql(
        graphqlOperation(updatePost, {
          input: { id: postId, status: status, expectedVersion: post.version },
        })
      );
      setPendingPosts(
        pendingPosts.filter((post) => post.id !== resp.data.updatePost.id)
      );
      addToast({
        content: post.title,
        title: `Амжилттай ${
          status === "CONFIRMED" ? "зөвшөөрлөө" : "архивлалаа"
        }.`,
        autoClose: true,
        type: `${status == "CONFIRMED" ? "update" : "archived"}`,
      });
      setShowAlert(false);
    } catch (ex) {
      setShowAlert(false);

      if (
        ex.errors[0].errorType === "DynamoDB:ConditionalCheckFailedException"
      ) {
        updateStatus(post, user.sysUser.id, status);
      }
    }
  };
  useEffect(() => {
    getPendingPosts();
  }, []);
  return pendingPosts.length > 0 ? (
    <div className="mb-4">
      <Tables styles="hoverable table_bordered" fullWidth="w-full">
        <thead>
          <tr>
            <th className="text-left uppercase">NO</th>
            <th className="text-left uppercase w-96">Пост</th>
            <th className="text-left uppercase w-56">Групп</th>
            <th className="text-left uppercase w-40">Нэмсэн хүн</th>
            <th className="text-left uppercase w-36">Үүссэн огноо</th>
            <th className="text-left uppercase">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((post, index) => {
            count++;

            return (
              <tr key={index}>
                <td className="text-center">{count}</td>

                <td>
                  <div className="flex items-center">
                    <div
                      className="mr-2"
                      style={{ minWidth: "48px", minHeight: "48px" }}
                    >
                      <img
                        onClick={() =>
                          window.open(
                            `https://www.caak.mn/post/view/${post.id}`
                          )
                        }
                        className="cursor-pointer w-12 h-12 object-cover"
                        src={
                          post?.items?.items[0]?.file?.type?.startsWith("video")
                            ? placeholder
                            : post?.items?.items[0]?.file
                            ? getFileUrl(post.items.items[0].file)
                            : getGenderImage("default")
                        }
                        alt={post?.items?.items[0]?.file?.type}
                      />
                    </div>
                    <p
                      onClick={() =>
                        window.open(`https://www.caak.mn/post/view/${post.id}`)
                      }
                      className="cursor-pointer truncate-3"
                    >
                      {post.title}
                    </p>
                  </div>
                </td>

                <td>
                  <p
                    className="cursor-pointer truncate-2"
                    onClick={() =>
                      window.open(`https://www.caak.mn/group/${post.group.id}`)
                    }
                  >
                    {post.group.name}
                  </p>
                </td>
                <td>
                  <p
                    onClick={() =>
                      window.open(
                        `https://www.caak.mn/user/${post.user.id}/profile`
                      )
                    }
                    className="cursor-pointer truncate-3"
                  >
                    {post.user.nickname}
                  </p>
                </td>
                <td className="text-xs">{convertDateTime(post.createdAt)}</td>
                <td className="flex my-2 border-none">
                  <span
                    // onClick={() => postHandler(post, post.id, "CONFIRMED")}
                    onClick={() => {
                      setType({
                        post: post,
                        postId: post.id,
                        type: "CONFIRMED",
                      });
                      setShowAlert(true);
                    }}
                    className={"cursor-pointer "}
                  >
                    <i className="las la-check-circle text-2xl text-green" />
                  </span>
                  <span
                    onClick={() => {
                      setType({
                        post: post,
                        postId: post.id,
                        type: "ARCHIVED",
                      });
                      setShowAlert(true);
                    }}
                    className={"cursor-pointer"}
                  >
                    <i className="las la-trash-alt text-2xl text-red ml-4" />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Tables>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={pendingPosts.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <ConfirmAlert
        show={showAlert}
        title={`${
          type.type === "CONFIRMED"
            ? `Та зөвшөөрөхдөө итгэлтэй байна уу?`
            : "Та архивлахдаа итгэлтэй байна уу?"
        }`}
        onClose={() => setShowAlert(false)}
        onSubmit={() =>
          type.type === "CONFIRMED"
            ? postHandler(type.post, type.postId, "CONFIRMED")
            : postHandler(type.post, type.postId, "ARCHIVED")
        }
      />
    </div>
  ) : (
    <Loader
      containerClassName={"self-center w-full h-[20px]"}
      className={`bg-blue-500 ${loading ? "opacity-100" : "opacity-0"}`}
    />
  );
};

export default PendingPostList;
