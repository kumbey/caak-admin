import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";

import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getCategoryByID } from "../../../graphql-custom/category/queries";
import {
  createCategory,
  updateCategory,
} from "../../../graphql-custom/category/mutation";

const AddEdit = ({
  editId,
  show,
  setShow,
  addToast,
  categories,
  setCategories,
  currentIndex,
}) => {
  const initData = {
    name: "",
    icon: "",
  };
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState();

  useEffect(() => {
    fetchCategory(editId); // eslint-disable-next-line
  }, [editId]);

  const fetchCategory = async (id) => {
    try {
      setLoading(true);
      if (id !== "new" && id !== "init") {
        const resp = await API.graphql(
          graphqlOperation(getCategoryByID, { id: id })
        );

        setData(resp.data.getCategory);
      } else if (id === "new") {
        setData(initData);
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

      const resp = await API.graphql(
        graphqlOperation(createCategory, { input: data })
      );

      setCategories((prev) => [...prev, resp.data.createCategory]);

      addToast({
        content: `${resp.data.createCategory.name} амжилттай үүслээ.`,
        title: "Амжилттай",
        autoClose: true,
      });
      setLoading(false);
    } else if (editId !== "new" && editId !== "init") {
      delete data.createdAt;
      delete data.updatedAt;
      const resp = await API.graphql(
        graphqlOperation(updateCategory, { input: data })
      );

      let arr = categories;
      arr[currentIndex] = resp.data.updateCategory;
      setCategories(arr);
      addToast({
        content: `өөрчлөлтийг хадгаллаа.`,
        title: "Амжилттай",
        autoClose: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Modal
      show={show}
      title={`${
        editId !== "new" && editId !== "init"
          ? "Өөрчлөлт оруулах"
          : "Шинэ категори үүсгэх"
      } `}
      content="content"
      onClose={() => setShow(false)}
      onSubmit={handleSubmit}
      type="submit"
      loading={loading}
      submitBtnName={`${
        editId !== "new" && editId !== "init" ? "Хадгалах" : "Категори үүсгэх"
      } `}
    >
      <div className="mt-8 max-w-md">
        <div className="grid grid-cols-1 gap-6">
          <Input
            name={"name"}
            value={data.name}
            label="Категори нэр"
            onChange={handleChange}
          />
          <Input
            name={"icon"}
            value={data.icon}
            label="Категори айкон нэр"
            onChange={handleChange}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddEdit;
