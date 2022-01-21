import { useState, useEffect } from "react";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import Button from "../../components/Button";
import { listBannersByType } from "../../graphql-custom/banner/queries";
import AddEdit from "./modal/AddEdit";
import Tables from "../../components/Tables";
import { convertDateTime } from "../../components/utils";
import { getFileUrl, getGenderImage, getReturnData } from "../../utility/Util";
import Select from "../../components/Select";

const Ads = () => {
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

  const [isShowModal, setIsShowModal] = useState(false);
  const [banners, setBanners] = useState([]);
  const [editId, setEditId] = useState("init");
  const [currentIndex, setCurrentIndex] = useState("init");
  const [deleteId, setDeleteId] = useState("init");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedType, setSelectedType] = useState();

  const fetchBanners = async (e) => {
    setSelectedType(e.target.value);
    const resp = await API.graphql(
      graphqlOperation(listBannersByType, {
        sortDirection: "ASC",
        type: e.target.value,
      })
    );
    setBanners(getReturnData(resp).items);
  };

  const editHandler = (id, index) => {
    setEditId(id);
    setCurrentIndex(index);
  };

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
    <div className="flex flex-col w-screen h-screen font-sans workspace">
      <div className="">
        <div className="mb-4">
          <h1>CAAK ADS</h1>
          <div className="flex mt-4">
            <Button className="bg-primary-400" onClick={() => setEditId("new")}>
              Шинэ баннер үүсгэх
            </Button>
          </div>
        </div>
      </div>
      <div className="w-52 mb-5">
        <Select
          name={"category"}
          title="Категори сонгох"
          value={selectedType || "DEFAULT"}
          onChange={fetchBanners}
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
      <div className="mb-4">
        <Tables styles="hoverable table_bordered" fullWidth="w-full">
          <thead>
            <tr>
              <th className="text-left uppercase">NO</th>
              <th className="text-left uppercase">Нэр</th>
              <th className="text-left uppercase">Эхэлсэн огноо</th>
              <th className="text-left uppercase">Дуусах огноо</th>
              <th className="text-left uppercase">Засах</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center ">
                      <img
                        className="mr-2 w-12 h-12 object-cover cursor-pointer"
                        src={
                          banner?.pic1
                            ? getFileUrl(banner?.pic1)
                            : getGenderImage("default")
                        }
                        alt={""}
                      />
                      <p className="cursor-pointer line-clamp">
                        {banner.title}
                      </p>
                    </div>
                  </td>

                  <td>{convertDateTime(banner.start_date)}</td>
                  <td>{convertDateTime(banner.end_date)}</td>
                  <td>
                    <span
                      onClick={() => editHandler(banner.id, index)}
                      className={"cursor-pointer"}
                    >
                      <i className="text-2xl las la-edit" />
                    </span>
                    {/* <span
                      onClick={() => setDeleteId(group.id)}
                      className={"cursor-pointer"}
                    >
                      <i className="ml-4 text-2xl las la-trash-alt" />
                    </span> */}
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
    </div>
  );
};

export default Ads;
