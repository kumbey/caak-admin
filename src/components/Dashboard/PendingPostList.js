import { useState, useMemo } from "react";

import Tables from "../Tables";
import { getFileUrl, getGenderImage } from "../../utility/Util";
import placeholder from "./../../../src/assets/images/placeholder.png";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { useUser } from "../../context/userContext";
import { convertDateTime } from "../utils";
import { updateStatus } from "../../utility/ApiHelper";
import { updatePost } from "../../graphql-custom/post/mutation";
import ConfirmAlert from "../ConfirmAlert/ConfirmAlert";
import Pagination from "../Pagination/Pagination";

const PendingPostList = ({ pendingPosts, PageSize }) => {
  let count = 0;

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    count = (currentPage - 1) * PageSize;

    return pendingPosts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const { user } = useUser();

  const [type, setType] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const postHandler = async (post, postId, status) => {
    try {
      await API.graphql(
        graphqlOperation(updatePost, {
          input: { id: postId, status: status, expectedVersion: post.version },
        })
      );
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

  return (
    <>
      <div className="mb-4">
        <Tables styles="hoverable table_bordered" fullWidth="w-full">
          <thead>
            <tr>
              <th className="text-left uppercase">NO</th>
              <th className="text-left uppercase w-96">Пост</th>
              <th className="text-left uppercase w-56">Групп</th>
              <th className="text-left uppercase w-40">Нэмсэн хүн</th>
              <th className="text-left uppercase w-36">Үүссэн огноо</th>
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
                      <img
                        onClick={() =>
                          window.open(
                            `https://www.caak.mn/post/view/${post.id}`
                          )
                        }
                        className="mr-2 cursor-pointer w-12 h-12 object-cover"
                        src={
                          post?.items?.items[0]?.file?.type?.startsWith("video")
                            ? placeholder
                            : post?.items?.items[0]?.file
                            ? getFileUrl(post.items.items[0].file)
                            : getGenderImage("default")
                        }
                        alt={post?.items?.items[0]?.file?.type}
                      />
                      <p className="cursor-pointer line-clamp">{post.title}</p>
                    </div>
                  </td>

                  <td>
                    <p
                      className="cursor-pointer line-clamp"
                      onClick={() =>
                        window.open(
                          `https://www.caak.mn/group/${post.group.id}`
                        )
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
                      className="cursor-pointer line-clamp"
                    >
                      {post.user.nickname}
                    </p>
                  </td>
                  <td className="text-xs">{convertDateTime(post.createdAt)}</td>
                  <td className="flex  border-none">
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
    </>
  );
};

export default PendingPostList;
