import { useEffect, useState } from "react";

import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import Tables from "../../components/Tables";
import Button from "../../components/Button";
import ConfirmAlert from "../../components/ConfirmAlert/ConfirmAlert";
import AddEdit from "./modal/AddEdit";

import { convertDateTime } from "../../components/utils";
import { useToast } from "../../components/Toast/ToastProvider";
import { getCategoryList } from "../../graphql-custom/category/queries";
import { deleteCategory } from "../../graphql-custom/category/mutation";

const Categories = () => {
  const { addToast } = useToast();
  const [isShowModal, setIsShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState("init");

  const [isShowConfirmAlert, setIsShowConfirmAlert] = useState(false);
  const [deleteItem, setDeleteItem] = useState();

  useEffect(() => {
    API.graphql(graphqlOperation(getCategoryList)).then((cat) => {
      setCategories(cat.data.listCategories.items);
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

  const deleteAlertModal = (item) => {
    setIsShowConfirmAlert(true);
    setDeleteItem(item);
  };

  const deleteCategoryFunction = async (id) => {
    try {
      await API.graphql({
        query: deleteCategory,
        variables: { input: { id: id } },
      });
      setCategories(categories.filter((cat) => cat.id !== id));
      addToast({
        content: `Устгалаа`,
        title: "Амжилттай",
        autoClose: true,
      });
      setIsShowConfirmAlert(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen font-sans workspace">
      <div className="">
        <div className="mb-4">
          <h1>Категориуд</h1>
          <div className="flex mt-4">
            <Button className="bg-primary-400" onClick={() => setEditId("new")}>
              Шинэ категори үүсгэх
            </Button>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <Tables styles="hoverable table_bordered" fullWidth="w-full">
          <thead>
            <tr>
              <th className="text-left uppercase">Нэр</th>
              <th className="text-left uppercase">Үүссэн огноо</th>
              <th className="text-left uppercase">Зассан огноо</th>
              <th className="text-left uppercase">Засах</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => {
              return (
                <tr key={index}>
                  <td>{cat.name}</td>

                  <td>{convertDateTime(cat.createdAt)}</td>
                  <td>{`${
                    cat.createdAt !== cat.updatedAt
                      ? convertDateTime(cat.createdAt)
                      : "Засвар ороогүй"
                  }`}</td>
                  <td>
                    <span
                      onClick={() => setEditId(cat.id)}
                      className={"cursor-pointer"}
                    >
                      <i className="las la-edit text-2xl " />
                    </span>
                    <span
                      onClick={() => {
                        deleteAlertModal(cat.id);
                      }}
                      className={"cursor-pointer"}
                    >
                      <i className="las la-trash-alt text-2xl ml-4" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Tables>
      </div>
      <AddEdit
        editId={editId}
        show={isShowModal}
        setShow={setIsShowModal}
        addToast={addToast}
        setCategories={setCategories}
      />
      <ConfirmAlert
        show={isShowConfirmAlert}
        title="Та устгахдаа итгэлтэй байна уу?"
        onClose={() => setIsShowConfirmAlert(false)}
        onSubmit={() => deleteCategoryFunction(deleteItem)}
      />
    </div>
  );
};

export default Categories;
