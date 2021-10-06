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
import { updateGroup } from "../../../graphql-custom/group/mutation";

const AddEdit = ({ editId, show, setShow }) => {
  const [data, setData] = useState({
    name: "",
    about: "",
    category: {
      id: "",
    },
    profile: null,
    cover: null,
  });
  const [loading, setLoading] = useState();
  const [categories, setCategories] = useState([]);
  const [oldImageFiles, setOldImageFiles] = useState({});

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchGroup(editId);
  }, [editId]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(oldImageFiles);
  }, [oldImageFiles]);

  const fetchGroup = async (id) => {
    try {
      setLoading(true);
      if (id !== "new" && id !== "init") {
        const resp = await API.graphql(graphqlOperation(getGroup, { id: id }));
        setData(resp.data.getGroup);
        setOldImageFiles({
          profile: resp.data.getGroup.profile,
          cover: resp.data.getGroup.cover,
        });
      }
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const updateGroupData = async (e) => {
    e.preventDefault();

    setLoading(true);
    const newCoverImage =
      data.cover && !data.cover.id
        ? await ApiFileUpload(data.cover)
        : data.cover;
    const newProfileImage =
      data.profile && !data.profile.id
        ? await ApiFileUpload(data.profile)
        : data.profile;

    setData({
      ...data,
      cover: newCoverImage ?? (data.cover && newCoverImage),
      profile: newProfileImage ?? (data.profile && newProfileImage),
    });
    const uploadData = data;
    delete uploadData.category;
    delete uploadData.cover;
    delete uploadData.profile;
    delete uploadData.createdAt;
    delete uploadData.updatedAt;
    await API.graphql(
      graphqlOperation(updateGroup, {
        input: {
          ...uploadData,
          category_id: data.category.id,
          groupCoverId: data.cover.id,
          groupProfileId: data.profile.id,
        },
      })
    );
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
            value={data.category.id}
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
