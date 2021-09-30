import React, { useState } from "react";
import Tables from "../components/Tables";
import { useTheme } from "../context/ThemeContext";
import Modal from "../components/Modal";

const CreateCategory = () => {
  const { setBackdrop, backdrop } = useTheme();
  console.log(backdrop);
  const [showModal, setShowModal] = useState(false);

  const toggle = () => {
    console.log("clicked");
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    console.log("onchange ", e.target.value);
  };
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
            <button onClick={toggle}>
              <i className="las la-plus-circle text-4xl pl-2" />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <Tables styles="striped" fullWidth="w-full"></Tables>
          {showModal && (
            <Modal
              show={showModal}
              title="Create Category"
              content="content"
              onClose={() => setShowModal(false)}
              type="static"
            >
              <form onSubmit={onSubmit}>
                <div className="mt-8 max-w-md">
                  <div className="grid grid-cols-1 gap-6">
                    <label className="block">
                      <span className="text-gray-700">Category name</span>
                      <input
                        id="name"
                        type="text"
                        className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                        placeholder=""
                        onChange={handleChange}
                      />
                    </label>

                    <label className="block">
                      <span className="text-gray-700">Icon name</span>
                      <input
                        id="icon"
                        type="text"
                        className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                        placeholder=""
                      />
                    </label>
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
