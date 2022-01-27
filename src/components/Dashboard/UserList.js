import { useState, useMemo } from "react";

import Tables from "../Tables";
import { calculate_age, getFileUrl, getGenderImage } from "../../utility/Util";

import { convertDateTime } from "../utils";
import UserCategory from "./UserCategory";
import Pagination from "../Pagination/Pagination";

const UserList = ({ users, PageSize }) => {
  let count = 0;

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    count = (currentPage - 1) * PageSize;

    return users.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);
  return (
    <div className="mb-4">
      <Tables styles="hoverable table_bordered" fullWidth="w-full">
        <thead>
          <tr>
            <th className="text-left uppercase">NO</th>
            <th className="text-left uppercase w-56">Хэрэглэгч</th>
            <th className="text-left uppercase w-12">Нас</th>
            <th className="text-left uppercase w-12">Хүйс</th>
            <th className="text-left uppercase w-36">Үүссэн огноо</th>
            <th className="text-left uppercase " style={{ width: "600px" }}>
              Сонирхолууд{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((user, index) => {
            count++;
            return (
              <tr key={index}>
                <td className="text-center">{count}</td>

                <td>
                  <div className="flex items-center ">
                    <img
                      onClick={() =>
                        window.open(
                          `https://www.caak.mn/user/${user.id}/profile`
                        )
                      }
                      src={
                        user?.pic
                          ? getFileUrl(user?.pic)
                          : getGenderImage(user.gender)
                      }
                      alt="image"
                      className="mr-2 cursor-pointer w-12 h-12 object-cover"
                    />
                    <p
                      className="cursor-pointer line-clamp ml-2"
                      onClick={() =>
                        window.open(
                          `https://www.caak.mn/user/${user.id}/profile`
                        )
                      }
                    >
                      @{user.nickname}
                    </p>
                  </div>
                </td>

                <td className="text-center">{calculate_age(user.birthdate)}</td>
                <td className="text-center">
                  {user.gender === "MALE" ? "Эр" : "Эм"}
                </td>
                <td className="text-xs">{convertDateTime(user.createdAt)}</td>

                <td>
                  <UserCategory userId={user.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Tables>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={users.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default UserList;
