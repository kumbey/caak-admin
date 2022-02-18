import { API, graphqlOperation } from "aws-amplify";
import { useState, useMemo, useEffect } from "react";
import { listGroups } from "../../graphql-custom/group/queries";

import { getFileUrl, getGenderImage, getReturnData } from "../../utility/Util";
import Loader from "../Loader";
import Pagination from "../Pagination/Pagination";
import Tables from "../Tables";

import { convertDateTime } from "../utils";
import GroupAdmins from "./GroupAdmins";

const GroupList = ({ PageSize }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  let count = 0;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    count = (currentPage - 1) * PageSize;

    return groups.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, groups]);

  const getAllGroups = async () => {
    setLoading(true);
    try {
      const resp = await API.graphql(graphqlOperation(listGroups));
      setGroups(
        getReturnData(resp).items.sort(function (a, b) {
          return b.aura - a.aura;
        })
      );
      setLoading(false);
    } catch (ex) {
      setLoading(false);

      console.log(ex);
    }
  };

  useEffect(() => {
    getAllGroups();
  }, []);

  return groups.length > 0 ? (
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
            let totalMember =
              group.totals.member + group.totals.admin + group.totals.moderator;
            count++;
            return (
              <tr key={index}>
                <td className="text-center">{count}</td>
                <td>
                  <div className="flex items-center ">
                    <div
                      className="mr-2"
                      style={{ minWidth: "48px", minHeight: "48px" }}
                    >
                      <img
                        onClick={() =>
                          window.open(`https://www.caak.mn/group/${group.id}`)
                        }
                        className="w-12 h-12 object-cover cursor-pointer"
                        src={
                          group?.profile
                            ? getFileUrl(group.profile)
                            : getGenderImage("default")
                        }
                        alt={""}
                      />
                    </div>
                    <p
                      onClick={() =>
                        window.open(`https://www.caak.mn/group/${group.id}`)
                      }
                      className="cursor-pointer truncate-3 w-44"
                    >
                      {group.name}
                    </p>
                  </div>
                </td>
                <td>
                  <p className="text-center">{totalMember}</p>
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
                          `https://www.caak.mn/user/${group.founder.id}/profile`
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
                          `https://www.caak.mn/user/${group.founder.id}/profile`
                        )
                      }
                      className="truncate-3 cursor-pointer w-36"
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
  ) : (
    <Loader
      containerClassName={"self-center w-full h-[20px]"}
      className={`bg-blue-500 ${loading ? "opacity-100" : "opacity-0"}`}
    />
  );
};

export default GroupList;
