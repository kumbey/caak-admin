import { useEffect, useState } from "react";
import Tables from "../Tables";
import { getFileUrl, getGenderImage } from "../../utility/Util";
import placeholder from "./../../../src/assets/images/placeholder.png";

import { convertDateTime } from "../utils";

const CommentList = ({ comments }) => {
  const [loading, setLoading] = useState(false);
  const [arr, setArr] = useState([]);

  // const { year, month, day } = extractDate(post.createdAt);

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
            {comments.map((comment, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      width="64"
                      height="64"
                      src={
                        (comment?.post?.items?.items[0]?.file?.type?.startsWith(
                          "video"
                        ) &&
                          placeholder) ||
                        comment?.post?.items?.items[0]?.file
                          ? getFileUrl(comment?.post?.items?.items[0]?.file)
                          : getGenderImage("default")
                      }
                      alt="image"
                    />
                  </td>
                  <td className="break-all truncate-3 w-96">
                    {comment?.post?.title}
                  </td>

                  <td>{convertDateTime(comment.createdAt)}</td>

                  <td>{comment.comment}</td>
                  <td>{comment.user.nickname}</td>
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
