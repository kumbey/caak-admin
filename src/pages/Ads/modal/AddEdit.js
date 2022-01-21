import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import DropZone from "../../../components/Dropzone";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { ApiFileUpload } from "../../../utility/ApiHelper";

import {
  createBanner,
  updateBanner,
} from "../../../graphql-custom/banner/mutation";
import { getBanner } from "../../../graphql-custom/banner/queries";
import { useUser } from "../../../context/userContext";
import { useToast } from "../../../components/Toast/ToastProvider";
import ColorPicker from "../../../components/ColorPicker/ColorPicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const AddEdit = ({
  editId,
  show,
  setShow,
  setBanners,
  currentIndex,
  banners,
}) => {
  const initData = {
    title: "",
    pic1_id: "",
    pic2_id: "",
    start_date: "",
    end_date: "",
    meta: {
      colors: "",
      text: "",
      url: "",
    },
    type: "",
  };

  const types = [
    {
      name: "A1",
      value: "A1",
    },
    {
      name: "A2",
      value: "A2",
    },
  ];
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState();
  const [oldImageFiles, setOldImageFiles] = useState({});
  const { user } = useUser();
  const { addToast } = useToast();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [numberOfDays, setNumberOfDays] = useState(null);
  const [hexColor, setHexColor] = useState({});
  const [text, setText] = useState();
  const [url, setUrl] = useState();

  const fetchBanner = async () => {
    try {
      setLoading(true);
      if (editId !== "new" && editId !== "init") {
        const resp = await API.graphql(
          graphqlOperation(getBanner, { id: editId })
        );
        const meta = JSON.parse(resp.data.getBanner.meta);
        setData({
          ...resp.data.getBanner,
          meta: {
            colors: meta.colors,
            text: meta.text,
            url: meta.url,
          },
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
  const updateBannerData = async (e) => {
    e.preventDefault();

    const uploadFile = async (image) => {
      return await ApiFileUpload(image);
    };

    setLoading(true);
    try {
      const bigImg =
        data.pic1 && !data.pic1.id ? await uploadFile(data.pic1) : data.pic1;
      const smallImg =
        data.pic2 && !data.pic2.id ? await uploadFile(data.pic2) : data.pic2;
      setData({ ...data, pic1: bigImg, pic2: smallImg });

      const postData = {
        title: data.title,
        pic1_id: bigImg?.id,
        pic2_id: smallImg?.id,
        meta: JSON.stringify({
          colors: data.meta.colors,
          text: data.meta.text,
          url: data.meta.url,
        }),
        type: data.type,
        start_date: startDate && startDate,
        end_date: endDate && endDate,
        typeName: "BANNER",
      };

      if (editId === "new") {
        const resp = await API.graphql(
          graphqlOperation(createBanner, {
            input: postData,
          })
        );
        setBanners((prevState) => [...prevState, resp.data.createBanner]);
        addToast({
          content: `${resp.data.createBanner.title} амжилттай үүслээ.`,
          autoClose: true,
        });
      } else if (editId !== "new" && editId !== "init") {
        postData.id = data.id;

        const resp = await API.graphql(
          graphqlOperation(updateBanner, {
            input: postData,
          })
        );
        let arr = banners;
        arr[currentIndex] = resp.data.updateBanner;
        setBanners(arr);
        addToast({
          content: `${resp.data.updateBanner.title} өөрчлөлтийг хадгаллаа.`,
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
      setShow(false);
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
    // value = JSON.stringify(value);
    setData({ ...data, [name]: value });
  };
  const close = () => {
    setShow(false);
  };

  const getDiffDays = (start, end) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((end - start) / oneDay) + 1;
  };

  useEffect(() => {
    setNumberOfDays(getDiffDays(startDate, endDate));
  }, [startDate, endDate]);

  useEffect(() => {
    fetchBanner();
    // eslint-disable-next-line
  }, [editId]);

  useEffect(() => {
    setData({
      ...data,
      start_date: startDate && startDate.toISOString(),
      end_date: endDate && endDate.toISOString(),
    });
  }, [dateRange]);

  useEffect(() => {
    setData({
      ...data,
      meta: { ...data.meta, colors: { ...data.meta.colors, ...hexColor } },
    });
  }, [hexColor]);

  useEffect(() => {
    setData({
      ...data,
      meta: { ...data.meta, text: text },
    });
  }, [text]);

  useEffect(() => {
    setData({
      ...data,
      meta: { ...data.meta, url: url },
    });
  }, [url]);

  useEffect(() => {
    console.log(editId);
  }, [editId]);

  useEffect(() => {
    console.log("orig hex:", hexColor);
    console.log(data);
  }, [data]);

  return (
    <Modal
      onSubmit={updateBannerData}
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
            name={"title"}
            value={data.title}
            label="Сурталчилгааны утга"
            onChange={handleChange}
          />

          <h4>Баннер зураг </h4>
          <DropZone
            title={"Drop it here"}
            keyName={"pic1"}
            file={data.pic1}
            setFile={setFile}
          />
          <h4>Баннер айкон</h4>
          <DropZone
            title={"Drop it here"}
            keyName={"pic2"}
            file={data.pic2}
            setFile={setFile}
          />
          <Input
            name={"text"}
            value={data.meta.text}
            label="Баннер уриа үг"
            onChange={(e) => setText(e.target.value)}
          />
          <Input
            name={"url"}
            value={data.meta.url}
            label="Линк"
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="relative flex items-center justify-between">
            <p className="mr-10">Border color 1</p>
            <ColorPicker
              name={"border_color1"}
              hexColor={
                data.meta.colors ? data.meta.colors.border_color1 : hexColor
              }
              setHexColor={setHexColor}
            />
          </div>
          <div className="relative flex items-center justify-between">
            <p className="mr-10">Border color 2</p>
            <ColorPicker
              name={"border_color2"}
              hexColor={
                data.meta.colors ? data.meta.colors.border_color2 : hexColor
              }
              setHexColor={setHexColor}
            />
          </div>
          <div className="relative flex items-center justify-between">
            <p className="mr-10">Text background color</p>
            <ColorPicker
              name={"text_bg_color"}
              hexColor={
                data.meta.colors ? data.meta.colors.text_bg_color : hexColor
              }
              setHexColor={setHexColor}
            />
          </div>
          <div className="relative flex items-center justify-between">
            <p className="mr-10">Text background hover color</p>

            <ColorPicker
              name={"text_bg_hover_color"}
              hexColor={
                data.meta.colors
                  ? data.meta.colors.text_bg_hover_color
                  : hexColor
              }
              setHexColor={setHexColor}
            />
          </div>
          <div className="relative flex items-center justify-between">
            <p className="mr-10">Text color</p>
            <ColorPicker
              name={"text_color"}
              hexColor={
                data.meta.colors ? data.meta.colors.text_color : hexColor
              }
              setHexColor={setHexColor}
            />
          </div>
          <div className="relative flex items-center justify-between">
            <p className="mr-10">Text hover color</p>
            <ColorPicker
              name={"text_hover_color"}
              hexColor={
                data.meta.colors ? data.meta.colors.text_hover_color : hexColor
              }
              setHexColor={setHexColor}
            />
          </div>
          <div className="flex items-center ">
            <p className="mr-28">
              Хоног: {numberOfDays > 0 ? numberOfDays : null}
            </p>
            <div className="border-gray-300 border rounded-md bg-primary">
              <DatePicker
                selectsRange={true}
                startDate={
                  data.start_date ? moment(data.start_date)._d : startDate
                }
                endDate={data.end_date ? moment(data.end_date)._d : endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
              />
            </div>
          </div>

          <Select
            name={"type"}
            title="Төрөл сонгох"
            value={data.type || "DEFAULT"}
            onChange={handleChange}
          >
            <option value={"DEFAULT"} disabled hidden>
              Сонгох...
            </option>
            {types.map((type, index) => {
              return (
                <option key={index} value={type.value}>
                  {`${type.name}`}
                </option>
              );
            })}
          </Select>
        </div>
      </div>
    </Modal>
  );
};

export default AddEdit;
