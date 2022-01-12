import { useState, useMemo, useEffect } from "react";

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

const PendingPostList = ({ pendingPosts }) => {
  const { user } = useUser();
  const [isShowModal, setIsShowModal] = useState(false);
  const [reports, setReports] = useState([]);

  const [editId, setEditId] = useState("init");

  const [type, setType] = useState({});
  const [currentIndex, setCurrentIndex] = useState("init");
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

  // useEffect(() => {
  //   setShowAlert(true);
  // }, [type]);

  return (
    <>
      <div className="mb-4">
        <Tables styles="hoverable table_bordered" fullWidth="w-full">
          <thead>
            <tr>
              <th className="text-left uppercase">NO</th>
              <th className="text-left uppercase">Пост</th>
              <th className="text-left uppercase">Групп</th>
              <th className="text-left uppercase">Нэмсэн хүн</th>
              <th className="text-left uppercase">Үүссэн огноо</th>
            </tr>
          </thead>
          <tbody>
            {pendingPosts.map((post, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td
                    onClick={() =>
                      window.open(
                        `https://www.beta.caak.mn/post/view/${post.id}`
                      )
                    }
                    className="flex items-center cursor-pointer break-all truncate-3 w-96"
                  >
                    <img
                      className="mr-2"
                      width="64"
                      height="64"
                      src={
                        post?.items?.items[0]?.file?.type?.startsWith("video")
                          ? placeholder
                          : post?.items?.items[0]?.file
                          ? getFileUrl(post.items.items[0].file)
                          : getGenderImage("default")
                      }
                      alt={post?.items?.items[0]?.file?.type}
                    />
                    {post.title}
                  </td>

                  <td>
                    <p
                      className="cursor-pointer"
                      onClick={() =>
                        window.open(
                          `https://www.beta.caak.mn/group/${post.group.id}`
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
                          `https://www.beta.caak.mn/user/${post.user.id}/profile`
                        )
                      }
                      className="cursor-pointer"
                    >
                      {post.user.nickname}
                    </p>
                  </td>
                  <td>{convertDateTime(post.createdAt)}</td>
                  <td className="flex my-4  border-none">
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
                      // onClick={() => postHandler(post, post.id, "ARCHIVED")}
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
        <ConfirmAlert
          show={showAlert}
          title={`${
            type.type === "CONFIRMED"
              ? "Та зөвшөөрөхдөө итгэлтэй байна уу?"
              : "Та устгахдаа итгэлтэй байна уу?"
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
