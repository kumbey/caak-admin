import React, { useState } from "react";
import Tables from "../components/Tables";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Button from "../components/Button";

const CreateGroup = () => {
  const [isShowModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [iconName, setIconName] = useState("");

  const toggleModal = () => {
    setShowModal(!isShowModal);
  };

  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log(groupName);
    console.log(iconName);
    console.log("clicked");
  };

  return (
    <div className="flex-col  h-screen w-screen flex  font-sans ">
      <div className=" p-6 m-4 w-full  lg:max-w-lg md:max-w-2xl">
        <div className="mb-4">
          <h1>Группууд</h1>
          <div className="flex mt-4">
            <Button className="bg-primary-400" onClick={() => toggleModal()}>
              Шинэ групп үүсгэх
            </Button>
          </div>
        </div>
        <div className="mb-4">
          <Tables styles="striped" fullWidth="w-full"></Tables>
          <Modal
            show={isShowModal}
            title="Шинэ групп үүсгэх"
            content="content"
            onClose={() => setShowModal(false)}
            type="submit"
            onSubmit={onSubmit}
            submitBtnName="Шинэ групп нэмэх"
          >
            <div className="mt-8 max-w-md">
              <div className="grid grid-cols-1 gap-6">
                <Input
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  label="групп нэр"
                />
                <Input
                  value={iconName}
                  onChange={(e) => setIconName(e.target.value)}
                  label="Icon нэр"
                />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
