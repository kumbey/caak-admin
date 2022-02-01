import { API, graphqlOperation } from "aws-amplify";
import { useState, useMemo, useEffect } from "react";
import { listFeedBackOrderByCreatedAt } from "../../graphql-custom/feedback/queries";
import { getReturnData } from "../../utility/Util";
import Loader from "../Loader";
import Pagination from "../Pagination/Pagination";
import Tables from "../Tables";
import { convertDateTime } from "../utils";

const FeedBackList = ({ PageSize }) => {
  let count = 0;

  const [feedBacks, setFeedBacks] = useState([]);
  const [loading, setLoading] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    count = (currentPage - 1) * PageSize;

    return feedBacks.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, feedBacks]);

  const getAllFeedBacks = async () => {
    setLoading(true);

    try {
      const resp = await API.graphql(
        graphqlOperation(listFeedBackOrderByCreatedAt, {
          sortDirection: "DESC",
          typeName: "FEEDBACK",
          limit: 5000,
        })
      );
      setFeedBacks(getReturnData(resp).items);
      setLoading(false);
    } catch (ex) {
      setLoading(false);

      console.log(ex);
    }
  };

  useEffect(() => {
    getAllFeedBacks();
  }, []);

  return feedBacks.length > 0 ? (
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
            count++;
            let x = new Array(JSON.parse(feed.star)).fill("⭐");
            return (
              <tr key={index} className="h-16">
                <td className="text-center">{count}</td>

                <td>
                  <p className="line-clamp ">{feed.description}</p>
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
  ) : (
    <Loader
      containerClassName={"self-center w-full h-[20px]"}
      className={`bg-blue-500 ${loading ? "opacity-100" : "opacity-0"}`}
    />
  );
};

export default FeedBackList;
