import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import Tables from "../../../components/Tables";

import { getReturnData } from "../../../utility/Util";
import { convertDateTime } from "../../../components/utils";
import { listAccouningtRequests } from "../../../graphql-custom/accountingReq/queries";
import Button from "../../../components/Button";
import CreateBalance from "./modal/CreateBalance";
import EditRefund from "./modal/EditRefund";

const AccountingReqList = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [accReqs, setAccReqs] = useState([]);
  const [currReq, setCurrReq] = useState();
  const [editId, setEditId] = useState("init");
  const [currentIndex, setCurrentIndex] = useState("init");
  const [deleteId, setDeleteId] = useState("init");
  const [showAlert, setShowAlert] = useState(false);

  const editHandler = (id, req) => {
    setEditId(id);
    setCurrReq(req);
  };
  const refundHandler = (id, req) => {
    setDeleteId(id);
    setCurrReq(req);
  };

  const fetchAccountingReqList = async () => {
    try {
      const resp = await API.graphql(graphqlOperation(listAccouningtRequests));
      setAccReqs(
        getReturnData(resp).items.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      );
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    fetchAccountingReqList();
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
    <div className="flex flex-col font-sans   ">
      <div className="">
        <div className="mb-4">
          <Tables styles="hoverable table_bordered" fullWidth="w-full">
            <thead>
              <tr>
                <th className="text-center uppercase">NO</th>
                <th className="text-left uppercase w-36">Нэр</th>
                <th className="text-center uppercase w-36">Багцын нэр</th>
                <th className="text-left uppercase w-60">Утга</th>
                <th className="text-left uppercase w-60">Шилжүүлсэн банк</th>
                <th className="text-center uppercase w-24">Огноо</th>
                <th className="text-center uppercase w-24">Утасны дугаар</th>
                <th className="text-center uppercase w-24">
                  Зөвшөөрөгдсөн дүн
                </th>
                <th className="text-center uppercase w-24">Үйлдэл</th>
                <th className="text-center uppercase w-24">Буцаалт</th>
              </tr>
            </thead>
            <tbody>
              {accReqs.map((accReq, index) => {
                return (
                  <tr
                    key={index}
                    className={`${
                      accReq.status === "ACCEPTED"
                        ? "bg-green-50"
                        : accReq.status === "REJECTED"
                        ? "bg-red-50"
                        : accReq.status === "REFUND"
                        ? "bg-blue-50"
                        : ""
                    }`}
                  >
                    <td className="text-center">{index + 1}</td>
                    <td>
                      <p
                        onClick={() =>
                          window.open(
                            `https://www.caak.mn/user/${accReq.user_id}/profile`
                          )
                        }
                        className=" truncate-3 cursor-pointer"
                      >
                        {accReq.user.nickname}
                      </p>
                    </td>
                    <td>
                      <p className=" truncate-3 ">{accReq.pack}</p>
                    </td>
                    <td>
                      <p className=" truncate-3 ">{`${accReq.pack} ${accReq.phoneNumber}`}</p>
                    </td>
                    <td className="text-center">
                      <p className=" truncate-3 ">
                        {`${JSON.parse(accReq.meta)[0]?.bank?.name}`}
                      </p>
                    </td>
                    <td className="text-center">
                      {convertDateTime(accReq.createdAt)}
                    </td>
                    <td className="text-center">
                      <p className=" truncate-3 ">{`${accReq.phoneNumber}`}</p>
                    </td>
                    <td>
                      <p className=" truncate-3 text-center ">
                        {`${JSON.parse(accReq.meta)[0].amount}`}
                      </p>
                    </td>
                    <td className="text-center">
                      {accReq.status !== "ACCEPTED" &&
                      accReq.status !== "REJECTED" &&
                      accReq.status !== "REFUND" ? (
                        <Button
                          className="h-6 w-6 p-0 text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out"
                          data-bs-toggle="tooltip"
                          onClick={() => editHandler(accReq.id, accReq)}
                          title={`Зөвшөөрөх`}
                        >
                          <span className={`cursor-pointer`}>
                            <i
                              className={`text-green text-2xl las la-check-circle`}
                            />
                          </span>
                        </Button>
                      ) : null}
                    </td>
                    <td className="text-center">
                      {accReq.status === "ACCEPTED" ? (
                        <Button
                          className="h-6 w-6 p-0 text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out"
                          data-bs-toggle="tooltip"
                          title={`Буцаан олголт`}
                          onClick={() => refundHandler(accReq.id, accReq)}
                        >
                          <span className={`cursor-pointer`}>
                            <i className={`text-green las la-undo text-2xl`} />
                          </span>
                        </Button>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Tables>
        </div>
      </div>
      <CreateBalance
        accReqs={accReqs}
        currentIndex={currentIndex}
        setAccReqs={setAccReqs}
        editId={editId}
        show={isShowModal}
        setShow={setIsShowModal}
        currReq={currReq}
      />
      <EditRefund
        accReqs={accReqs}
        currentIndex={currentIndex}
        setAccReqs={setAccReqs}
        deleteId={deleteId}
        show={showAlert}
        setShow={setShowAlert}
        currReq={currReq}
      />
    </div>
  );
};

export default AccountingReqList;
