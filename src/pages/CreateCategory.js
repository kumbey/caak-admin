import React from "react";
import Tables from "../components/Tables";

const CreateCategory = () => {
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
            ></input>
            <button>
              <i className="las la-plus-circle text-4xl pl-2"></i>
            </button>
          </div>
        </div>
        <div className="mb-4">
          <Tables styles="striped" fullWidth="w-full"></Tables>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
