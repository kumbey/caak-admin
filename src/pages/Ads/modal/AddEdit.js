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
import { useToast } from "../../../components/Toast/ToastProvider";
import ColorPicker from "../../../components/ColorPicker/ColorPicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, getDiffDays } from "../../../utility/Util";

import moment from "moment";
import { convertDateTime } from "../../../components/utils";

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

  const { addToast } = useToast();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [hexColor, setHexColor] = useState({});
  const [text, setText] = useState();
  const [url, setUrl] = useState();
  const [dayLen, setDayLen] = useState(0);

  const fetchBanner = async () => {
    try {
      setLoading(true);
      if (editId !== "new" && editId !== "init") {
        const resp = await API.graphql(
          graphqlOperation(getBanner, { id: editId })
        );
        const meta = JSON.parse(resp.data.getBanner.meta);
        setStartDate(moment(resp.data.getBanner.start_date, "YYYY-MM-DD")._d);
        setEndDate(moment(resp.data.getBanner.end_date, "YYYY-MM-DD")._d);

        setDayLen(
          getDiffDays(
            moment(resp.data.getBanner.start_date, "YYYY-MM-DD")._d,
            moment(resp.data.getBanner.end_date, "YYYY-MM-DD")._d
          )
        );
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
        start_date: startDate ? startDate : null,
        end_date: endDate ? endDate : null,
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
  const removeDays = (start, end) => {
    let result;
    result = end - start;
    console.log(result);
    return result;
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

  useEffect(() => {
    fetchBanner();
    // eslint-disable-next-line
  }, [editId]);

  useEffect(() => {
    let res = addDays(startDate, dayLen);
    setEndDate(res);

    setData({
      ...data,
      start_date: startDate && startDate.toISOString(),
      end_date: res && res.toISOString(),
    });
  }, [startDate, dayLen]);

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
          <Select
            name={"type"}
            title="Баннер сонгох"
            value={data.type || "A1"}
            onChange={handleChange}
          >
            {types.map((type, index) => {
              return (
                <option key={index} value={type.value}>
                  {`${type.name}`}
                </option>
              );
            })}
          </Select>
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
          {data.type !== "A2" ? (
            <>
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
            </>
          ) : null}

          <Input
            name={"url"}
            value={data.meta.url}
            label="Линк"
            onChange={(e) => setUrl(e.target.value)}
          />
          <Input
            value={dayLen}
            label="Хоног"
            onChange={(e) => setDayLen(e.target.value)}
          />
          <h4>Огноо</h4>
          <div className=" flex items-center justify-between ">
            <div className="react-datepicker-time__input  border-gray-300 border rounded-md  w-48">
              <DatePicker
                selected={startDate || ""}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="yyyy/MM/d, h:mm aa"
              />
            </div>
          </div>
          <h4>Дуусах огноо</h4>
          <p>{convertDateTime(endDate?.toISOString())}</p>
          {data.type !== "A2" ? (
            <>
              <h4>Өнгө</h4>

              <div className="relative flex items-center justify-between">
                <p className="mr-10">Border color 1</p>
                <ColorPicker
                  name={"border_color1"}
                  hexColor={
                    data.meta.colors ? data.meta.colors.border_color1 : ""
                  }
                  setHexColor={setHexColor}
                />
              </div>
              <div className="relative flex items-center justify-between">
                <p className="mr-10">Border color 2</p>
                <ColorPicker
                  name={"border_color2"}
                  hexColor={
                    data.meta.colors ? data.meta.colors.border_color2 : ""
                  }
                  setHexColor={setHexColor}
                />
              </div>
              <div className="relative flex items-center justify-between">
                <p className="mr-10">Text background color</p>
                <ColorPicker
                  name={"text_bg_color"}
                  hexColor={
                    data.meta.colors ? data.meta.colors.text_bg_color : ""
                  }
                  setHexColor={setHexColor}
                />
              </div>
              <div className="relative flex items-center justify-between">
                <p className="mr-10">Text background hover color</p>

                <ColorPicker
                  name={"text_bg_hover_color"}
                  hexColor={
                    data.meta.colors ? data.meta.colors.text_bg_hover_color : ""
                  }
                  setHexColor={setHexColor}
                />
              </div>
              <div className="relative flex items-center justify-between">
                <p className="mr-10">Text color</p>
                <ColorPicker
                  name={"text_color"}
                  hexColor={data.meta.colors ? data.meta.colors.text_color : ""}
                  setHexColor={setHexColor}
                />
              </div>
              <div className="relative flex items-center justify-between">
                <p className="mr-10">Text hover color</p>
                <ColorPicker
                  name={"text_hover_color"}
                  hexColor={
                    data.meta.colors ? data.meta.colors.text_hover_color : ""
                  }
                  setHexColor={setHexColor}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default AddEdit;
