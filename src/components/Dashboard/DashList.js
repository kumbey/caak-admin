import { useState, useMemo } from "react";

import Tables from "../Tables";
import { getFileUrl, getGenderImage } from "../../utility/Util";
import placeholder from "./../../../src/assets/images/placeholder.png";

import { convertDateTime } from "../utils";

const DashList = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  let PageSize = 10;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return posts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <>
      <div className="mb-4">
        <Tables styles="hoverable table_bordered" fullWidth="w-full">
          <thead>
            <tr>
              <th className="text-left uppercase">NO</th>
              <th className="text-left uppercase">Постын зураг </th>
              <th className="text-left uppercase">Постын нэр</th>
              <th className="text-left uppercase">Үүссэн огноо</th>
              <th className="text-left uppercase">Групп</th>
              <th className="text-left uppercase">Нэмсэн хүн</th>
              <th className="text-left uppercase">Саак</th>
              <th className="text-left uppercase">Сэтгэгдэл</th>
              <th className="text-left uppercase">Үзэлт</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((post, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      width="64"
                      height="64"
                      src={
                        (post?.items?.items[0]?.file?.type?.startsWith(
                          "video"
                        ) &&
                          placeholder) ||
                        (post?.items?.items[0]?.file
                          ? getFileUrl(post.items.items[0].file)
                          : getGenderImage("default"))
                      }
                      alt="image"
                    />
                  </td>
                  <td className="break-all truncate-3 w-96">{post.title}</td>

                  <td>{convertDateTime(post.createdAt)}</td>
                  <td>{post.group.name}</td>
                  <td>{post.user.nickname}</td>
                  <td>{post.totals.reactions}</td>
                  <td>{post.totals.comments}</td>
                  <td>{post.totals.views}</td>
                </tr>
              );
            })}
          </tbody>
        </Tables>
      </div>
    </>
  );
};

export default DashList;
