import { useState, useEffect, useMemo } from "react";
import Tables from "../Tables";
import { getFileUrl, getGenderImage, getReturnData } from "../../utility/Util";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { convertDateTime } from "../utils";
import { useToast } from "../../components/Toast/ToastProvider";

import placeholder from "./../../../src/assets/images/placeholder.png";
import Pagination from "../Pagination/Pagination";

import { ListReportedPostOrderByCreatedAt } from "../../graphql-custom/report/queries";
import Loader from "../Loader";
import Edit from "../../pages/ReportTypes/modal/Edit";

const ReportList = ({ PageSize }) => {
  let count = 0;

  const [reportedPosts, setReportedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    count = (currentPage - 1) * PageSize;

    return reportedPosts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, reportedPosts]);

  const { addToast } = useToast();

  const [showAlert, setShowAlert] = useState(false);
  const [currPost, setCurrPost] = useState({});

  const [editId, setEditId] = useState("init");
  const [deleteId, setDeleteId] = useState("init");
  const [currentIndex, setCurrentIndex] = useState("init");
  const [isShowModal, setIsShowModal] = useState(false);
  const [loading, setLoading] = useState();

  const getAllReportedPosts = async () => {
    setLoading(true);

    try {
      const resp = await API.graphql(
        graphqlOperation(ListReportedPostOrderByCreatedAt, {
          sortDirection: "DESC",
          typeName: "REPORTED_POST",
          limit: 5000,
        })
      );
      setReportedPosts(getReturnData(resp).items);
      setLoading(false);
    } catch (ex) {
      setLoading(false);

      console.log(ex);
    }
  };

  const editHandler = (id, report, index) => {
    setEditId(id);
    setCurrPost(report);
    setCurrentIndex(index);
  };

  useEffect(() => {
    getAllReportedPosts();
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
  return reportedPosts.length > 0 ? (
    <div className="mb-4 mr-2">
      <Tables styles="hoverable table_bordered" fullWidth="w-full">
        <thead>
          <tr>
            <th className="text-left uppercase">NO</th>
            <th className="text-left uppercase w-96">Пост</th>
            <th className="text-left uppercase w-60">Репорт</th>
            <th className="text-left uppercase w-40">Репортлогчийн нэр</th>
            <th className="text-left uppercase w-36">Үүссэн огноо</th>
            <th className="text-left uppercase w-20">Статус</th>
            <th className="text-left uppercase">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((report, index) => {
            count++;
            return (
              <tr
                key={index}
                className={`${report.status === "CHECKED" ? "bg-red-50" : ""}`}
              >
                <td>{count}</td>

                <td
                  onClick={() =>
                    window.open(
                      `https://www.caak.mn/post/view/${report.post.id}`
                    )
                  }
                >
                  <div className="flex items-center">
                    <div
                      className="mr-2"
                      style={{ minWidth: "48px", minHeight: "48px" }}
                    >
                      <img
                        className=" cursor-pointer w-12 h-12 object-cover"
                        src={
                          report?.post?.items?.items[0]?.file?.type?.startsWith(
                            "video"
                          )
                            ? placeholder
                            : report?.post?.items?.items[0]?.file
                            ? getFileUrl(report?.post?.items?.items[0]?.file)
                            : getGenderImage("default")
                        }
                        alt="image"
                      />
                    </div>
                    <p className="truncate-3 w-96 cursor-pointer">
                      {report?.post?.title}
                    </p>
                  </div>
                </td>

                <td>{report?.reason}</td>
                <td>
                  <div className="flex items-center">
                    <img
                      onClick={() =>
                        window.open(
                          `https://www.caak.mn/user/${report?.user?.id}/profile`
                        )
                      }
                      className="mr-2 cursor-pointer rounded-full"
                      style={{ height: "32px", width: "32px" }}
                      src={
                        report?.user?.pic
                          ? getFileUrl(report?.user.pic)
                          : getGenderImage("default")
                      }
                      alt={report?.user.pic?.type}
                    />
                    <p
                      onClick={() =>
                        window.open(
                          `https://www.caak.mn/user/${report?.user?.id}/profile`
                        )
                      }
                      className="cursor-pointer line-clamp"
                    >
                      {report?.user?.nickname}
                    </p>
                  </div>
                </td>
                <td className="text-xs">
                  {convertDateTime(report?.createdAt)}
                </td>
                <td>
                  {report?.status === "CHECKED" ? "Зөвшөөрсөн" : "Шалгаагүй"}
                </td>
                <td className="flex my-4  border-none justify-center">
                  <span
                    data-bs-toggle="tooltip"
                    title={`Зөвшөөрөх`}
                    onClick={() => editHandler(report.id, report, index)}
                    className={"cursor-pointer"}
                  >
                    <i className="las la-edit text-2xl text-green" />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Tables>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={reportedPosts.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <Edit
        currPost={currPost}
        currentIndex={currentIndex}
        setCurrPost={setCurrPost}
        editId={editId}
        show={isShowModal}
        setIsShowModal={setIsShowModal}
        addToast={addToast}
      />
    </div>
  ) : (
    <Loader
      containerClassName={"self-center w-full h-[20px]"}
      className={`bg-blue-500 ${loading ? "opacity-100" : "opacity-0"}`}
    />
  );
};

export default ReportList;
