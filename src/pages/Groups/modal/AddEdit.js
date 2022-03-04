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
import { getReturnData } from "../../../utility/Util";

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
    featured: false,
    profile: null,
    cover: null,
    meta: {
      noAds: false,
      hidden: false,
    },
  };
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState();
  const [categories, setCategories] = useState([]);
  const { user } = useUser();
  const { addToast } = useToast();
  const [isChecked, setIsChecked] = useState();
  const [isNoAds, setIsNoAds] = useState();
  const [isHidden, setIsHidden] = useState();
  const [isValid, setIsValid] = useState(false);

  const fetchGroup = async () => {
    try {
      setLoading(true);
      if (editId !== "new" && editId !== "init") {
        let resp = await API.graphql(
          graphqlOperation(getGroup, { id: editId })
        );
        resp = getReturnData(resp);

        const meta = JSON.parse(resp.meta);
        setData({ ...resp, meta: meta });
        setIsChecked(resp.featured === "true" ? true : false);
        setIsNoAds(meta.noAds ? true : false);
        setIsHidden(meta.hidden ? true : false);
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
        meta: JSON.stringify({
          noAds: data.meta.noAds,
          hidden: data.meta.hidden,
        }),
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
          title: `Амжилттай үүслээ.`,
          content: `${resp.data.createGroup.name} амжилттай үүслээ.`,
          type: "update",
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
          title: `Амжилттай хадгаллаа.`,
          type: "update",
          content: `${resp.data.updateGroup.name} өөрчлөлтийг хадгаллаа.`,
          autoClose: true,
        });
      }
      setLoading(false);
      setIsChecked(false);
      setIsNoAds(false);
      setIsHidden(false);

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
    const { name, checked } = e.target;
    if (name === "noAds") {
      setIsNoAds(checked);
      setData({ ...data, meta: { ...data.meta, [name]: checked } });
    } else if (name === "hidden") {
      setIsHidden(checked);
      setData({ ...data, meta: { ...data.meta, [name]: checked } });
    } else {
      setIsChecked(checked);
      setData({ ...data, [name]: checked });
    }
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
  const close = () => {
    setIsChecked(false);
    setIsNoAds(false);
    setIsHidden(false);
    setShow(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    fetchGroup();
    // eslint-disable-next-line
  }, [editId]);

  useEffect(() => {
    if (
      data.name &&
      data.category &&
      data.about &&
      data.cover &&
      data.profile
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [data]);

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
      isValid={isValid}
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
          <CheckBox
            title={"No Ads нэмэх"}
            label={"No Ads"}
            name="noAds"
            value={isNoAds ? true : false}
            checked={isNoAds}
            onChange={(e) => handleCheck(e)}
          />
          <CheckBox
            title={"Группыг нуух"}
            label={"Нуух"}
            name="hidden"
            value={isHidden ? true : false}
            checked={isHidden}
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
