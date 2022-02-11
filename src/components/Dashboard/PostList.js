import { useState, useMemo, useEffect } from "react";

import Tables from "../Tables";
import { getFileUrl, getGenderImage, getReturnData } from "../../utility/Util";
import placeholder from "./../../../src/assets/images/placeholder.png";

import { convertDateTime } from "../utils";
import Pagination from "../Pagination/Pagination";
import { API } from "aws-amplify";
import { getPostByStatus } from "../../graphql-custom/post/queries";
import Loader from "../Loader";
import { useToast } from "../Toast/ToastProvider";
import CreateBoost from "../../pages/Ads/Boosted/modal/CreateBoost";

const PostList = ({ PageSize }) => {
  let count = 0;
  const { addToast } = useToast();

  const [isShowModal, setIsShowModal] = useState(false);
  const [banners, setBanners] = useState([]);
  const [editId, setEditId] = useState("init");
  const [currentIndex, setCurrentIndex] = useState("init");
  const [deleteId, setDeleteId] = useState("init");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedType, setSelectedType] = useState("All");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();
  const [nextNextToken, setNextNextToken] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    count = (currentPage - 1) * PageSize;
    return posts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, posts]);

  const editHandler = (id, index) => {
    setEditId(id);
    setCurrentIndex(index);
  };

  async function getAllPosts() {
    let resp;
    try {
      resp = await API.graphql({
        query: getPostByStatus,
        variables: {
          status: "CONFIRMED",
          sortDirection: "DESC",
          nextToken: nextNextToken,
          limit: 20,
        },
      });
      setNextNextToken(getReturnData(resp).nextToken);

      setPosts([...posts, ...getReturnData(resp).items]);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    if (nextNextToken) getAllPosts();
  }, [currentPage]);

  // useEffect(() => {
  //   if (selectedType === "All") {
  //     fetchBanners();
  //   } else {
  //     fetchBannersType();
  //   }
  // }, [selectedType]);

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
      <Tables styles="hoverable table_bordered" fullWidth="w-full">
        <thead>
          <tr>
            <th className="text-left uppercase">NO</th>
            <th className="text-left uppercase w-96">Пост</th>
            <th className="text-left uppercase w-36">Групп</th>
            <th className="text-left uppercase w-36">Нэмсэн хүн</th>
            <th className="text-left uppercase w-32">Үүссэн огноо</th>
            <th className="text-left uppercase">Сэтгэгдэл</th>
            <th className="text-left uppercase">Саак</th>
            <th className="text-left uppercase">Үзэлт</th>
            <th className="text-left uppercase">Даралт</th>
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
                  <div className="flex items-center  ">
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
                      className="cursor-pointer line-clamp"
                    >
                      {post.title}
                    </p>
                  </div>
                </td>

                <td>
                  <p
                    className="cursor-pointer line-clamp"
                    onClick={() =>
                      window.open(`https://www.caak.mn/group/${post.group.id}`)
                    }
                  >
                    {post.group.name}
                  </p>
                </td>
                <td>
                  <div className=" flex items-center">
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
                      className="cursor-pointer line-clamp"
                    >
                      {post.user.nickname}
                    </p>
                  </div>
                </td>
                <td className="text-xs">{convertDateTime(post.createdAt)}</td>

                <td className="text-center">{post.totals.comments}</td>
                <td className="text-center">{post.totals.reactions}</td>
                <td className="text-center">{post.totals.views}</td>
                <td className="text-center">click</td>
                <td className="flex my-2 border-none">
                  <span
                    onClick={() => editHandler(post.id, index)}
                    className={"cursor-pointer"}
                  >
                    <i className="text-2xl text-green las la-edit" />
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
        totalCount={posts.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <CreateBoost
        currentIndex={currentIndex}
        editId={editId}
        show={isShowModal}
        setShow={setIsShowModal}
      />
    </div>
  ) : (
    <Loader
      containerClassName={"self-center w-full h-[20px]"}
      className={`bg-blue-500 ${loading ? "opacity-100" : "opacity-0"}`}
    />
  );
};

export default PostList;
