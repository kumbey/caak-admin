import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";

import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import { useToast } from "../../../components/Toast/ToastProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getReturnData } from "../../../utility/Util";
import { updatePost } from "../../../graphql-custom/post/mutation";
import moment from "moment";
import { getPostView } from "../../../graphql-custom/post/queries";
import Button from "../../Button";

const EditDraft = ({ editId, show, setShow, setPosts, posts }) => {
  const initData = {
    id: "",
    createdAt: new Date(),
  };
  let now = new Date();
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");

  const { addToast } = useToast();

  const [isValid, setIsValid] = useState(false);

  const getDraft = async () => {
    try {
      setLoading(true);

      if (editId !== "new" && editId !== "init") {
        const resp = await API.graphql(
          graphqlOperation(getPostView, { id: editId })
        );
        setData({
          ...resp.data.getPost,
          createdAt: moment(resp.data.getPost.createdAt)._d,
        });
      }
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const updateDraft = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        id: editId,
        createdAt: data.createdAt ? data.createdAt.toISOString() : null,
        status: "CONFIRMED",
        expectedVersion: data.version,
      };
      const resp = await API.graphql(
        graphqlOperation(updatePost, {
          input: postData,
        })
      );
      setPosts(posts.filter((post) => post.id !== resp.data.updatePost.id));
      addToast({
        content: getReturnData(resp).title,
        title: `Амжилттай нийтэллээ.`,
        autoClose: true,
        type: "update",
      });
      setLoading(false);
      setShow(false);
      setData(initData);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const close = () => {
    setShow(false);
    setData(initData);
  };

  useEffect(() => {
    if (!error) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [data, error]);

  useEffect(() => {
    getDraft();
  }, [editId]);

  return (
    <Modal
      onSubmit={updateDraft}
      show={show}
      title={"Нийтлэх"}
      content="content"
      onClose={() => close()}
      type="submit"
      loading={loading}
      isValid={isValid}
      submitBtnName={"Нийтлэх"}
    >
      <div className="mt-8 max-w-md">
        <div className="grid grid-cols-1 gap-6">
          <div className=" flex flex-col  items-center justify-start ">
            <div className="flex flex-row react-datepicker-time__input  border-gray-300 border rounded-md  w-full">
              <DatePicker
                selected={data.createdAt}
                onChange={(date) => {
                  setError("");
                  now > date
                    ? setData({ ...data, createdAt: date })
                    : setError("Цагаа зөв сонгоно уу");
                }}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="yyyy/MM/d, HH:mm:ss"
                calendarStartDay={1}
                maxDate={new Date()}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setData({ ...data, createdAt: new Date() });
                  setError("");
                }}
                className={" bg-primary-200 px-2"}
              >
                Одоо
              </button>
            </div>

            <p className="w-full ml-2 text-red">{error}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditDraft;
