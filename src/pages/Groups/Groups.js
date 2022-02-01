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
import { getFileUrl, getGenderImage } from "../../utility/Util";

const Groups = () => {
  // const { addToast } = useToast();
  const [isShowModal, setIsShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [editId, setEditId] = useState("init");
  const [currentIndex, setCurrentIndex] = useState("init");
  const [deleteId, setDeleteId] = useState("init");
  const [showAlert, setShowAlert] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  let count = 0;
  let PageSize = 10;
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    count = (currentPage - 1) * PageSize;

    return groups.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

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

  useEffect(() => {
    API.graphql(graphqlOperation(getGroupList)).then((group) => {
      setGroups(
        group.data.listGroups.items.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
      );
    });
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
              <th className="text-left uppercase">NO</th>
              <th className="text-left uppercase">Нэр</th>
              <th className="text-left uppercase">Категори нэр</th>
              <th className="text-left uppercase">Үүссэн огноо</th>
              <th className="text-left uppercase">Зассан огноо</th>
              <th className="text-left uppercase">Засах</th>
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
                        className="cursor-pointer line-clamp"
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
                  <td>
                    <span
                      onClick={() => editHandler(group.id, index)}
                      className={"cursor-pointer"}
                    >
                      <i className="text-2xl las la-edit" />
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
  );
};

export default Groups;
