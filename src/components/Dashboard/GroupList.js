import { getFileUrl, getGenderImage } from "../../utility/Util";
import placeholder from "./../../../src/assets/images/placeholder.png";
import Tables from "../Tables";

import { convertDateTime } from "../utils";

const GroupList = ({ groups }) => {
  console.log(groups);
  return (
    <div className="mb-4 pr-4">
      <Tables styles="hoverable table_bordered" fullWidth="w-full ">
        <thead>
          <tr>
            <th className="text-left uppercase ">NO</th>
            <th className="text-left uppercase w-1/3">Групп</th>
            <th className="text-left uppercase ">Гишүүд</th>
            <th className="text-left uppercase">Постууд</th>
            <th className="text-left uppercase ">Аура</th>
            <th className="text-left uppercase w-1/5">Үүсгэсэн хэрэглэгч</th>
            <th className="text-left uppercase w-1/5">Үүссэн огноо</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center w-96">
                    <img
                      onClick={() =>
                        window.open(
                          `https://www.beta.caak.mn/group/${group.id}`
                        )
                      }
                      className="mr-2 max-h-[64px] cursor-pointer"
                      width="64px"
                      src={
                        group?.profile
                          ? getFileUrl(group.profile)
                          : getGenderImage("default")
                      }
                      alt={""}
                    />
                    <p
                      onClick={() =>
                        window.open(
                          `https://www.beta.caak.mn/group/${group.id}`
                        )
                      }
                      className="cursor-pointer break-all truncate-3"
                    >
                      {group.name}
                    </p>
                  </div>
                </td>
                <td>
                  <p className="   text-center">{group.totals.member}</p>
                </td>
                <td>
                  <p className="   text-center">{group.totals.confirmed}</p>
                </td>

                <td>
                  <p className="text-center ">{group.aura}</p>
                </td>
                <td>
                  <div className="flex items-center">
                    <img
                      onClick={() =>
                        window.open(
                          `https://www.beta.caak.mn/user/${group.founder.id}/profile`
                        )
                      }
                      className="mr-2 rounded-full max-h-[32px] cursor-pointer"
                      width="32px"
                      src={
                        group?.founder?.pic
                          ? getFileUrl(group.founder.pic)
                          : getGenderImage("default")
                      }
                      alt={""}
                    />
                    <p
                      onClick={() =>
                        window.open(
                          `https://www.beta.caak.mn/user/${group.founder.id}/profile`
                        )
                      }
                      className="truncate-3 cursor-pointer "
                    >
                      {group.founder.nickname}
                    </p>
                  </div>
                </td>
                <td>{convertDateTime(group.createdAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </Tables>
    </div>
  );
};

export default GroupList;
