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
import CheckBox from "../../../components/CheckBox";

const AddEdit = ({
  editId,
  show,
  setShow,
  setGroups,
  currentIndex,
  groups,
}) => {
  const initData = {
    name: "",
    about: "",
    category: {
      id: "",
    },
    featured: "",
    profile: null,
    cover: null,
  };
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState();
  const [categories, setCategories] = useState([]);
  const [oldImageFiles, setOldImageFiles] = useState({});
  const { user } = useUser();
  const { addToast } = useToast();
  const [isChecked, setIsChecked] = useState();

  const fetchGroup = async () => {
    try {
      setLoading(true);
      if (editId !== "new" && editId !== "init") {
        const resp = await API.graphql(
          graphqlOperation(getGroup, { id: editId })
        );
        setData(resp.data.getGroup);
        setIsChecked(resp.data.getGroup.featured === "true" ? true : false);
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
    try {
      const coverImage =
        data.cover && !data.cover.id
          ? await uploadFile(data.cover)
          : data.cover;
      const profileImage =
        data.profile && !data.profile.id
          ? await uploadFile(data.profile)
          : data.profile;
      setData({ ...data, cover: coverImage, profile: profileImage });

      const postData = {
        name: data.name,
        featured: data.featured,
        category_id: data.category.id,
        about: data.about,
        groupCoverId: coverImage?.id,
        groupProfileId: profileImage?.id,
      };

      if (editId === "new") {
        postData.founder_id = user.sysUser.id;
        const resp = await API.graphql(
          graphqlOperation(createGroup, {
            input: postData,
          })
        );
        setGroups((prevState) => [...prevState, resp.data.createGroup]);
        addToast({
          content: `${resp.data.createGroup.name} амжилттай үүслээ.`,
          autoClose: true,
        });
      } else if (editId !== "new" && editId !== "init") {
        postData.id = data.id;

        const resp = await API.graphql(
          graphqlOperation(updateGroup, {
            input: postData,
          })
        );
        let arr = groups;
        arr[currentIndex] = resp.data.updateGroup;
        setGroups(arr);
        addToast({
          content: `${resp.data.updateGroup.name} өөрчлөлтийг хадгаллаа.`,
          autoClose: true,
        });

        // if (
        //   oldImageFiles.cover.id !== data.cover.id &&
        //   oldImageFiles.profile.id !== data.profile.id
        // ) {
        //   await API.graphql(
        //     graphqlOperation(deleteFile, { input: oldImageFiles.cover.id })
        //   );
        // }
      }
      setLoading(false);
      setIsChecked(false);

      setShow(false);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getCategories = async () => {
    try {
      setLoading(true);
      const resp = await API.graphql(graphqlOperation(getCategoryList));
      setCategories(resp.data.listCategorys.items);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const setFile = (key, file) => {
    setData({ ...data, [key]: file });
  };

  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
    const { name, checked } = e.target;
    setData({ ...data, [name]: checked });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // value = JSON.stringify(value);
    setData({ ...data, [name]: value });
  };
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    let category = { ...data[name] };
    category.id = value;
    setData({ ...data, [name]: category });
  };

  useEffect(() => {
    getCategories();
    console.log(data);
  }, []);

  useEffect(() => {
    fetchGroup();
    // eslint-disable-next-line
  }, [editId]);

  const close = () => {
    setIsChecked(false);
    setShow(false);
  };
  return (
    <Modal
      onSubmit={updateGroupData}
      show={show}
      title={
        editId !== "new" && editId !== "init"
          ? "Өөрчлөлт оруулах"
          : "Шинэ бүлэг үүсгэх"
      }
      content="content"
      onClose={() => close()}
      type="submit"
      loading={loading}
      submitBtnName={
        editId !== "new" && editId !== "init" ? "Хадгалах" : "Шинэ бүлэг үүсгэх"
      }
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
                  {`${cat.icon} ${cat.name}`}
                </option>
              );
            })}
          </Select>

          <CheckBox
            title={"Санал болгох группд нэмэх"}
            label={"Санал болгох"}
            name="featured"
            value={isChecked ? true : false}
            checked={isChecked}
            onChange={(e) => handleCheck(e)}
          />
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
