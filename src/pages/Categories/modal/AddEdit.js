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
import DropZone from "../../../components/Dropzone";
import { ApiFileUpload } from "../../../utility/ApiHelper";

const AddEdit = ({
  editId,
  show,
  setIsShowModal,
  addToast,
  categories,
  setCategories,
  currentIndex,
}) => {
  const initData = {
    name: "",
    icon: "",
    pic: null,
  };
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState();

  const setFile = (key, file) => {
    setData({ ...data, [key]: file });
  };

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

    const uploadFile = async (image) => {
      return await ApiFileUpload(image);
    };
    setLoading(true);
    try {
      const catImg =
        data.pic && !data.pic.id ? await uploadFile(data.pic) : data.pic;
      setData({ ...data, pic: catImg });
      const postData = {
        name: data.name,
        icon: data.icon,
        pic_id: catImg?.id,
      };

      if (editId === "new") {
        const resp = await API.graphql(
          graphqlOperation(createCategory, { input: postData })
        );

        setCategories((prev) => [...prev, resp.data.createCategory]);

        addToast({
          content: `${resp.data.createCategory.name} амжилттай үүслээ.`,
          title: "Амжилттай",
          autoClose: true,
        });
        setIsShowModal(false);
      } else if (editId !== "new" && editId !== "init") {
        postData.id = data.id;
        delete data.createdAt;
        delete data.updatedAt;
        const resp = await API.graphql(
          graphqlOperation(updateCategory, { input: postData })
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
      setLoading(false);
    } catch (ex) {
      setLoading(false);

      console.log(ex);
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
      onClose={() => setIsShowModal(false)}
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
          <h4>Категори зураг</h4>
          <DropZone
            title={"Drop it here"}
            keyName={"pic"}
            file={data.picture}
            setFile={setFile}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddEdit;
