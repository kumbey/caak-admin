import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import Tables from "../../../components/Tables";
import { useToast } from "../../../components/Toast/ToastProvider";
import AddEdit from "./modal/AddEdit";

import {
  getDiffDays,
  getFileUrl,
  getGenderImage,
  getReturnData,
  kFormatter,
} from "../../../utility/Util";
import moment from "moment";
import { convertDateTime } from "../../../components/utils";
import { listBoostedPosts } from "../../../graphql-custom/boost/queries";
import ConfirmAlert from "../../../components/ConfirmAlert/ConfirmAlert";
import { deleteBoostedPost } from "../../../graphql-custom/boost/mutation";
import { listAccouningtRequests } from "../../../graphql-custom/accountingReq/queries";
import Button from "../../../components/Button";
import CreateBalance from "./modal/CreateBalance";

const AccountingReqList = () => {
  const { addToast } = useToast();

  const [isShowModal, setIsShowModal] = useState(false);
  const [accReqs, setAccReqs] = useState([]);
  const [currReq, setCurrReq] = useState();
  const [editId, setEditId] = useState("init");
  const [currentIndex, setCurrentIndex] = useState("init");
  const [deleteId, setDeleteId] = useState("init");
  const [showAlert, setShowAlert] = useState(false);

  const date = new Date();
  const now = date.toISOString();

  const editHandler = (id, req) => {
    setEditId(id);
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

  // const delBoost = async (id) => {
  //   try {
  //     const resp = await API.graphql(
  //       graphqlOperation(deleteBoostedPost, {
  //         input: { id },
  //       })
  //     );
  //     setShowAlert(false);
  //     addToast({
  //       content: getReturnData(resp).post.title,
  //       title: `Амжилттай устгалаа.`,
  //       autoClose: true,
  //       type: "delete",
  //     });
  //     //Removing item from local state after removed from the server.
  //     const filteredArray = boostedPosts.filter(
  //       (item) => item.id !== resp.data.deleteBoostedPost.id
  //     );
  //     setBoostedPosts(filteredArray);
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // };

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

  useEffect(() => {
    console.log(accReqs);
  }, [accReqs]);

  return (
    <div className="flex flex-col font-sans   ">
      <div className="">
        <div className="mb-4">
          <Tables styles="hoverable table_bordered" fullWidth="w-full">
            <thead>
              <tr>
                <th className="text-center uppercase">NO</th>
                <th className="text-left uppercase w-96">Нэр</th>
                <th className="text-center uppercase w-20">Багцын нэр</th>
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
                    className={`${accReq.end_date < now ? "bg-red-50" : ""}`}
                  >
                    <td className="text-center">{index + 1}</td>
                    <td>
                      <p
                        onClick={() =>
                          window.open(
                            `https://www.caak.mn/user/${accReq.user_id}/profile`
                          )
                        }
                        className=" truncate-3 w-20 cursor-pointer"
                      >
                        {accReq.user.nickname}
                      </p>
                    </td>
                    <td>
                      <p className=" truncate-3 w-20">{accReq.pack}</p>
                    </td>
                    <td>
                      <p className=" truncate-3 w-auto">{`${accReq.pack} ${accReq.phoneNumber}`}</p>
                    </td>
                    <td>
                      <p className=" truncate-3 w-auto">
                        {`${JSON.parse(accReq.meta)[0]?.bank?.name}`}
                      </p>
                    </td>
                    <td>{convertDateTime(accReq.createdAt)}</td>
                    <td>
                      <p className=" truncate-3 w-auto">{`${accReq.phoneNumber}`}</p>
                    </td>
                    <td>
                      <p className=" truncate-3 w-auto ">
                        {`${JSON.parse(accReq.meta)[0].amount}`}
                      </p>
                    </td>
                    <td>
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
                    </td>
                    <td>
                      <Button
                        className="h-6 w-6 p-0 text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out"
                        data-bs-toggle="tooltip"
                        title={`Буцаан олголт`}
                        // onClick={()=>accReq.status==="ACCEPTED" && refundHandler()}
                      >
                        <span
                          className={`${
                            accReq.status === "ACCEPTED"
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
                          } `}
                        >
                          <i
                            className={`${
                              accReq.status === "ACCEPTED"
                                ? "text-green"
                                : "text-gray-600"
                            } text-2xl las la-undo`}
                          />
                        </span>
                      </Button>
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
    </div>
  );
};

export default AccountingReqList;
