import { useState, useMemo, useEffect } from "react";

import Tables from "../Tables";
import {
  getFileUrl,
  getGenderImage,
  getReturnData,
  kFormatter,
} from "../../utility/Util";
import placeholder from "./../../../src/assets/images/placeholder.png";

import { convertDateTime } from "../utils";
import Pagination from "../Pagination/Pagination";
import { API } from "aws-amplify";
import { getPostByStatus } from "../../graphql-custom/post/queries";
import Loader from "../Loader";
import { useToast } from "../Toast/ToastProvider";
import { listBoostedPosts } from "../../graphql-custom/boost/queries";
import EditDraft from "./Modal/EditDraft";

const DraftedPostList = ({ PageSize }) => {
  let count = 0;
  const { addToast } = useToast();

  const [isShowModal, setIsShowModal] = useState(false);
  const [editId, setEditId] = useState("init");
  const [currentIndex, setCurrentIndex] = useState("init");
  const [deleteId, setDeleteId] = useState("init");
  const [showAlert, setShowAlert] = useState(false);
  const [boostedPosts, setBoostedPosts] = useState([]);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();
  const [currPost, setCurrPost] = useState();
  const [nextNextToken, setNextNextToken] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const date = new Date();
  const now = date.toISOString();

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    count = (currentPage - 1) * PageSize;
    return posts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, posts]);

  const editHandler = (id, post, index) => {
    setEditId(id);
    setCurrentIndex(index);
    setCurrPost(post);
  };

  async function getAllPosts() {
    let resp;
    setLoading(true);
    try {
      resp = await API.graphql({
        query: getPostByStatus,
        variables: {
          status: "DRAFT",
          sortDirection: "DESC",
          nextToken: nextNextToken,
          limit: 20,
          filter: {
            or: [
              { user_id: { eq: "a35649ba-d066-480f-b01d-f586b53af5a5" } },
              { user_id: { eq: "f100ebec-1ae4-4d2f-abcf-3c261af96cc7" } },
              { user_id: { eq: "c0d39895-53fd-4da6-a266-3a1959b67431" } },
              { owned: { eq: "CAAK" } },
            ],
          },
          status: "DRAFT",
        },
      });
      setNextNextToken(getReturnData(resp).nextToken);

      setPosts([...posts, ...getReturnData(resp).items]);
      setLoading(false);
    } catch (ex) {
      setLoading(false);

      console.log(ex);
    }
  }
  const fetchBoostedPosts = async () => {
    try {
      const resp = await API.graphql({
        query: listBoostedPosts,
        variables: {
          status: "ACTIVE",
          // end_date: { gt: now },
        },
      });
      setBoostedPosts(
        getReturnData(resp).items.filter((boost) => boost.end_date > now)
      );
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    getAllPosts();
    fetchBoostedPosts();
  }, []);

  useEffect(() => {
    if (nextNextToken) getAllPosts();
  }, [currentPage]);

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
  return posts.length > 0 ? (
    <div className="mb-4">
      <div style={{ minWidth: "320px" }} className={"overflow-x-auto"}>
        <Tables styles="hoverable table_bordered" fullWidth="w-full">
          <thead>
            <tr>
              <th className="text-left uppercase">NO</th>
              <th className="text-left uppercase w-96">????????</th>
              <th className="text-left uppercase w-36">??????????</th>
              <th className="text-left uppercase w-36">???????????? ??????</th>
              <th className="text-left uppercase w-32">???????????? ??????????</th>
              <th className="text-left uppercase">??????????????????</th>
              <th className="text-left uppercase">????????????</th>
              <th className="text-left uppercase">??????????</th>
              <th className="text-left uppercase">????????</th>
              <th className="text-left uppercase">????????????</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((post, index) => {
              count++;
              let isBoosted = false;
              boostedPosts.map((boost) => {
                if (boost.post_id === post.id) isBoosted = true;
              });
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
                          className=" cursor-pointer w-12 h-12 object-cover"
                          src={
                            post?.items?.items[0]?.file?.type?.startsWith(
                              "video"
                            )
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
                          window.open(
                            `https://www.caak.mn/post/view/${post.id}`
                          )
                        }
                        className="cursor-pointer truncate-3"
                      >
                        {post.title}
                      </p>
                    </div>
                  </td>

                  <td>
                    <p
                      className="cursor-pointer truncate-3"
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
                    <div className=" flex items-center w-36">
                      <img
                        onClick={() =>
                          window.open(
                            `https://www.caak.mn/user/${post.user.id}/profile`
                          )
                        }
                        className="mr-2 cursor-pointer rounded-full"
                        style={{ height: "32px", width: "32px" }}
                        src={
                          post?.user?.pic
                            ? getFileUrl(post?.user.pic)
                            : getGenderImage("default")
                        }
                        alt={post?.user.pic?.type}
                      />
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
                    </div>
                  </td>
                  <td className="text-xs">
                    {convertDateTime(post?.createdAt)}
                  </td>

                  <td className="text-center">
                    <p data-bs-toggle="tooltip" title={`?????????????????????? ??????`}>
                      {post?.totals?.comments}
                    </p>
                  </td>
                  <td className="text-center">
                    <p data-bs-toggle="tooltip" title={`???????????? ??????`}>
                      {post.totals.reach ? kFormatter(post?.totals?.reach) : 0}
                    </p>
                  </td>
                  <td className="text-center">
                    <p data-bs-toggle="tooltip" title={`?????????? ??????`}>
                      {post?.totals?.views
                        ? kFormatter(post?.totals?.views)
                        : 0}
                    </p>
                  </td>
                  <td className="text-center">
                    <p data-bs-toggle="tooltip" title={`???????????? ??????`}>
                      {post?.totals?.reactions
                        ? kFormatter(post?.totals?.reactions)
                        : 0}
                    </p>
                  </td>
                  <td className="flex my-2 border-none items-center justify-between">
                    <div
                      className="text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out"
                      data-bs-toggle="tooltip"
                      title={`??????????????`}
                    >
                      <span
                        onClick={() => editHandler(post.id, post, index)}
                        className={"cursor-pointer"}
                      >
                        <i
                          className={`text-green  text-2xl las la-clipboard-check`}
                        />
                      </span>
                    </div>
                    <div
                      className="text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out"
                      data-bs-toggle="tooltip"
                      title={`??????????`}
                    >
                      <span
                        onClick={() =>
                          window.open(
                            `https://www.caak.mn/post/edit/${post.id}`
                          )
                        }
                        className={"cursor-pointer"}
                      >
                        <i className={`text-green  text-2xl las la-edit`} />
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Tables>
      </div>

      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={posts.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <EditDraft
        currentIndex={currentIndex}
        editId={editId}
        show={isShowModal}
        setShow={setIsShowModal}
        setPosts={setPosts}
        posts={posts}
      />
    </div>
  ) : (
    <Loader
      containerClassName={"self-center w-full h-[20px]"}
      className={`bg-blue-500 ${loading ? "opacity-100" : "opacity-0"}`}
    />
  );
};

export default DraftedPostList;
