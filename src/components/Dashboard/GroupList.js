import { useState, useMemo } from "react";

import { getFileUrl, getGenderImage } from "../../utility/Util";
import Pagination from "../Pagination/Pagination";
import Tables from "../Tables";

import { convertDateTime } from "../utils";
import GroupAdmins from "./GroupAdmins";

const GroupList = ({ groups, PageSize }) => {
  let count = 0;
  groups = groups.sort(function (a, b) {
    return b.aura - a.aura;
  });

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    count = (currentPage - 1) * PageSize;

    return groups.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);
  return (
    <div className="mb-4 pr-4">
      <Tables styles="hoverable table_bordered" fullWidth="w-full ">
        <thead>
          <tr>
            <th className="text-left uppercase ">NO</th>
            <th className="text-left uppercase w-96">Групп</th>
            <th className="text-left uppercase ">Гишүүд</th>
            <th className="text-left uppercase">Постууд</th>
            <th className="text-left uppercase ">Аура</th>
            <th className="text-left uppercase  w-40">Үүсгэсэн хэрэглэгч</th>
            <th className="text-left uppercase  w-96">Удирдагчид</th>
            <th className="text-left uppercase w-36">Үүссэн огноо</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((group, index) => {
            count++;
            return (
              <tr key={index}>
                <td className="text-center">{count}</td>
                <td>
                  <div className="flex items-center ">
                    <img
                      onClick={() =>
                        window.open(
                          `https://www.beta.caak.mn/group/${group.id}`
                        )
                      }
                      className="mr-2 w-12 h-12 object-cover cursor-pointer"
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
                      className="cursor-pointer line-clamp"
                    >
                      {group.name}
                    </p>
                  </div>
                </td>
                <td>
                  <p className="text-center">{group.totals.member}</p>
                </td>
                <td>
                  <p className="text-center">{group.totals.confirmed}</p>
                </td>

                <td>
                  <p className="text-center">{group.aura}</p>
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
                      className="line-clamp cursor-pointer "
                    >
                      {group.founder.nickname}
                    </p>
                  </div>
                </td>
                <td className="text-xs">
                  <GroupAdmins groupId={group.id} />
                </td>
                <td className="text-xs">{convertDateTime(group.createdAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </Tables>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={groups.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default GroupList;
