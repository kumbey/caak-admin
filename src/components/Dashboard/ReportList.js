import { useState, useEffect, useMemo } from "react";
import Tables from "../Tables";
import { getFileUrl, getGenderImage } from "../../utility/Util";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { convertDateTime } from "../utils";
import { useToast } from "../../components/Toast/ToastProvider";
import ConfirmAlert from "../ConfirmAlert/ConfirmAlert";
import {
  deleteReportedPost,
  updateReportedPost,
} from "../../graphql-custom/report/mutation";
import placeholder from "./../../../src/assets/images/placeholder.png";
import Pagination from "../Pagination/Pagination";

const ReportList = ({ reportedPosts, setReportedPosts }) => {
  let PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return reportedPosts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const { addToast } = useToast();

  const [showAlert, setShowAlert] = useState(false);

  const [deleteId, setDeleteId] = useState("init");
  const [selectedType, setSelectedType] = useState();

  const handleClick = (id, type) => {
    setDeleteId(id);
    setSelectedType(type);
  };

  const deleteReportFunction = async (id) => {
    try {
      const resp = await API.graphql(
        graphqlOperation(deleteReportedPost, { input: { id } })
      );
      setShowAlert(false);
      setReportedPosts(
        reportedPosts.filter(
          (report) => report.id !== resp.data.deleteReportedPost.id
        )
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
  const acceptReportFunction = async (id) => {
    try {
      await API.graphql(
        graphqlOperation(updateReportedPost, {
          input: { id: id, status: "CHECKED" },
        })
      );
      setShowAlert(false);

      addToast({
        content: `Зөвшөөрлөө`,
        title: "Амжилттай",
        autoClose: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
            {/* <th className="text-left uppercase">Баталгаажсан огноо</th> */}
            <th className="text-left uppercase">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((report, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>

                <td
                  onClick={() =>
                    window.open(
                      `https://www.beta.caak.mn/post/view/${report.post.id}`
                    )
                  }
                >
                  <div className="flex items-center">
                    <img
                      className="mr-2 cursor-pointer w-12 h-12 object-cover"
                      src={
                        report?.post?.items?.items[0]?.file?.type?.startsWith(
                          "video"
                        )
                          ? placeholder
                          : report?.post?.items?.items
                          ? getFileUrl(report?.post?.items.items[0].file)
                          : getGenderImage("default")
                      }
                      alt="image"
                    />
                    <p className="line-clamp cursor-pointer">
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
                          `https://www.beta.caak.mn/user/${report?.user?.id}/profile`
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
                          `https://www.beta.caak.mn/user/${report?.user?.id}/profile`
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
                  {report?.status === "CHECKED" ? "Идэвхтэй" : "Идэвхгүй"}
                </td>
                {/* <td>{convertDateTime(report?.updatedAt)}</td> */}
                <td className="flex my-4  border-none">
                  <span
                    onClick={() => handleClick(report?.id, "accept")}
                    className={"cursor-pointer "}
                  >
                    <i className="las la-check-circle text-2xl text-green" />
                  </span>
                  <span
                    onClick={() => handleClick(report?.id, "delete")}
                    className={"cursor-pointer"}
                  >
                    <i className="las la-trash-alt text-2xl text-red ml-4" />
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
      {selectedType === "accept" ? (
        <ConfirmAlert
          show={showAlert}
          title="Та зөвшөөрөхдөө итгэлтэй байна уу?"
          onClose={() => setShowAlert(false)}
          onSubmit={() => acceptReportFunction(deleteId)}
        />
      ) : (
        <ConfirmAlert
          show={showAlert}
          title="Та устгахдаа итгэлтэй байна уу?"
          onClose={() => setShowAlert(false)}
          onSubmit={() => deleteReportFunction(deleteId)}
        />
      )}
    </div>
  );
};

export default ReportList;
