import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import Tables from "../../../components/Tables";
import { useToast } from "../../../components/Toast/ToastProvider";
import AddEdit from "./modal/AddEdit";
import placeholder from "./../../../../src/assets/images/placeholder.png";

import {
  getDiffDays,
  getFileUrl,
  getGenderImage,
  getReturnData,
  kFormatter,
} from "../../../utility/Util";
import moment from "moment";
import { convertDateTime } from "../../../components/utils";
import { listBoostedPosts } from "../../../graphql-custom/boost/queries";
import ConfirmAlert from "../../../components/ConfirmAlert/ConfirmAlert";
import { deleteBoostedPost } from "../../../graphql-custom/boost/mutation";

const BoostedPost = () => {
  const { addToast } = useToast();

  const [isShowModal, setIsShowModal] = useState(false);
  const [boostedPosts, setBoostedPosts] = useState([]);
  const [editId, setEditId] = useState("init");
  const [currentIndex, setCurrentIndex] = useState("init");
  const [deleteId, setDeleteId] = useState("init");
  const [showAlert, setShowAlert] = useState(false);

  const date = new Date();
  const now = date.toISOString();

  const editHandler = (id, index) => {
    setEditId(id);
    setCurrentIndex(index);
  };

  const fetchBoostedPosts = async () => {
    try {
      const resp = await API.graphql(
        graphqlOperation(listBoostedPosts, {
          status: "ACTIVE",
        })
      );
      setBoostedPosts(
        getReturnData(resp).items.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      );
    } catch (ex) {
      console.log(ex);
    }
  };

  const delBoost = async (id) => {
    try {
      const resp = await API.graphql(
        graphqlOperation(deleteBoostedPost, {
          input: { id },
        })
      );
      setShowAlert(false);
      addToast({
        content: getReturnData(resp).post.title,
        title: `Амжилттай устгалаа.`,
        autoClose: true,
        type: "delete",
      });
      //Removing item from local state after removed from the server.
      const filteredArray = boostedPosts.filter(
        (item) => item.id !== resp.data.deleteBoostedPost.id
      );
      setBoostedPosts(filteredArray);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    fetchBoostedPosts();
  }, []);

  useEffect(() => {
    if (editId !== "init") {
      setIsShowModal(true);
    }
  }, [editId]);

  useEffect(() => {
    if (!isShowModal) {
      setEditId("init");
    }
  }, [isShowModal]);

  useEffect(() => {
    if (!showAlert) {
      setDeleteId("init");
    }
  }, [showAlert]);

  useEffect(() => {
    if (deleteId !== "init") {
      setShowAlert(true);
    }
  }, [deleteId]);

  return (
    <div className="flex flex-col font-sans   ">
      <div className="">
        <div className="mb-4">
          <Tables styles="hoverable table_bordered" fullWidth="w-full">
            <thead>
              <tr>
                <th className="text-center uppercase">NO</th>
                <th className="text-left uppercase w-96">Пост</th>
                <th className="text-left uppercase w-96">
                  Бүүстэлсэн хэрэглэгч
                </th>
                <th className="text-center uppercase w-20">Хоног</th>
                <th className="text-left uppercase w-60">Эхэлсэн огноо</th>
                <th className="text-left uppercase w-60">Дуусах огноо</th>
                <th className="text-center uppercase w-24">Харсан тоо</th>
                <th className="text-center uppercase w-24">Үзсэн тоо</th>
                <th className="text-center uppercase w-24">Засах</th>
              </tr>
            </thead>
            <tbody>
              {boostedPosts.map((boost, index) => {
                return (
                  <tr
                    key={index}
                    className={`${boost.end_date < now ? "bg-red-50" : ""}`}
                  >
                    <td className="text-center">{index + 1}</td>
                    <td>
                      <div className="flex items-center">
                        <div
                          className="mr-2"
                          style={{ minWidth: "48px", minHeight: "48px" }}
                        >
                          <img
                            onClick={() =>
                              window.open(
                                `https://www.caak.mn/post/view/${boost.post_id}`
                              )
                            }
                            className=" cursor-pointer w-12 h-12 object-cover"
                            src={
                              boost.post?.items?.items[0]?.file?.type?.startsWith(
                                "video"
                              )
                                ? placeholder
                                : boost.post?.items?.items[0]?.file
                                ? getFileUrl(boost.post.items.items[0].file)
                                : getGenderImage("default")
                            }
                            alt={boost?.post?.items?.items[0]?.file?.type}
                          />
                        </div>
                        <p
                          onClick={() =>
                            window.open(
                              `https://www.caak.mn/post/view/${boost.post_id}`
                            )
                          }
                          className="cursor-pointer truncate-3"
                        >
                          {boost.post.title}
                        </p>
                      </div>
                    </td>

                    <td>
                      <div className=" flex items-center w-36">
                        <img
                          onClick={() =>
                            window.open(
                              `https://www.caak.mn/user/${boost.post.user.id}/profile`
                            )
                          }
                          className="mr-2 cursor-pointer rounded-full"
                          style={{ height: "32px", width: "32px" }}
                          src={
                            boost?.post?.user?.pic
                              ? getFileUrl(boost?.post?.user.pic)
                              : getGenderImage("default")
                          }
                          alt={boost?.post?.user.pic?.type}
                        />
                        <p
                          onClick={() =>
                            window.open(
                              `https://www.caak.mn/user/${boost?.post.user.id}/profile`
                            )
                          }
                          className="cursor-pointer truncate-3"
                        >
                          {boost.post.user.nickname}
                        </p>
                      </div>
                    </td>
                    <td>
                      <p className="text-center">
                        {getDiffDays(
                          moment(boost.start_date)._d,
                          moment(boost.end_date)._d
                        )}
                      </p>
                    </td>
                    <td>{convertDateTime(boost.start_date)}</td>
                    <td>{convertDateTime(boost.end_date)}</td>
                    <td className="text-center">
                      {boost.post.totals.reach
                        ? kFormatter(boost.post.totals.reach)
                        : 0}
                    </td>
                    <td className="text-center">
                      {boost.post.totals.views
                        ? kFormatter(boost.post.totals.views)
                        : 0}
                    </td>

                    <td>
                      <div className="flex justify-center items-center">
                        <span
                          onClick={() => editHandler(boost.id, index)}
                          className={"cursor-pointer"}
                        >
                          <i className="text-2xl text-green las la-edit" />
                        </span>
                        <span
                          onClick={() => setDeleteId(boost.id)}
                          className={"cursor-pointer"}
                        >
                          <i className="ml-4 text-2xl text-red las la-trash-alt" />
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Tables>
        </div>
      </div>

      <div className="mb-4"></div>
      <AddEdit
        boostedPosts={boostedPosts}
        currentIndex={currentIndex}
        setBoostedPosts={setBoostedPosts}
        editId={editId}
        show={isShowModal}
        setShow={setIsShowModal}
      />
      <ConfirmAlert
        title={"Та устгахдаа итгэлтэй байна уу"}
        show={showAlert}
        onClose={() => setShowAlert(false)}
        onSubmit={() => delBoost(deleteId)}
      />
    </div>
  );
};

export default BoostedPost;
