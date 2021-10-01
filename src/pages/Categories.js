import React, { useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../graphql-custom/category/mutation";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import API from "@aws-amplify/api";
import Tables from "../components/Tables";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import { getCategoryList } from "../graphql-custom/category/queries";
import { useToast } from "../components/Toast/ToastProvider";
import { convertDateTime } from "../components/utils";

const Categories = () => {
  const [isShowModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState(null);
  const [categoryIconName, setCategoryIconName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [currentEditingData, setCurrentEditingData] = useState();
  const { addToast } = useToast();

  const toggleModal = () => {
    setShowModal(!isShowModal);
  };
  const editCategoryModal = async (item) => {
    setIsShowEdit(true);
    setCurrentEditingData(item);
  };

  const editCategoryFunction = async (event) => {
    event.preventDefault();
    try {
      await API.graphql({
        query: updateCategory,
        variables: {
          input: {
            id: currentEditingData.id,
            icon: currentEditingData.icon,
            name: currentEditingData.name,
          },
        },
      }).then(() => {
        addToast({ content: `${currentEditingData.name}`, title: "Амжилттай" });
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  const deleteCategoryFunction = async (id) => {
    if (window.confirm("Та устгахдаа итгэлтэй байна уу?"))
      try {
        await API.graphql({
          query: deleteCategory,
          variables: { input: { id: id } },
        }).then(() => {
          addToast({ content: `Устгалаа`, title: "Амжилттай" });
        });
      } catch (ex) {
        console.log(ex);
      }
  };

  const onSubmit = async (event) => {
    event.preventDefault(event);
    if (categoryIconName && categoryName) {
      setIsLoading(true);
      try {
        await API.graphql({
          query: createCategory,
          variables: { input: { icon: categoryIconName, name: categoryName } },
        }).then((result) => {
          addToast({
            content: `${result.data.createCategory.name} амжилттай үүслээ`,
            title: "Амжилттай",
            autoClose: true,
          });
          setIsLoading(false);
          setCategoryName(null);
          setCategoryIconName(null);
        });
      } catch (ex) {
        console.log(ex);
      }
    } else {
      setInputError(true);
    }
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    API.graphql(graphqlOperation(getCategoryList)).then((cat) => {
      setCategories(cat.data.listCategories.items);
    });
  }, []);
  return (
    <main className="flex flex-col w-screen h-screen font-sans workspace">
      <div className="">
        <div className="mb-4">
          <h1>Категориуд</h1>
          <div className="flex mt-4">
            <Button className="bg-primary-400" onClick={() => toggleModal()}>
              Шинэ категори үүсгэх
            </Button>
          </div>
        </div>
        <div className="mb-4">
          <Tables styles="striped" fullWidth="w-full">
            {currentEditingData && (
              <Modal
                modalType={"centered"}
                show={isShowEdit}
                title={`Засвар оруулах`}
                onClose={() => setIsShowEdit(false)}
                type="submit"
                onSubmit={editCategoryFunction}
                loading={isLoading}
                submitBtnName="Хадгалах"
                content={currentEditingData}
              >
                <div className="mt-8 max-w-md">
                  <div className="grid grid-cols-1 gap-6">
                    <Input
                      value={currentEditingData.name || ""}
                      onChange={(e) =>
                        setCurrentEditingData({
                          ...currentEditingData,
                          name: e.target.value,
                        })
                      }
                      title="Категори нэр"
                      error={inputError}
                      errorMessage={`${
                        !currentEditingData
                          ? "Категорийн нэрийг оруулна уу"
                          : ""
                      }`}
                    />
                    <Input
                      value={currentEditingData.icon || ""}
                      onChange={(e) =>
                        setCurrentEditingData({
                          ...currentEditingData,
                          icon: e.target.value,
                        })
                      }
                      title="Категори Icon нэр"
                      error={inputError}
                      errorMessage={`${
                        !currentEditingData
                          ? "Категорийн айкон нэрийг оруулна уу"
                          : ""
                      }`}
                    />
                  </div>
                </div>
              </Modal>
            )}

            {categories.map((cat) => {
              return (
                <tr key={cat.id}>
                  <td>{cat.name}</td>
                  <td>{convertDateTime(cat.createdAt)}</td>
                  <td>{`${
                    cat.createdAt !== cat.updatedAt
                      ? convertDateTime(cat.updatedAt)
                      : "Засвар ороогүй"
                  }`}</td>
                  <td>
                    <span onClick={() => editCategoryModal(cat)}>
                      <i className="las la-edit text-2xl " />
                    </span>
                    <span
                      className={"cursor-pointer"}
                      onClick={() => deleteCategoryFunction(cat.id)}
                    >
                      <i className="las la-trash-alt text-2xl ml-4" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </Tables>
          <Modal
            show={isShowModal}
            title="Шинэ категори үүсгэх"
            content="content"
            onClose={() => setShowModal(false)}
            type="submit"
            onSubmit={onSubmit}
            loading={isLoading}
            submitBtnName="Шинэ категори нэмэх"
          >
            <div className="mt-8 max-w-md">
              <div className="grid grid-cols-1 gap-6">
                <Input
                  value={categoryName || ""}
                  onChange={(e) => setCategoryName(e.target.value)}
                  label="Категори нэр"
                  error={inputError}
                  errorMessage={`${
                    !categoryName ? "Категорийн нэрийг оруулна уу" : ""
                  }`}
                />
                <Input
                  value={categoryIconName || ""}
                  onChange={(e) => setCategoryIconName(e.target.value)}
                  label="Категори Icon нэр"
                  error={inputError}
                  errorMessage={`${
                    !categoryIconName
                      ? "Категорийн айкон нэрийг оруулна уу"
                      : ""
                  }`}
                />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </main>
  );
};

export default Categories;
