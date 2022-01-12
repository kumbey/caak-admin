import { useState, useMemo } from "react";
import Pagination from "../Pagination/Pagination";
import Tables from "../Tables";
import { convertDateTime } from "../utils";

const FeedBackList = ({ feedBacks }) => {
  let PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return feedBacks.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div className="mb-4 pr-4">
      <Tables styles="hoverable table_bordered" fullWidth="w-full ">
        <thead>
          <tr>
            <th className="text-left uppercase ">NO</th>
            <th className="text-left uppercase w-96">Тайлбар</th>
            <th className="text-left uppercase w-24">Төрөл</th>
            <th className="text-left uppercase w-36">Үнэлгээ</th>
            <th className="text-left uppercase w-36">Статус</th>
            <th className="text-left uppercase w-36">Үүссэн огноо</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((feed, index) => {
            let x = new Array(JSON.parse(feed.star)).fill("⭐");
            return (
              <tr key={index} className="h-16">
                <td className="text-center">{index + 1}</td>

                <td>
                  <p className=" line-clamp ">{feed.description}</p>
                </td>
                <td>
                  <p className="line-clamp text-center">{feed.type}</p>
                </td>
                <td>
                  <p className="line-clamp text-left">{x}</p>
                </td>
                <td>
                  <p className="line-clamp text-center">{feed.status}</p>
                </td>

                <td className="text-xs ">{convertDateTime(feed.createdAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </Tables>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={feedBacks.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default FeedBackList;
