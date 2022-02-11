import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";

import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {
  createReportType,
  updateReportType,
} from "../../../graphql-custom/report/mutation";
import { getReportType } from "../../../graphql-custom/report/queries";
import CheckBox from "../../../components/CheckBox";

const AddEdit = ({
  editId,
  show,
  setIsShowModal,
  addToast,
  reports,
  setReports,
  currentIndex,
}) => {
  const initData = {
    name: "",
    description: "",
    status: "",
  };
  const [data, setData] = useState(initData);
  const [isChecked, setIsChecked] = useState();
  const [loading, setLoading] = useState();
  const [isValid, setIsValid] = useState(false);

  const fetchReport = async (id) => {
    try {
      setLoading(true);
      if (id !== "new" && id !== "init") {
        const resp = await API.graphql(
          graphqlOperation(getReportType, { id: id })
        );
        setData(resp.data.getReportType);
        setIsChecked(
          resp.data.getReportType.status === "ACTIVE" ? true : false
        );
      } else if (id === "new") {
        setData(initData);
        setIsChecked(false);
      }
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    if (editId === "new") {
      setLoading(true);
      data.status = isChecked ? "ACTIVE" : "INACTIVE";
      const resp = await API.graphql(
        graphqlOperation(createReportType, { input: data })
      );

      setReports((prev) => [...prev, resp.data.createReportType]);

      addToast({
        content: `${resp.data.createReportType.name} амжилттай үүслээ.`,
        title: "Амжилттай",
        type: "update",
        autoClose: true,
      });
      setLoading(false);
      setIsShowModal(false);
    } else if (editId !== "new" && editId !== "init") {
      delete data.createdAt;
      delete data.updatedAt;
      data.status = isChecked ? "ACTIVE" : "INACTIVE";
      const resp = await API.graphql(
        graphqlOperation(updateReportType, { input: data })
      );

      let arr = reports;
      arr[currentIndex] = resp.data.updateReportType;
      setReports(arr);
      addToast({
        content: `өөрчлөлтийг хадгаллаа.`,
        title: "Амжилттай",
        autoClose: true,
      });
      setIsShowModal(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
    const { name, checked } = e.target;
    setData({ ...data, [name]: checked });
  };

  useEffect(() => {
    fetchReport(editId); // eslint-disable-next-line
  }, [editId]);

  useEffect(() => {
    if (data.name && data.description) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [data]);

  return (
    <Modal
      show={show}
      title={`${
        editId !== "new" && editId !== "init"
          ? "Өөрчлөлт оруулах"
          : "Шинэ репорт үүсгэх"
      } `}
      content="content"
      onClose={() => setIsShowModal(false)}
      onSubmit={handleSubmit}
      type="submit"
      loading={loading}
      isValid={isValid}
      submitBtnName={`${
        editId !== "new" && editId !== "init" ? "Хадгалах" : "Репорт үүсгэх"
      } `}
    >
      <div className="mt-8 max-w-md">
        <div className="grid grid-cols-1 gap-6">
          <Input
            name={"name"}
            value={data.name}
            label="Репортын нэр"
            onChange={handleChange}
          />
          <Input
            name={"description"}
            value={data.description}
            label="Репортын тодорхойлолт"
            onChange={handleChange}
          />
          <CheckBox
            title={"Статус"}
            label={"Репорт статус"}
            name="status"
            value={isChecked ? true : false}
            checked={isChecked}
            onChange={(e) => handleCheck(e)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddEdit;
