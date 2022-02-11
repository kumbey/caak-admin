import { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";

import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import { useToast } from "../../../../components/Toast/ToastProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, getReturnData } from "../../../../utility/Util";
import { createBoostedPost } from "../../../../graphql-custom/boost/mutation";
import { convertDateTime } from "../../../../components/utils";

const CreateBoost = ({ editId, show, setShow }) => {
  const initData = {
    post_id: "",
    start_date: new Date(),
    end_date: new Date(),
    dayLen: 0,
  };

  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState();

  const { addToast } = useToast();

  const [isValid, setIsValid] = useState(false);

  const updateBoostData = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const postData = {
        post_id: editId,
        start_date: data.start_date ? data.start_date.toISOString() : null,
        end_date: data.end_date ? data.end_date.toISOString() : null,
        status: "ACTIVE",
      };
      const resp = await API.graphql(
        graphqlOperation(createBoostedPost, {
          input: postData,
        })
      );

      addToast({
        content: getReturnData(resp).post.title,
        title: `Амжилттай бүүстэллээ.`,
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
    console.log("post_id:", editId);
  }, [editId]);

  return (
    <Modal
      onSubmit={updateBoostData}
      show={show}
      title={
        editId !== "new" && editId !== "init"
          ? "Шинэ Бүүст үүсгэх"
          : "Шинэ баннер үүсгэх"
      }
      content="content"
      onClose={() => close()}
      type="submit"
      loading={loading}
      isValid={isValid}
      submitBtnName={
        editId !== "new" && editId !== "init"
          ? "Бүүстлэх"
          : "Шинэ баннер үүсгэх"
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

export default CreateBoost;
