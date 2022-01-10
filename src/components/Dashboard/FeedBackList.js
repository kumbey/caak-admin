import Tables from "../Tables";

import { convertDateTime } from "../utils";

const FeedBackList = ({ feedBacks }) => {
  return (
    <div className="mb-4 pr-4">
      <Tables styles="hoverable table_bordered" fullWidth="w-full ">
        <thead>
          <tr>
            <th className="text-left uppercase ">NO</th>
            <th className="text-left uppercase w-1/3">Тайлбар</th>
            <th className="text-left uppercase ">Үнэлгээ</th>
            <th className="text-left uppercase">Статус</th>
            <th className="text-left uppercase ">Төрөл</th>
            <th className="text-left uppercase w-1/5">Үүссэн огноо</th>
          </tr>
        </thead>
        <tbody>
          {feedBacks.map((feed, index) => {
            let x = new Array(JSON.parse(feed.star)).fill("⭐");
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <p className=" break-all  truncate-3 ">{feed.description}</p>
                </td>
                <td>
                  <p className="truncate-3 text-left">{x}</p>
                </td>
                <td>
                  <p className="truncate-3 ">{feed.status}</p>
                </td>
                <td>
                  <p className="truncate-3 ">{feed.type}</p>
                </td>
                <td>{convertDateTime(feed.createdAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </Tables>
    </div>
  );
};

export default FeedBackList;
