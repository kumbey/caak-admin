import React, { useEffect, useState } from "react";
import { createCategory } from "../graphql-custom/category/mutation";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import API from "@aws-amplify/api";
import Tables from "../components/Tables";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import { getCategoryList } from "../graphql-custom/category/queries";
import { useToast } from "../components/Toast/ToastProvider";

const CreateCategory = () => {
  const [isShowModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState(null);
  const [categoryIconName, setCategoryIconName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const toggleModal = () => {
    setShowModal(!isShowModal);
  };
  //TODO State hooson esehiig shalgah
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
          console.log(
            `Successfully added ${result.data.createCategory.name} to categories`
          );
        });
      } catch (ex) {
        console.log(ex);
      }
    } else {
      alert("Аль нэг талбар хоосон байна");
    }
  };
  const convertDateTime = (date) => {
    let fullDate = new Date(date);

    let twoDigitMonth =
      fullDate.getMonth().toString().length === 1
        ? `0${fullDate.getMonth()}`
        : fullDate.getMonth();

    let twoDigitDate =
      fullDate.getDay().toString().length === 1
        ? "0" + fullDate.getDay()
        : fullDate.getDay();

    let hour = `${fullDate.getHours() < 10 ? "0" : ""}${fullDate.getHours()}`;
    let min = `${
      fullDate.getMinutes() < 10 ? "0" : ""
    }${fullDate.getMinutes()}`;

    let sec = `${
      fullDate.getSeconds() < 10 ? "0" : ""
    }${fullDate.getSeconds()}`;

    return `${fullDate.getFullYear()}/${twoDigitMonth}/${twoDigitDate} ${hour}:${min}:${sec}`;
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    API.graphql(graphqlOperation(getCategoryList)).then((cat) => {
      setCategories(cat.data.listCategories.items);
    });
  }, []);
  return (
    <div className="flex flex-col w-screen h-screen font-sans">
      <div className="p-6 m-4 w-full lg:max-w-full ">
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
            {categories.map((cat) => {
              return (
                <tr key={cat.id}>
                  <td>{cat.name}</td>
                  <td>{cat.icon}</td>
                  <td>{convertDateTime(cat.createdAt)}</td>
                  <td>{`${
                    cat.createdAt !== cat.updatedAt
                      ? convertDateTime(cat.updatedAt)
                      : "Засвар ороогүй"
                  }`}</td>
                  <td>
                    <a href="#edit">
                      <i className="las la-edit text-2xl " />
                    </a>
                    <a href="#del">
                      <i className="las la-trash-alt text-2xl ml-4" />
                    </a>
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
                />
                <Input
                  value={categoryIconName || ""}
                  onChange={(e) => setCategoryIconName(e.target.value)}
                  label="Категори Icon нэр"
                />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
