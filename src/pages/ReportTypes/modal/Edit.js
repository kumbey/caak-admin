import { useState } from "react";
import Modal from "../../../components/Modal";

import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { createPostStatusHistory } from "../../../graphql-custom/postHistory/mutation";

import { updatePost } from "../../../graphql-custom/post/mutation";
import { getReturnData } from "../../../utility/Util";
import { updateReportedPost } from "../../../graphql-custom/report/mutation";

const Edit = ({ show, setIsShowModal, addToast, currPost }) => {
  const [loading, setLoading] = useState();
  const [denyReason, setDenyReason] = useState();

  const postHandler = async (e) => {
    e.preventDefault();
    let id = currPost.post.id;
    let status = "REPORTED";
    setLoading(true);
    try {
      let resp = await API.graphql(
        graphqlOperation(updatePost, {
          input: { id, status, expectedVersion: currPost.post.version },
        })
      );
      resp = getReturnData(resp);

      await API.graphql(
        graphqlOperation(createPostStatusHistory, {
          input: {
            description: denyReason ? denyReason : currPost.reason,
            post_id: id,
            status: "REPORTED",
          },
        })
      );

      await API.graphql(
        graphqlOperation(updateReportedPost, {
          input: { id: currPost.id, status: "CHECKED" },
        })
      );

      addToast({
        content: currPost.post.title,
        title: `Амжилттай репортоллоо`,
        autoClose: true,
        type: `update`,
      });

      setLoading(false);
      setIsShowModal(false);
      setDenyReason("");
    } catch (ex) {
      setLoading(false);
      setIsShowModal(false);

      console.log(ex);
    }
  };

  const cancelReport = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await API.graphql(
        graphqlOperation(updateReportedPost, {
          input: { id: currPost.id, status: "CANCEL" },
        })
      );

      addToast({
        content: currPost.post.title,
        title: `Амжилттай татгалзлаа`,
        autoClose: true,
        type: `update`,
      });

      setLoading(false);
      setIsShowModal(false);
      setDenyReason("");
    } catch (ex) {
      setLoading(false);
      setIsShowModal(false);

      console.log(ex);
    }
  };

  return (
    <Modal
      show={show}
      title={"Репортлох"}
      content="content"
      onClose={() => {
        setIsShowModal(false);
        setDenyReason("");
      }}
      onCancel={(e) => {
        setIsShowModal(false);
        setDenyReason("");
        cancelReport(e);
      }}
      onSubmit={(e) => postHandler(e)}
      type="submit"
      loading={loading}
      isValid={true}
      submitBtnName={"Зөвшөөрөх"}
      cancelBtnName={"Татгалзах"}
    >
      <p className="font-semibold truncate-2 w-64">{currPost?.post?.title}</p>
      <p className=" truncate-2 w-64">Шалтгаан: {currPost.reason}</p>
      <div className="mt-8 max-w-md">
        <textarea
          defaultValue={denyReason || ""}
          onChange={(e) => setDenyReason(e.target.value)}
          className={"w-full h-[160px] rounded-[4px] border"}
          placeholder={"Тайлбар"}
        />
      </div>
    </Modal>
  );
};

export default Edit;
