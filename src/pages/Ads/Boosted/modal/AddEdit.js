import { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";

import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import { useToast } from "../../../../components/Toast/ToastProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, getDiffDays, getReturnData } from "../../../../utility/Util";
import { updateBoostedPost } from "../../../../graphql-custom/boost/mutation";
import moment from "moment";
import { convertDateTime } from "../../../../components/utils";
import { getBoostedPost } from "../../../../graphql-custom/boost/queries";

const AddEdit = ({
  editId,
  show,
  setShow,
  setBoostedPosts,
  currentIndex,
  boostedPosts,
}) => {
  const initData = {
    id: "",
    start_date: new Date(),
    end_date: new Date(),
    dayLen: 0,
  };

  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState();

  const { addToast } = useToast();

  const [isValid, setIsValid] = useState(false);

  const getBoosted = async () => {
    try {
      setLoading(true);
      if (editId !== "new" && editId !== "init") {
        const resp = await API.graphql(
          graphqlOperation(getBoostedPost, { id: editId })
        );
        // const meta = JSON.parse(resp.data.getBoostedPost.meta);

        setData({
          ...resp.data.getBoostedPost,
          start_date: moment(resp.data.getBoostedPost.start_date)._d,
          end_date: moment(resp.data.getBoostedPost.end_date)._d,
          dayLen: getDiffDays(
            moment(resp.data.getBoostedPost.start_date)._d,
            moment(resp.data.getBoostedPost.end_date)._d
          ),
        });
      }
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const updateBoostData = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const postData = {
        id: editId,
        user_id: data.post.user_id,
        start_date: data.start_date ? data.start_date.toISOString() : null,
        end_date: data.end_date ? data.end_date.toISOString() : null,
        status: "ACTIVE",
      };
      if (editId !== "new" && editId !== "init") {
        postData.id = editId;
        const resp = await API.graphql(
          graphqlOperation(updateBoostedPost, {
            input: postData,
          })
        );
        let arr = boostedPosts;
        arr[currentIndex] = resp.data.updateBoostedPost;
        setBoostedPosts(arr);
        addToast({
          content: getReturnData(resp).post.title,
          title: `Өөрчлөлтийг хадгаллаа.`,
          autoClose: true,
          type: "update",
        });
      }
      setLoading(false);
      setShow(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const close = () => {
    setShow(false);
  };

  useEffect(() => {
    let res = addDays(data.start_date, data.dayLen);
    setData({
      ...data,
      end_date: res,
    });
  }, [data.start_date, data.dayLen]);

  useEffect(() => {
    if (data.dayLen && data.start_date) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [data]);

  useEffect(() => {
    getBoosted();
    // eslint-disable-next-line
  }, [editId]);

  return (
    <Modal
      onSubmit={updateBoostData}
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
      isValid={isValid}
      submitBtnName={
        editId !== "new" && editId !== "init" ? "Өөрчлөх" : "Шинэ баннер үүсгэх"
      }
    >
      <div className="mt-8 max-w-md">
        <div className="grid grid-cols-1 gap-6">
          <Input
            value={data.dayLen}
            label="Хоног"
            onChange={(e) => setData({ ...data, dayLen: e.target.value })}
          />
          <h4>Огноо</h4>
          <div className=" flex items-center justify-between ">
            <div className="react-datepicker-time__input  border-gray-300 border rounded-md  w-48">
              <DatePicker
                selected={data.start_date}
                onChange={(date) => setData({ ...data, start_date: date })}
                // onChange={(date) => console.log(date)}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="yyyy/MM/d, HH:mm:ss"
                calendarStartDay={1}
              />
            </div>
          </div>

          <h4>Дуусах огноо</h4>

          <p>
            {show && !loading && data.end_date
              ? convertDateTime(data?.end_date?.toISOString())
              : null}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AddEdit;
