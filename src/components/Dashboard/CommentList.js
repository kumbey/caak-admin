import { useEffect, useState } from "react";
import Tables from "../Tables";
import { getFileUrl } from "../../utility/Util";

import { convertDateTime } from "../utils";

const CommentList = ({ posts, comments, getCommentsByPosts }) => {
  const [loading, setLoading] = useState(false);
  const [arr, setArr] = useState([]);

  // const { year, month, day } = extractDate(post.createdAt);
  const getComm = (id) => {
    setArr([...arr, getCommentsByPosts(id)]);
  };
  useEffect(() => {
    console.log(comments);
  }, []);

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
              <th className="text-left uppercase">Сэтгэгдэл</th>
              <th className="text-left uppercase">Бичсэн хүн</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      height={64}
                      width={64}
                      src={getFileUrl(post.items.items[0].file)}
                      alt="image"
                    />
                  </td>
                  <td className="break-all truncate-3 w-96">{post.title}</td>

                  <td>{convertDateTime(post.createdAt)}</td>

                  <td></td>
                  <td>{post.totals.comments}</td>
                </tr>
              );
            })}
          </tbody>
        </Tables>
      </div>
    </>
  );
};

export default CommentList;
