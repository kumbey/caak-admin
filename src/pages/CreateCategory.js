import React, { useEffect, useState } from "react";
import { getCategoryList } from "../graphql-custom/category/queries";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import Auth from "@aws-amplify/auth";
import API from "@aws-amplify/api";
import Tables from "../components/Tables";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";

const CreateCategory = () => {
  const [isShowModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [iconName, setIconName] = useState("");

  const toggleModal = () => {
    setShowModal(!isShowModal);
  };
  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log(categoryName);
    console.log(iconName);
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

    let currentDate = `${fullDate.getFullYear()}/${twoDigitMonth}/${twoDigitDate} ${hour}:${min}:${sec}`;

    return currentDate;
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    API.graphql(graphqlOperation(getCategoryList)).then((cat) => {
      setCategories(cat.data.listCategories.items);
    });
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen font-sans">
      <div className="p-6 m-4 w-full lg:max-w-lg md:max-w-2xl">
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
                  <td>{cat.updatedAt}</td>
                  <td>
                    <a href="#edit">
                      <i className="las la-edit text-2xl "></i>
                    </a>
                    <a href="#del">
                      <i className="las la-trash-alt text-2xl ml-4"></i>
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
            submitBtnName="Шинэ категори нэмэх"
          >
            <div className="mt-8 max-w-md">
              <div className="grid grid-cols-1 gap-6">
                <Input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  label="Категори нэр"
                />
                <Input
                  value={iconName}
                  onChange={(e) => setIconName(e.target.value)}
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
