import { useState } from "react";
import Tables from "../Tables";
import { calculate_age, getFileUrl, getGenderImage } from "../../utility/Util";

import { convertDateTime } from "../utils";
import UserCategory from "./UserCategory";

const UserList = ({ users }) => {
  const [loading, setLoading] = useState(false);

  // users.forEach((user) => {
  //   if (user.category.items) {
  //     user.category.items.forEach((item) => {
  //       let temp = item.id.split("#");
  //       let id = temp[0];
  //       setCatArray([
  //         ...catArray,
  //         {
  //           userId: user.id,
  //           catId: {
  //             id,
  //           },
  //         },
  //       ]);
  //     });
  //   }
  // });
  console.log(users);
  return (
    <div className="mb-4">
      <Tables styles="hoverable table_bordered" fullWidth="w-full">
        <thead>
          <tr>
            <th className="text-left uppercase">NO</th>
            <th className="text-left uppercase">Аватар</th>
            <th className="text-left uppercase">Хэрэглэгчийн нэр</th>
            <th className="text-left uppercase">Үүссэн огноо</th>
            <th className="text-left uppercase">Нас</th>
            <th className="text-left uppercase">Хүйс</th>
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
                </td>
                <td className="break-all  truncate-3 w-96">
                  <p
                    className="cursor-pointer"
                    onClick={() =>
                      window.open(
                        `https://www.beta.caak.mn/user/${user.id}/profile`
                      )
                    }
                  >
                    @{user.nickname}
                  </p>
                </td>
                <td>{convertDateTime(user.createdAt)}</td>

                <td>{calculate_age(user.birthdate)}</td>
                <td>{user.gender === "MALE" ? "Эр" : "Эм"}</td>
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
