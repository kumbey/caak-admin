import { useEffect, useState } from "react";

import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import Tables from "../../components/Tables";
import Button from "../../components/Button";
import ConfirmAlert from "../../components/ConfirmAlert/ConfirmAlert";
import AddEdit from "./modal/AddEdit";
// import { generateTimeAgo } from "../../utility/Util";

import { convertDateTime } from "../../components/utils";
import { useToast } from "../../components/Toast/ToastProvider";
import { getCategoryList } from "../../graphql-custom/category/queries";
import { deleteCategory } from "../../graphql-custom/category/mutation";

const Categories = () => {
  const { addToast } = useToast();
  const [isShowModal, setIsShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState("init");

  const [deleteId, setDeleteId] = useState("init");
  const [currentIndex, setCurrentIndex] = useState("init");
  const [showAlert, setShowAlert] = useState(false);

  const editHandler = (id, index) => {
    setEditId(id);
    setCurrentIndex(index);
  };

  const deleteCategoryFunction = async (id) => {
    try {
      const resp = await API.graphql(
        graphqlOperation(deleteCategory, { input: { id } })
      );
      setShowAlert(false);
      setCategories(
        categories.filter((cat) => cat.id !== resp.data.deleteCategory.id)
      );
      addToast({
        content: `Устгалаа`,
        title: "Амжилттай",
        autoClose: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    API.graphql(graphqlOperation(getCategoryList)).then((cat) => {
      setCategories(cat.data.listCategorys.items);
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
              <th className="text-left uppercase">NO</th>
              <th className="text-left uppercase">Нэр</th>
              <th className="text-left uppercase">Зураг</th>
              <th className="text-left uppercase">Үүссэн огноо</th>
              <th className="text-left uppercase">Зассан огноо</th>
              <th className="text-left uppercase">Засах</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {cat.icon + " "}
                    {cat.name}
                  </td>

                  <td>{convertDateTime(cat.createdAt)}</td>
                  <td>{`${
                    cat.createdAt !== cat.updatedAt
                      ? convertDateTime(cat.updatedAt)
                      : "Засвар ороогүй"
                  }`}</td>
                  <td>
                    <span
                      onClick={() => editHandler(cat.id, index)}
                      className={"cursor-pointer"}
                    >
                      <i className="las la-edit text-2xl text-green" />
                    </span>
                    <span
                      onClick={() => {
                        setDeleteId(cat.id);
                      }}
                      className={"cursor-pointer"}
                    >
                      <i className="las la-trash-alt text-2xl ml-4 text-red " />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Tables>
      </div>
      <AddEdit
        categories={categories}
        currentIndex={currentIndex}
        setCategories={setCategories}
        editId={editId}
        show={isShowModal}
        setIsShowModal={setIsShowModal}
        addToast={addToast}
      />
      <ConfirmAlert
        show={showAlert}
        title="Та устгахдаа итгэлтэй байна уу?"
        onClose={() => setShowAlert(false)}
        onSubmit={() => deleteCategoryFunction(deleteId)}
      />
    </div>
  );
};

export default Categories;
