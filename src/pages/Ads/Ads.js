import { useState, useEffect } from "react";
import Button from "../../components/Button";
import AddEdit from "./modal/AddEdit";

const Ads = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [editId, setEditId] = useState("init");
  const [currentIndex, setCurrentIndex] = useState("init");
  const [deleteId, setDeleteId] = useState("init");
  const [showAlert, setShowAlert] = useState(false);

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
          <h1>CAAK ADS</h1>
          <div className="flex mt-4">
            <Button className="bg-primary-400" onClick={() => setEditId("new")}>
              Шинэ баннер үүсгэх
            </Button>
          </div>
        </div>
      </div>
      <AddEdit
        groups={groups}
        currentIndex={currentIndex}
        setGroups={setGroups}
        editId={editId}
        show={isShowModal}
        setShow={setIsShowModal}
      />
    </div>
  );
};

export default Ads;
