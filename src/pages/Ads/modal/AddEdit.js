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
import ColorPicker from "../../../components/ColorPicker/ColorPicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  };
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState();
  const [categories, setCategories] = useState([]);
  const [oldImageFiles, setOldImageFiles] = useState({});
  const { user } = useUser();
  const { addToast } = useToast();
  const [isChecked, setIsChecked] = useState();
  const [hex, setHex] = useState();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [numberOfDays, setNumberOfDays] = useState(null);

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

  const getDiffDays = (start, end) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((end - start) / oneDay) + 1;
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setNumberOfDays(getDiffDays(startDate, endDate));
  }, [startDate, endDate]);

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
      //   onSubmit={updateGroupData}
      show={show}
      title={
        editId !== "new" && editId !== "init"
          ? "Өөрчлөлт оруулах"
          : "Шинэ баннер үүсгэх"
      }
      content="content"
      onClose={() => close()}
      type="submit"
      loading={loading}
      submitBtnName={
        editId !== "new" && editId !== "init"
          ? "Хадгалах"
          : "Шинэ баннер үүсгэх"
      }
    >
      <div className="mt-8 max-w-md">
        <div className="grid grid-cols-1 gap-6">
          <Input
            name={"description"}
            value={data.description}
            label="Сурталчилгааны утга"
            onChange={handleChange}
          />

          <h4>Баннер зураг </h4>
          <DropZone
            title={"Drop it here"}
            keyName={"img"}
            file={data.img}
            setFile={setFile}
          />
          <h4>Баннер айкон</h4>
          <DropZone
            title={"Drop it here"}
            keyName={"icon"}
            file={data.icon}
            setFile={setFile}
          />
          <Input
            name={"banner_text"}
            value={data.banner_text}
            label="Баннер уриа үг"
            onChange={handleChange}
          />
          <Input
            name={"url"}
            value={data.url}
            label="Линк"
            onChange={handleChange}
          />
          <div className="relative flex items-center justify-between">
            <p className="mr-10">Border color 1</p>
            <ColorPicker setHex={setHex} />
          </div>
          <div className="relative flex items-center justify-between">
            <p className="mr-10">Border color 2</p>
            <ColorPicker setHex={setHex} />
          </div>
          <div className="relative flex items-center justify-between">
            <p className="mr-10">Text background color</p>
            <ColorPicker setHex={setHex} />
          </div>
          <div className="relative flex items-center justify-between">
            <p className="mr-10">Text background hover color</p>

            <ColorPicker setHex={setHex} />
          </div>
          <div className="relative flex items-center justify-between">
            <p className="mr-10">Text color</p>
            <ColorPicker setHex={setHex} />
          </div>
          <div className="relative flex items-center justify-between">
            <p className="mr-10">Text hover color</p>
            <ColorPicker setHex={setHex} />
          </div>
          <div className="flex items-center ">
            <p className="mr-28">
              Хоног: {numberOfDays > 0 ? numberOfDays : null}
            </p>
            <div className="border-gray-300 border rounded-md bg-primary">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddEdit;
