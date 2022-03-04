import { useEffect, useMemo, useState } from "react";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { convertDateTime } from "../../components/utils";
import Tables from "../../components/Tables";
import Button from "../../components/Button";
import { getGroupList } from "../../graphql-custom/group/queries";
import AddEdit from "./modal/AddEdit";
import ConfirmAlert from "../../components/ConfirmAlert/ConfirmAlert";
import { deleteGroup } from "../../graphql-custom/group/mutation";
import Pagination from "../../components/Pagination/Pagination";
import { getFileUrl, getGenderImage, getReturnData } from "../../utility/Util";
import Input from "../../components/Input";

const Groups = () => {
  // const { addToast } = useToast();
  const [isShowModal, setIsShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [editId, setEditId] = useState("init");
  const [currentIndex, setCurrentIndex] = useState("init");
  const [deleteId, setDeleteId] = useState("init");
  const [data, setData] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  let count = 0;
  let PageSize = 10;
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    count = (currentPage - 1) * PageSize;

    return groups
      .filter(
        (group) =>
          group?.name?.toLowerCase().includes(data) ||
          group?.category?.name?.toLowerCase().includes(data)
      )
      .slice(firstPageIndex, lastPageIndex);
  }, [currentPage, groups, data]);

  const editHandler = (id, index) => {
    setEditId(id);
    setCurrentIndex(index);
  };

  const deleteGroupData = async (id) => {
    try {
      const resp = await API.graphql(
        graphqlOperation(deleteGroup, {
          input: { id },
        })
      );
      setShowAlert(false);
      //Removing item from local state after removed from the server.
      const filteredArray = groups.filter(
        (item) => item.id !== resp.data.deleteGroup.id
      );
      setGroups(filteredArray);
    } catch (ex) {
      console.log(ex);
    }
  };
  const getGroups = async () => {
    try {
      const resp = await API.graphql(graphqlOperation(getGroupList));
      setGroups(
        getReturnData(resp).items.sort(function (a, b) {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        })
      );
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    if (editId !== "init") {
      setIsShowModal(true);
    }
  }, [editId]);

  useEffect(() => {
    if (!isShowModal) {
      setEditId("init");
    }
  }, [isShowModal]);

  useEffect(() => {
    if (!showAlert) {
      setDeleteId("init");
    }
  }, [showAlert]);

  useEffect(() => {
    if (deleteId !== "init") {
      setShowAlert(true);
    }
  }, [deleteId]);
  return groups.length > 0 ? (
    <div className="flex flex-col w-screen h-screen font-sans workspace">
      <div className="">
        <div className="mb-4">
          <h1>Группууд</h1>
          <div
            style={{ maxWidth: "400px" }}
            className="flex items-center justify-between  mt-4"
          >
            <Button
              className="bg-primary-400 h-10"
              onClick={() => setEditId("new")}
            >
              Шинэ групп үүсгэх
            </Button>
            <div className="relative mb-2">
              <Input
                placeholder="Нэр / Никнэр / Эрх / ID"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
              <span
                onClick={() => {
                  setData("");
                }}
                className="absolute top-3.5 right-1.5 cursor-pointer text-2xl text-gray-400 las la-times-circle"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <Tables styles="hoverable table_bordered" fullWidth="w-full">
          <thead>
            <tr>
              <th className="text-left uppercase">NO</th>
              <th className="text-left uppercase">Нэр</th>
              <th className="text-left uppercase">Категори нэр</th>
              <th className="text-left uppercase">Үүссэн огноо</th>
              <th className="text-left uppercase">Зассан огноо</th>
              <th className="text-center uppercase">Засах</th>
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
                          window.open(`https://www.caak.mn/group/${group.id}`)
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
                          window.open(`https://www.caak.mn/group/${group.id}`)
                        }
                        className="cursor-pointer line-clamp w-60"
                      >
                        {group.name}
                      </p>
                    </div>
                  </td>
                  <td>{group.category.name}</td>

                  <td>{convertDateTime(group.createdAt)}</td>
                  <td>{`${
                    group.createdAt !== group.updatedAt
                      ? convertDateTime(group.updatedAt)
                      : "Засвар ороогүй"
                  }`}</td>
                  <td className="flex justify-center">
                    <span
                      onClick={() => editHandler(group.id, index)}
                      className={"cursor-pointer"}
                    >
                      <i className="text-2xl text-green las la-edit" />
                    </span>
                    {/* <span
                      onClick={() => setDeleteId(group.id)}
                      className={"cursor-pointer"}
                    >
                      <i className="ml-4 text-2xl las la-trash-alt" />
                    </span> */}
                  </td>
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
      <AddEdit
        groups={groups}
        currentIndex={currentIndex}
        setGroups={setGroups}
        editId={editId}
        show={isShowModal}
        setShow={setIsShowModal}
      />
      <ConfirmAlert
        title={"Та устгахдаа итгэлтэй байна уу"}
        show={showAlert}
        onClose={() => setShowAlert(false)}
        onSubmit={() => deleteGroupData(deleteId)}
      />
    </div>
  ) : null;
};

export default Groups;
