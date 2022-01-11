import { useState } from "react";
import Tables from "../Tables";
import { calculate_age, getFileUrl, getGenderImage } from "../../utility/Util";

import { convertDateTime } from "../utils";
import UserCategory from "./UserCategory";

const UserList = ({ users }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="mb-4">
      <Tables styles="hoverable table_bordered" fullWidth="w-full">
        <thead>
          <tr>
            <th className="text-left uppercase">NO</th>
            <th className="text-left uppercase">Хэрэглэгч</th>
            <th className="text-left uppercase">Нас</th>
            <th className="text-left uppercase">Хүйс</th>
            <th className="text-left uppercase">Үүссэн огноо</th>
            <th className="text-left uppercase">Сонирхолууд </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            // getCategory(user.id);
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center">
                    <img
                      height={64}
                      width={64}
                      src={
                        user?.pic
                          ? getFileUrl(user?.pic)
                          : getGenderImage(user.gender)
                      }
                      alt="image"
                    />
                    <p
                      className="cursor-pointer break-all  truncate-3 w-96 ml-2"
                      onClick={() =>
                        window.open(
                          `https://www.beta.caak.mn/user/${user.id}/profile`
                        )
                      }
                    >
                      @{user.nickname}
                    </p>
                  </div>
                </td>

                <td>{calculate_age(user.birthdate)}</td>
                <td>{user.gender === "MALE" ? "Эр" : "Эм"}</td>
                <td>{convertDateTime(user.createdAt)}</td>

                <td>
                  <ul>
                    <UserCategory userId={user.id} />
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Tables>
    </div>
  );
};

export default UserList;
