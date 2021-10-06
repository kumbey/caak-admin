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

const AddEdit = ({ editId, show, setShow, addToast }) => {
  const initData = {
    name: "",
    icon: "",
  };
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState();

  useEffect(() => {
    fetchCategory(editId);
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
    event.preventDefault(event);

    setLoading(true);

    if (editId !== "new" && editId !== "init") {
      try {
        const result = await API.graphql({
          query: updateCategory,
          variables: { input: data },
        });
        addToast({
          content: `${result.data.updateCategory.name} амжилттай өөрчиллөө`,
          title: "Амжилттай",
          autoClose: true,
        });
      } catch (error) {
        console.log(error);
      }
    } else if (editId === "new") {
      try {
        setLoading(true);
        const result = await API.graphql({
          query: createCategory,
          variables: { input: data },
        });
        setLoading(false);
        addToast({
          content: `${result.data.createCategory.name} амжилттай үүслээ`,
          title: "Амжилттай",
          autoClose: true,
        });

        setData({
          name: "",
          icon: "",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  useEffect(() => {
    console.log("data===> ", data);
  }, [data]);

  return (
    <Modal
      show={show}
      //   title="Шинэ категори үүсгэх"
      title={`${
        editId === "new" ? "Шинэ категори үүсгэх" : "Категори өөрчлөх"
      } `}
      content="content"
      onClose={() => setShow(false)}
      onSubmit={handleSubmit}
      type="submit"
      loading={loading}
      submitBtnName={`${
        editId === "new" ? "Шинэ категори үүсгэх" : "Категори өөрчлөх"
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
