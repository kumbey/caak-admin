import { useEffect, useState } from "react";

import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import { convertDateTime } from "../../components/utils";

import Tables from "../../components/Tables";
import Button from "../../components/Button";
import {getGroupList} from "../../graphql-custom/group/queries";
import AddEdit from "./modal/AddEdit";

const Groups = () => {
  // const { addToast } = useToast();
  const [isShowModal, setIsShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [editId, setEditId] = useState("init");

  useEffect(() => {
    API.graphql(graphqlOperation(getGroupList)).then((group) => {
      setGroups(group.data.listGroups.items);
    });
  }, []);

  useEffect(() => {
    if(editId !== "init"){
      setIsShowModal(true);
    }
  }, [editId]);

  useEffect(() => {
    if(!isShowModal){
      setEditId("init");
    }
  }, [isShowModal]);

  return (
    <div className="flex flex-col w-screen h-screen font-sans workspace">
      <div className="">
        <div className="mb-4">
          <h1>Группууд</h1>
          <div className="flex mt-4">
            <Button className="bg-primary-400" onClick={() => setEditId("new")}>
              Шинэ групп үүсгэх
            </Button>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <Tables styles="hoverable table_bordered" fullWidth="w-full">
          <thead>
            <tr>
              <th className="text-left uppercase">Нэр</th>
              <th className="text-left uppercase">Категори нэр</th>
              <th className="text-left uppercase">Үүссэн огноо</th>
              <th className="text-left uppercase">Зассан огноо</th>
              <th className="text-left uppercase">Засах</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, index) => {
              return (
                <tr key={index}>
                  <td>{group.name}</td>
                  <td>{group.category.name}</td>

                  <td>{convertDateTime(group.createdAt)}</td>
                  <td>{`${
                    group.createdAt !== group.updatedAt
                      ? convertDateTime(group.createdAt)
                      : "Засвар ороогүй"
                  }`}</td>
                  <td>
                    <span
                      onClick={() => setEditId(group.id)}
                      className={"cursor-pointer"}
                    >
                      <i className="las la-edit text-2xl " />
                    </span>
                    <span onClick={() => {}} className={"cursor-pointer"}>
                      <i className="las la-trash-alt text-2xl ml-4" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Tables>
      </div>
      <AddEdit editId={editId} show={isShowModal} setShow={setIsShowModal}/>
    </div>
  );
};

export default Groups;
