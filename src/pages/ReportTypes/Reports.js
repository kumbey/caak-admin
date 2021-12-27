import { useEffect, useState } from "react";

import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import Tables from "../../components/Tables";
import Button from "../../components/Button";
import ConfirmAlert from "../../components/ConfirmAlert/ConfirmAlert";
import AddEdit from "./modal/AddEdit";
// import { generateTimeAgo } from "../../utility/Util";

import { convertDateTime } from "../../components/utils";
import { useToast } from "../../components/Toast/ToastProvider";
import { listReportTypes } from "../../graphql-custom/report/queries";
import { deleteReportType } from "../../graphql-custom/report/mutation";

const Reports = () => {
  const { addToast } = useToast();
  const [isShowModal, setIsShowModal] = useState(false);
  const [reports, setReports] = useState([]);

  const [editId, setEditId] = useState("init");

  const [deleteId, setDeleteId] = useState("init");
  const [currentIndex, setCurrentIndex] = useState("init");
  const [showAlert, setShowAlert] = useState(false);

  const editHandler = (id, index) => {
    setEditId(id);
    setCurrentIndex(index);
  };

  const deleteReportFunction = async (id) => {
    try {
      const resp = await API.graphql(
        graphqlOperation(deleteReportType, { input: { id } })
      );
      setShowAlert(false);
      setReports(
        reports.filter((report) => report.id !== resp.data.deleteReportType.id)
      );
      addToast({
        content: `Устгалаа`,
        title: "Амжилттай",
        autoClose: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    API.graphql(graphqlOperation(listReportTypes)).then((report) => {
      setReports(report.data.listReportTypes.items);
    });
  }, []);

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
          <h1>Репортууд</h1>

          <div className="flex mt-4">
            <Button className="bg-primary-400" onClick={() => setEditId("new")}>
              Шинэ репорт үүсгэх
            </Button>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <Tables styles="hoverable table_bordered" fullWidth="w-full">
          <thead>
            <tr>
              <th className="text-left uppercase">NO</th>
              <th className="text-left uppercase">Нэр</th>
              <th className="text-left uppercase">Тодорхойлолт</th>
              <th className="text-left uppercase">Статус</th>
              <th className="text-left uppercase">Үүссэн огноо</th>
              <th className="text-left uppercase">Зассан огноо</th>
              <th className="text-left uppercase">Засах</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{report.name}</td>
                  <td className="break-all ">{report.description}</td>

                  <td>{report.status}</td>

                  <td>{convertDateTime(report.createdAt)}</td>
                  <td>{`${
                    report.createdAt !== report.updatedAt
                      ? convertDateTime(report.updatedAt)
                      : "Засвар ороогүй"
                  }`}</td>
                  <td>
                    <span
                      onClick={() => editHandler(report.id, index)}
                      className={"cursor-pointer"}
                    >
                      <i className="las la-edit text-2xl " />
                    </span>
                    <span
                      onClick={() => {
                        setDeleteId(report.id);
                      }}
                      className={"cursor-pointer"}
                    >
                      <i className="las la-trash-alt text-2xl ml-4" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Tables>
      </div>
      <AddEdit
        reports={reports}
        currentIndex={currentIndex}
        setReports={setReports}
        editId={editId}
        show={isShowModal}
        setIsShowModal={setIsShowModal}
        addToast={addToast}
      />
      <ConfirmAlert
        show={showAlert}
        title="Та устгахдаа итгэлтэй байна уу?"
        onClose={() => setShowAlert(false)}
        onSubmit={() => deleteReportFunction(deleteId)}
      />
    </div>
  );
};

export default Reports;
