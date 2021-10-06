import { useEffect, useState } from "react";

import Tables from "../../components/Tables";
import Select from "../../components/Select";
import Edit from "../../pages/GroupUsers/modal/Edit";

import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import {
  getGroupList,
  getGroupUsersByGroup,
} from "../../graphql-custom/group/queries";

const GroupUsers = () => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState("");
  const [show, setShow] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [currentIndex, setCurrentIndex] = useState("");

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
      setGroups(group.data.listGroups.items);
    });
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
      setUsers(groupUsers.data.getGroupUsersByGroup.items);
    });
  };

  return (
    <div className="flex flex-col w-screen h-screen font-sans workspace">
      <div className="">
        <h1>Группын хэрэглэгчид</h1>

        <div className="flex mt-6">
          <Select
            name="group_id"
            // title="Груп сонгох"
            value={selectedGroup || "DEFAULT"}
            onChange={handleChange}
          >
            <option value={"DEFAULT"} disabled hidden>
              Групп Сонгоно уу...
            </option>
            {groups.map((group) => {
              return (
                <option key={group.id} value={group.id}>
                  {group.name}
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
              <th className="text-left uppercase">Нэр</th>
              <th className="text-left uppercase">Ник нэр</th>
              <th className="text-left uppercase">Эрх</th>
              <th className="text-left uppercase">ID</th>
              <th className="text-left uppercase">Засах</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.user.firstname}</td>
                  <td>{user.user.nickname}</td>
                  <td>{user.role}</td>
                  <td>{user.user.id}</td>
                  <td>
                    <span
                      className={"cursor-pointer"}
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
