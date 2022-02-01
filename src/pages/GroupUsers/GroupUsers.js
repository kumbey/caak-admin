import { useEffect, useMemo, useState } from "react";

import Tables from "../../components/Tables";
import Select from "../../components/Select";
import Edit from "../../pages/GroupUsers/modal/Edit";

import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import {
  getGroupList,
  getGroupUsersByGroup,
} from "../../graphql-custom/group/queries";
import { getCategoryList } from "../../graphql-custom/category/queries";
import { getReturnData } from "../../utility/Util";
import Pagination from "../../components/Pagination/Pagination";

const GroupUsers = () => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groups, setGroups] = useState([]);
  const [cats, setCats] = useState([]);
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState("");
  const [show, setShow] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [currentIndex, setCurrentIndex] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  let count = 0;
  let PageSize = 100;
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    count = (currentPage - 1) * PageSize;

    return users.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, users]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedGroup(value);
  };
  const editHandler = (id, role, index) => {
    setEditId(id);
    setUserRole(role);
    setShow(true);
    setCurrentIndex(index);
  };
  useEffect(() => {
    API.graphql(graphqlOperation(getGroupList)).then((group) => {
      setGroups(
        group.data.listGroups.items.sort(function (a, b) {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        })
      );
    });

    getCategory();
  }, []);

  useEffect(() => {
    if (selectedGroup) getUsers(selectedGroup);
  }, [selectedGroup]);

  const getUsers = (id) => {
    API.graphql(
      graphqlOperation(getGroupUsersByGroup, {
        group_id: id,
      })
    ).then((groupUsers) => {
      setUsers(
        groupUsers.data.getGroupUsersByGroup.items.sort(function (a, b) {
          if (a.user.nickname.toLowerCase() < b.user.nickname.toLowerCase()) {
            return -1;
          }
          if (a.user.nickname.toLowerCase() > b.user.nickname.toLowerCase()) {
            return 1;
          }
          return 0;
        })
      );
    });
  };

  const getCategory = async () => {
    try {
      const resp = await API.graphql(graphqlOperation(getCategoryList));
      setCats(getReturnData(resp).items);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen font-sans workspace">
      <div className="">
        <h1>Группын хэрэглэгчид</h1>

        <div className="flex mt-6 mb-5">
          <Select
            name="group_id"
            // title="Груп сонгох"
            value={selectedGroup || "DEFAULT"}
            onChange={handleChange}
          >
            <option value={"DEFAULT"} disabled hidden>
              Групп Сонгоно уу...
            </option>
            {groups.map((group, index) => {
              let icon;
              icon = cats.filter((cat) => cat.id === group.category.id);
              return (
                <option key={index} value={group.id}>
                  {`${icon[0].icon} ${group.name}`}
                </option>
              );
            })}
          </Select>
        </div>
      </div>
      <div className="mb-4">
        <Tables styles="hoverable table_bordered" fullWidth="w-full">
          <thead>
            <tr>
              <th className="text-left uppercase">NO</th>
              <th className="text-left uppercase">Нэр</th>
              <th className="text-left uppercase">Ник нэр</th>
              <th className="text-left uppercase">Эрх</th>
              <th className="text-left uppercase">ID</th>
              <th className="text-center uppercase">Засах</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((user, index) => {
              count++;
              return (
                <tr key={index}>
                  <td className="text-center">{count}</td>

                  <td>{user.user.firstname}</td>
                  <td>{user.user.nickname}</td>
                  <td>{user.role}</td>
                  <td>{user.user.id}</td>
                  <td className="flex justify-center">
                    <span
                      className={"cursor-pointer "}
                      onClick={() =>
                        editHandler(user.user.id, user.role, index)
                      }
                    >
                      <i className="text-2xl las la-edit" />
                    </span>
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
        <Edit
          users={users}
          setUsers={setUsers}
          show={show}
          setShow={setShow}
          editId={editId}
          userRole={userRole}
          selectedGroup={selectedGroup}
          currentIndex={currentIndex}
        />
      </div>
    </div>
  );
};

export default GroupUsers;
