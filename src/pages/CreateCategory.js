import React, { useEffect, useState } from "react";
import Tables from "../components/Tables";
import { useTheme } from "../context/ThemeContext";
import Modal from "../components/Modal";
import Input from "../components/Input";

const CreateCategory = () => {

  const [isShowModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [iconName, setIconName] = useState("");

  const toggleModal = () => {
    setShowModal(!isShowModal);
  };
  console.log(`modal: ${isShowModal}`)
  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log(event.target.name.value);
    console.log(event.target.email.value);
  };
  return (
    <div className="flex-col  h-screen w-screen flex  font-sans ">
      <div className=" p-6 m-4 w-full  lg:max-w-lg md:max-w-2xl">
        <div className="mb-4">
          <h1>Add Category</h1>
          <div className="flex mt-4">
            <input
              className="border-blue-200 border-2"
              placeholder="Enter Category Name.."
              type="text"
            />
            <button onClick={()=> toggleModal()}>
              <i className="las la-plus-circle text-4xl pl-2" />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <Tables styles="striped" fullWidth="w-full"></Tables>
          {isShowModal && (
            <Modal
              show={isShowModal}
              title="Шинэ категори үүсгэх"
              content="content"
              onClose={() => setShowModal(false)}
              type="static"
            >
              <form onSubmit={onSubmit}>
                <div className="mt-8 max-w-md">
                  <div className="grid grid-cols-1 gap-6">
                    <Input
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      label="Category Name"
                    />
                    <Input
                      value={iconName}
                      onChange={(e) => setIconName(e.target.value)}
                      label="Category Icon Name"
                    />
                  </div>
                </div>
              </form>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
