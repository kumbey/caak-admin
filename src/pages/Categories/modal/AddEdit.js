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
    picture: "",
    pic_id: "",
  };
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState();
  const [isValid, setIsValid] = useState(false);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      if (editId !== "new" && editId !== "init") {
        const resp = await API.graphql(
          graphqlOperation(getCategoryByID, { id: editId })
        );

        setData({ ...resp.data.getCategory });
      } else {
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
        data.picture && !data.picture.id
          ? await uploadFile(data.picture)
          : data.picture;
      setData({ ...data, picture: catImg });
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
          type: "update",
          title: "Амжилттай",
          autoClose: true,
        });
      } else if (editId !== "new" && editId !== "init") {
        postData.id = data.id;
        // delete data.createdAt;
        // delete data.updatedAt;
        const resp = await API.graphql(
          graphqlOperation(updateCategory, { input: postData })
        );

        let arr = categories;
        arr[currentIndex] = resp.data.updateCategory;
        setCategories(arr);
        addToast({
          content: `${resp.data.updateCategory.name} өөрчлөлтийг хадгаллаа.`,
          title: "Амжилттай",
          type: "update",
          autoClose: true,
        });
      }
      setLoading(false);
      setIsShowModal(false);
    } catch (ex) {
      setLoading(false);

      console.log(ex);
    }
  };

  const setFile = (key, file) => {
    setData({ ...data, [key]: file });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    fetchCategory(); // eslint-disable-next-line
  }, [editId]);

  useEffect(() => {
    if (data.name && data.icon && data.picture) {
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
          : "Шинэ категори үүсгэх"
      } `}
      content="content"
      onClose={() => setIsShowModal(false)}
      onSubmit={handleSubmit}
      type="submit"
      loading={loading}
      isValid={isValid}
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
            keyName={"picture"}
            file={data.picture}
            setFile={setFile}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddEdit;
