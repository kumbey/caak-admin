import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import TextArea from "../../../components/TextArea";
import DropZone from "../../../components/Dropzone";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getCategoryList } from "../../../graphql-custom/category/queries";
import { getGroup } from "../../../graphql-custom/group/queries";
import { ApiFileUpload } from "../../../utility/ApiHelper";
import {
  createGroup,
  updateGroup,
} from "../../../graphql-custom/group/mutation";
import { useUser } from "../../../context/userContext";
import { useToast } from "../../../components/Toast/ToastProvider";

const AddEdit = ({ editId, show, setShow }) => {
  const initData = {
    name: "",
    about: "",
    category: {
      id: "",
    },
    profile: null,
    cover: null,
  };

  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState();
  const [categories, setCategories] = useState([]);
  const [oldImageFiles, setOldImageFiles] = useState({});
  const { user } = useUser();
  const { addToast } = useToast();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    fetchGroup();
  }, [editId]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(oldImageFiles);
  }, [oldImageFiles]);

  const fetchGroup = async () => {
    try {
      setLoading(true);
      if (editId !== "new" && editId !== "init") {
        const resp = await API.graphql(
          graphqlOperation(getGroup, { id: editId })
        );
        setData(resp.data.getGroup);
        setOldImageFiles({
          profile: resp.data.getGroup.profile,
          cover: resp.data.getGroup.cover,
        });
      } else {
        setData(initData);
      }
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const updateGroupData = async (e) => {
    e.preventDefault();

    const uploadFile = async (image) => {
      return await ApiFileUpload(image);
    };

    setLoading(true);
    const coverImage =
      data.cover && !data.cover.id ? await uploadFile(data.cover) : data.cover;
    const profileImage =
      data.profile && !data.profile.id
        ? await uploadFile(data.profile)
        : data.profile;
    setData({ ...data, cover: coverImage, profile: profileImage });

    const postData = {
      name: data.name,
      category_id: data.category.id,
      about: data.about,
      groupCoverId: coverImage.id,
      groupProfileId: profileImage.id,
    };

    if (editId === "new") {
      postData.founder_id = user.sysUser.id;
      const resp = await API.graphql(
        graphqlOperation(createGroup, {
          input: postData,
        })
      );
      addToast({
        content: `${resp.data.createGroup.name} амжилттай үүслээ.`,
      });
    } else if (editId !== "new" && editId !== "init") {
      postData.id = data.id;
      const resp = await API.graphql(
        graphqlOperation(updateGroup, {
          input: postData,
        })
      );
      addToast({
        content: `${resp.data.updateGroup.name} өөрчлөлтийг хадгаллаа.`,
      });
    }
    setLoading(false);
  };

  const getCategories = async () => {
    try {
      setLoading(true);
      const resp = await API.graphql(graphqlOperation(getCategoryList));
      setCategories(resp.data.listCategories.items);
      setLoading(false);
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
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    let category = { ...data[name] };
    category.id = value;
    setData({ ...data, [name]: category });
  };

  return (
    <Modal
      onSubmit={updateGroupData}
      show={show}
      title="Шинэ групп үүсгэх"
      content="content"
      onClose={() => setShow(false)}
      type="submit"
      loading={loading}
      submitBtnName="Шинэ групп нэмэх"
    >
      <div className="mt-8 max-w-md">
        <div className="grid grid-cols-1 gap-6">
          <Input
            name={"name"}
            value={data.name}
            label="Групп нэр"
            onChange={handleChange}
          />

          <Select
            name={"category"}
            title="Категори сонгох"
            value={data.category.id || "DEFAULT"}
            onChange={handleCategoryChange}
          >
            <option value={"DEFAULT"} disabled hidden>
              Сонгох...
            </option>
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              );
            })}
          </Select>

          <TextArea
            name="about"
            title="Тухай"
            row="4"
            value={data.about || ""}
            onChange={handleChange}
          />
          <h4>Cover image upload</h4>
          <DropZone
            title={"Drop it here"}
            keyName={"cover"}
            file={data.cover}
            setFile={setFile}
          />
          <h4>Profile image upload</h4>
          <DropZone
            title={"Drop it here"}
            keyName={"profile"}
            file={data.profile}
            setFile={setFile}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddEdit;
