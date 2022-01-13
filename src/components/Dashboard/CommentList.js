import { useState, useMemo } from "react";

import Tables from "../Tables";
import { getFileUrl, getGenderImage } from "../../utility/Util";
import placeholder from "./../../../src/assets/images/placeholder.png";

import { convertDateTime } from "../utils";
import Pagination from "../Pagination/Pagination";

const CommentList = ({ comments }) => {
  let PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return comments.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  console.log(comments);
  return (
    <>
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
              return (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>

                  <td>
                    <div className="flex items-center">
                      <img
                        onClick={() =>
                          window.open(
                            `https://www.beta.caak.mn/post/view/${comment.post.id}`
                          )
                        }
                        className="cursor-pointer mr-2 w-12 h-12 object-cover"
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
                      <p
                        onClick={() =>
                          window.open(
                            `https://www.beta.caak.mn/post/view/${comment.post.id}`
                          )
                        }
                        className="cursor-pointer line-clamp "
                      >
                        {comment?.post?.title}
                      </p>
                    </div>
                  </td>

                  <td>
                    <p className="line-clamp">{comment.comment}</p>
                  </td>
                  <td>
                    <div className=" flex items-center">
                      <img
                        onClick={() =>
                          window.open(
                            `https://www.beta.caak.mn/user/${comment.user.id}/profile`
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
                            `https://www.beta.caak.mn/user/${comment.user.id}/profile`
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
    </>
  );
};

export default CommentList;
