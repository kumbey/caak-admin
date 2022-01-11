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
              <th className="text-left uppercase">Пост</th>
              <th className="text-left uppercase">Сэтгэгдэл</th>
              <th className="text-left uppercase">Бичсэн хүн</th>
              <th className="text-left uppercase">Үүссэн огноо</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>
                    <div className="flex items-center">
                      <img
                        onClick={() =>
                          window.open(
                            `https://www.beta.caak.mn/post/view/${comment.post.id}`
                          )
                        }
                        className="cursor-pointer mr-2"
                        width="64"
                        height="64"
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
                        className="cursor-pointer break-all truncate-3 w-96"
                      >
                        {comment?.post?.title}
                      </p>
                    </div>
                  </td>

                  <td>{comment.comment}</td>
                  <td>
                    <p
                      onClick={() =>
                        window.open(
                          `https://www.beta.caak.mn/user/${comment.user.id}/profile`
                        )
                      }
                      className="cursor-pointer"
                    >
                      {comment.user.nickname}
                    </p>
                  </td>
                  <td>{convertDateTime(comment.createdAt)}</td>
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
