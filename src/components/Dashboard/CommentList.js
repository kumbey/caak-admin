import { useState, useMemo, useEffect } from "react";

import Tables from "../Tables";
import { getFileUrl, getGenderImage, getReturnData } from "../../utility/Util";
import placeholder from "./../../../src/assets/images/placeholder.png";

import { convertDateTime } from "../utils";
import Pagination from "../Pagination/Pagination";
import { API } from "aws-amplify";
import { listCommentsByStatus } from "../../graphql-custom/comment/queries";
import Loader from "../Loader";

const CommentList = ({ PageSize }) => {
  let count = 0;

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    count = (currentPage - 1) * PageSize;

    return comments.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, comments]);

  const getAllComments = async () => {
    setLoading(true);
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
      setLoading(false);
    } catch (ex) {
      setLoading(false);

      console.log(ex);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return comments.length > 0 ? (
    <div className="mb-4">
      <Tables styles="hoverable table_bordered" fullWidth="w-full">
        <thead>
          <tr>
            <th className="text-left uppercase">NO</th>
            <th className="text-left uppercase w-96">Пост</th>
            <th className="text-left uppercase w-96">Сэтгэгдэл</th>
            <th className="text-left uppercase w-40">Бичсэн хүн</th>
            <th className="text-left uppercase w-36">Үүссэн огноо</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((comment, index) => {
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
                            `https://www.caak.mn/post/view/${comment.post.id}`
                          )
                        }
                        className="cursor-pointer w-12 h-12 object-cover"
                        src={
                          comment?.post?.items?.items[0]?.file?.type?.startsWith(
                            "video"
                          )
                            ? placeholder
                            : comment?.post?.items?.items[0]?.file
                            ? getFileUrl(comment?.post?.items?.items[0]?.file)
                            : getGenderImage("default")
                        }
                        alt="image"
                      />
                    </div>
                    <p
                      onClick={() =>
                        window.open(
                          `https://www.caak.mn/post/view/${comment.post.id}`
                        )
                      }
                      className="cursor-pointer line-clamp "
                    >
                      {comment?.post?.title}
                    </p>
                  </div>
                </td>

                <td>
                  <p className="line-clamp ">{comment.comment}</p>
                </td>
                <td>
                  <div className=" flex items-center">
                    <img
                      onClick={() =>
                        window.open(
                          `https://www.caak.mn/user/${comment.user.id}/profile`
                        )
                      }
                      className="mr-2 cursor-pointer rounded-full"
                      style={{ height: "32px", width: "32px" }}
                      src={
                        comment?.user?.pic
                          ? getFileUrl(comment?.user.pic)
                          : getGenderImage("default")
                      }
                      alt={comment?.user.pic?.type}
                    />
                    <p
                      onClick={() =>
                        window.open(
                          `https://www.caak.mn/user/${comment.user.id}/profile`
                        )
                      }
                      className="cursor-pointer line-clamp"
                    >
                      {comment.user.nickname}
                    </p>
                  </div>
                </td>
                <td className="text-xs">
                  {convertDateTime(comment.createdAt)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Tables>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={comments.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  ) : (
    <Loader
      containerClassName={"self-center w-full h-[20px]"}
      className={`bg-blue-500 ${loading ? "opacity-100" : "opacity-0"}`}
    />
  );
};

export default CommentList;
