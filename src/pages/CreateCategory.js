import React, { useState } from "react";
import Tables from "../components/Tables";
import Modal from "../components/Modal";
import Input from "../components/Input";

const CreateCategory = () => {
  const [isShowModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [iconName, setIconName] = useState("");

  const toggleModal = () => {
    setShowModal(!isShowModal);
  };
  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log(event.target.name.value);
    console.log(event.target.email.value);
  };
  return (
    <div className="flex flex-col w-screen h-screen font-sans">
      <div className="p-6 m-4 w-full lg:max-w-lg md:max-w-2xl">
        <div className="mb-4">
          <h1>Add Category</h1>
          <div className="flex mt-4">
            <Input label={"Enter Category Name.."} />
            <button onClick={() => toggleModal()}>
              <i className="pl-2 text-4xl las la-plus-circle" />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <Tables styles="striped" fullWidth="w-full"></Tables>
          <Modal
            show={isShowModal}
            title="Шинэ категори үүсгэх"
            content="content"
            onClose={() => setShowModal(false)}
            type="basic"
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
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
