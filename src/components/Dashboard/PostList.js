import { useState, useMemo, useEffect } from "react";

import Tables from "../Tables";
import { getFileUrl, getGenderImage } from "../../utility/Util";
import placeholder from "./../../../src/assets/images/placeholder.png";

import { convertDateTime } from "../utils";
import Pagination from "../Pagination/Pagination";

const PostList = ({ posts, PageSize }) => {
  let count = 0;

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    count = (currentPage - 1) * PageSize;
    return posts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, posts]);

  return posts.length > 0 ? (
    <div className="mb-4">
      <Tables styles="hoverable table_bordered" fullWidth="w-full">
        <thead>
          <tr>
            <th className="text-left uppercase">NO</th>
            <th className="text-left uppercase w-96">Пост</th>
            <th className="text-left uppercase w-56">Групп</th>
            <th className="text-left uppercase w-40">Нэмсэн хүн</th>
            <th className="text-left uppercase w-36">Үүссэн огноо</th>
            <th className="text-left uppercase">Сэтгэгдэл</th>
            <th className="text-left uppercase">Саак</th>
            <th className="text-left uppercase">Үзэлт</th>
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
                    <img
                      onClick={() =>
                        window.open(`https://www.caak.mn/post/view/${post.id}`)
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
    </div>
  ) : null;
};

export default PostList;
