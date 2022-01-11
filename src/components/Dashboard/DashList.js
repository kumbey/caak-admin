import { useState, useMemo } from "react";

import Tables from "../Tables";
import { getFileUrl, getGenderImage } from "../../utility/Util";
import placeholder from "./../../../src/assets/images/placeholder.png";

import { convertDateTime } from "../utils";

const DashList = ({ posts }) => {
  console.log(posts);
  return (
    <>
      <div className="mb-4">
        <Tables styles="hoverable table_bordered" fullWidth="w-full">
          <thead>
            <tr>
              <th className="text-left uppercase">NO</th>
              <th className="text-left uppercase">Пост</th>
              <th className="text-left uppercase">Үүссэн огноо</th>
              <th className="text-left uppercase">Групп</th>
              <th className="text-left uppercase">Нэмсэн хүн</th>
              <th className="text-left uppercase">Саак</th>
              <th className="text-left uppercase">Сэтгэгдэл</th>
              <th className="text-left uppercase">Үзэлт</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>
                    <div className="flex items-center  w-96">
                      <img
                        onClick={() =>
                          window.open(
                            `https://www.beta.caak.mn/post/view/${post.id}`
                          )
                        }
                        className="mr-2 cursor-pointer"
                        width="64px"
                        style={{ maxHeight: "64px" }}
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
                          window.open(
                            `https://www.beta.caak.mn/post/view/${post.id}`
                          )
                        }
                        className="cursor-pointer break-all truncate-3"
                      >
                        {post.title}
                      </p>
                    </div>
                  </td>

                  <td>{convertDateTime(post.createdAt)}</td>
                  <td>
                    <p
                      className="cursor-pointer"
                      onClick={() =>
                        window.open(
                          `https://www.beta.caak.mn/group/${post.group.id}`
                        )
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
                            `https://www.beta.caak.mn/user/${post.user.id}/profile`
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
                            `https://www.beta.caak.mn/user/${post.user.id}/profile`
                          )
                        }
                        className="cursor-pointer"
                      >
                        {post.user.nickname}
                      </p>
                    </div>
                  </td>
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
