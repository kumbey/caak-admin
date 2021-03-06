import { useState, useEffect } from "react";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import Button from "../../../components/Button";
import {
  listBanners,
  listBannersByType,
} from "../../../graphql-custom/banner/queries";
import AddEdit from "./modal/AddEdit";
import Tables from "../../../components/Tables";
import { convertDateTime } from "../../../components/utils";
import {
  getDiffDays,
  getFileUrl,
  getGenderImage,
  getReturnData,
} from "../../../utility/Util";
import Select from "../../../components/Select";
import ConfirmAlert from "../../../components/ConfirmAlert/ConfirmAlert";
import { useToast } from "../../../components/Toast/ToastProvider";
import { deleteBanner } from "../../../graphql-custom/banner/mutation";
import moment from "moment";

const Banners = () => {
  const types = [
    {
      name: "Бүгд",
      value: "All",
    },
    {
      name: "A1",
      value: "A1",
      tip: "Нүүр хуудас дээр харагдах модал баннер",
    },
    {
      name: "A2",
      value: "A2",
      tip: "Дэлгэрэнгүй дээр баруун талд харагдах баннер",
    },
    {
      name: "A3",
      value: "A3",
      tip: "Нүүр хуудсын хамгийн дээд хэсэгт харагдах баннер",
    },
  ];
  const { addToast } = useToast();
  const date = new Date();
  const now = date.toISOString();
  const [isShowModal, setIsShowModal] = useState(false);
  const [banners, setBanners] = useState([]);
  const [editId, setEditId] = useState("init");
  const [currentIndex, setCurrentIndex] = useState("init");
  const [deleteId, setDeleteId] = useState("init");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedType, setSelectedType] = useState("All");

  const fetchBanners = async () => {
    try {
      const resp = await API.graphql(
        graphqlOperation(listBanners, {
          type: selectedType,
        })
      );
      let res = getReturnData(resp).items.sort(function (a, b) {
        return new Date(b.start_date) - new Date(a.start_date);
      });
      setBanners(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  const fetchBannersType = async () => {
    const resp = await API.graphql(
      graphqlOperation(listBannersByType, {
        sortDirection: "ASC",
        type: selectedType,
      })
    );
    setBanners(getReturnData(resp).items);
  };

  const delBanner = async (id) => {
    try {
      const resp = await API.graphql(
        graphqlOperation(deleteBanner, {
          input: { id },
        })
      );
      setShowAlert(false);
      addToast({
        title: `Амжилттай устгалаа.`,
        content: `${resp.data.deleteBanner.title} амжилттай устгалаа.`,
        type: "delete",
        autoClose: true,
      });
      //Removing item from local state after removed from the server.
      const filteredArray = banners.filter(
        (item) => item.id !== resp.data.deleteBanner.id
      );
      setBanners(filteredArray);
    } catch (ex) {
      console.log(ex);
    }
  };

  const editHandler = (id, index) => {
    setEditId(id);
    setCurrentIndex(index);
  };

  const handleChange = (e) => {
    setSelectedType(e.target.value);
  };

  useEffect(() => {
    if (selectedType === "All") {
      fetchBanners();
    } else {
      fetchBannersType();
    }
  }, [selectedType]);

  useEffect(() => {
    if (editId !== "init") {
      setIsShowModal(true);
    }
  }, [editId]);

  useEffect(() => {
    if (!isShowModal) {
      setEditId("init");
    }
  }, [isShowModal]);

  useEffect(() => {
    if (!showAlert) {
      setDeleteId("init");
    }
  }, [showAlert]);

  useEffect(() => {
    if (deleteId !== "init") {
      setShowAlert(true);
    }
  }, [deleteId]);

  return (
    <div className="flex flex-col font-sans   ">
      <div className="">
        <div className="mb-4">
          <div className="flex">
            <Button className="bg-primary-400" onClick={() => setEditId("new")}>
              Шинэ баннер үүсгэх
            </Button>
          </div>
        </div>
      </div>
      <div className="w-52 mb-5">
        <Select
          name={"type"}
          title="Категори сонгох"
          value={selectedType}
          onChange={handleChange}
        >
          {/* <option value={"All"}>Сонгох...</option> */}
          {types.map((type, index) => {
            return (
              <option
                data-bs-toggle="tooltip"
                title={type.tip}
                key={index}
                value={type.value}
              >
                {`${type.name}`}
              </option>
            );
          })}
        </Select>
      </div>
      <div className="mb-4">
        <Tables styles="hoverable table_bordered" fullWidth="w-full">
          <thead>
            <tr>
              <th className="text-center uppercase">NO</th>
              <th className="text-left uppercase w-96">Нэр</th>
              <th className="text-center uppercase w-20">Хоног</th>
              <th className="text-left uppercase w-60">Эхэлсэн огноо</th>
              <th className="text-left uppercase w-60">Дуусах огноо</th>
              <th className="text-left uppercase w-20">Даралт</th>
              <th className="text-left uppercase w-24">Засах</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner, index) => {
              return (
                <tr
                  key={index}
                  className={`${banner.end_date < now ? "bg-red-50" : ""}`}
                >
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <div className="flex items-center ">
                      <img
                        className="mr-2 w-12 h-12 object-cover "
                        src={
                          banner?.pic1
                            ? getFileUrl(banner?.pic1)
                            : getGenderImage("default")
                        }
                        alt={""}
                      />
                      <p className=" truncate-3 w-96">{banner.title}</p>
                    </div>
                  </td>

                  <td>
                    <p className="text-center">
                      {getDiffDays(
                        moment(banner.start_date)._d,
                        moment(banner.end_date)._d
                      )}
                    </p>
                  </td>
                  <td>{convertDateTime(banner.start_date)}</td>
                  <td>{convertDateTime(banner.end_date)}</td>
                  <td className="text-center">
                    {banner.views ? banner.views : 0}
                  </td>
                  <td>
                    <div className="w-20">
                      <span
                        onClick={() => editHandler(banner.id, index)}
                        className={"cursor-pointer"}
                      >
                        <i className="text-2xl text-green las la-edit" />
                      </span>
                      <span
                        onClick={() => setDeleteId(banner.id)}
                        className={"cursor-pointer"}
                      >
                        <i className="ml-4 text-2xl text-red las la-trash-alt" />
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Tables>
      </div>
      <AddEdit
        banners={banners}
        currentIndex={currentIndex}
        setBanners={setBanners}
        editId={editId}
        show={isShowModal}
        setShow={setIsShowModal}
      />
      <ConfirmAlert
        title={"Та устгахдаа итгэлтэй байна уу"}
        show={showAlert}
        onClose={() => setShowAlert(false)}
        onSubmit={() => delBanner(deleteId)}
      />
    </div>
  );
};

export default Banners;
