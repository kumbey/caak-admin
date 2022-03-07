import { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";

import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import { useToast } from "../../../../components/Toast/ToastProvider";
import { getReturnData } from "../../../../utility/Util";
import Select from "../../../../components/Select";
import { getAccouningtRequest } from "../../../../graphql-custom/accountingReq/queries";
import {
  doTransaction,
  updateAccouningtRequest,
} from "../../../../graphql-custom/accountingReq/mutation";
import { useUser } from "../../../../context/userContext";

const CreateBalance = ({ editId, show, setShow, currReq }) => {
  const initData = {
    pack: "",
    meta: {
      amount: 0,
    },
  };
  const [data, setData] = useState(initData);
  const { user } = useUser();
  const [loading, setLoading] = useState();
  const [localAmount, setLocalAmount] = useState(0);
  const [rejectReason, setRejectReason] = useState("");
  const { addToast } = useToast();
  const [isValid, setIsValid] = useState(false);
  const [showReason, setShowReason] = useState(false);

  const getAccReq = async () => {
    setLoading(true);

    try {
      if (editId !== "new" && editId !== "init") {
        const resp = await API.graphql(
          graphqlOperation(getAccouningtRequest, { id: editId })
        );
        const meta = JSON.parse(getReturnData(resp).meta);
        setData({ ...getReturnData(resp), meta: meta });
      } else {
        setData(initData);
      }
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };
  const rejectReq = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const accReqData = {
        id: data.id,
        pack: data.pack,
        phoneNumber: data.phoneNumber,
        status: "REJECTED",
        userStatus: `${data.user_id}#REJECTED`,
        user_id: data.user_id,

        meta: JSON.stringify([
          ...data.meta,
          {
            action: "REJECTED",
            amount: localAmount,
            updatedAt: data.updatedAt,
            requested_user_id: data.user_id,
            rejected_user_id: user.sysUser.id,
            reject_reason: rejectReason,
          },
        ]),
      };

      const resp = await API.graphql(
        graphqlOperation(updateAccouningtRequest, {
          input: accReqData,
        })
      );

      addToast({
        content: getReturnData(resp).user.nickname,
        title: `Амжилттай татгалзлаа.`,
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

  const acceptReq = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      let resp = await API.graphql(
        graphqlOperation(doTransaction, {
          amount: localAmount,
          status: "INCREASE",
          user_id: data.user_id,
          desc: JSON.stringify({
            type: "CHARGE",
          }),
        })
      );
      resp = getReturnData(resp);
      resp = resp
        .toString()
        .replace("statusCode=", `"statusCode":`)
        .replace("body=", `"body":`);
      resp = JSON.parse(resp);

      if (resp.statusCode === 200) {
        updateAccBalance();
      }

      setLoading(false);
    } catch (ex) {
      setLoading(false);

      console.log(ex);
    }
  };

  const updateAccBalance = async () => {
    setLoading(true);
    try {
      const accReqData = {
        id: data.id,
        pack: data.pack,
        phoneNumber: data.phoneNumber,
        status: "ACCEPTED",
        userStatus: `${data.user_id}#ACCEPTED`,
        user_id: data.user_id,

        meta: JSON.stringify([
          ...data.meta,
          {
            action: "ACCEPTED",
            amount: localAmount,
            updatedAt: data.updatedAt,
            requested_user_id: data.user_id,
            accepted_user_id: user.sysUser.id,
          },
        ]),
      };

      const resp = await API.graphql(
        graphqlOperation(updateAccouningtRequest, {
          input: accReqData,
        })
      );

      addToast({
        content: getReturnData(resp).user.nickname,
        title: `Амжилттай зөвшөөрлөө.`,
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

  useEffect(() => {
    if (data.pack) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [data]);

  useEffect(() => {
    getAccReq();
    // eslint-disable-next-line
  }, [editId]);

  useEffect(() => {
    currReq && setLocalAmount(JSON.parse(currReq.meta)[0].amount);
  }, [currReq]);

  return (
    <Modal
      onSubmit={acceptReq}
      show={show}
      title={"Багцын хүсэлт"}
      content="content"
      onClose={() => {
        setShow(false);
      }}
      onCancel={(e) => {
        setShowReason(true);
        if (rejectReason.length > 0) {
          rejectReq(e);
          setShow(false);
        }
      }}
      type="submit"
      loading={loading}
      isValid={isValid}
      cancelBtnName={"Татгалзах"}
      submitBtnName={"Зөвшөөрөх"}
    >
      <div className="mt-8 max-w-md">
        <Select
          name={"type"}
          title="Багц"
          value={data.pack}
          onChange={(e) => {
            if (e.target.value === "caak100") {
              setLocalAmount(100000);
            } else if (e.target.value === "caak200") {
              setLocalAmount(200000);
            } else if (e.target.value === "caak500") {
              setLocalAmount(500000);
            } else if (e.target.value === "0") {
              setLocalAmount(data.meta.amount);
            }
            setData({ ...data, pack: e.target.value });
          }}
        >
          <option value={"caak100"}>Hybrid</option>
          <option value={"caak200"}>Premium</option>
          <option value={"caak500"}>Business</option>
          <option value={currReq && currReq.pack}>Задгай</option>
        </Select>
        <Input
          name={"amount"}
          value={localAmount}
          label="Багцын дүн"
          onChange={(e) => {
            let num = 0;
            currReq && setData({ ...data, pack: currReq.pack });
            !isNaN(e.target.value) ? (num = e.target.value) : (num = 0);
            num ? setLocalAmount(parseInt(num)) : setLocalAmount(0);
          }}
        />
        {showReason && (
          <Input
            name={"amount"}
            value={rejectReason}
            label="Татгалзах шалтгаан"
            onChange={(e) => {
              setRejectReason(e.target.value);
            }}
          />
        )}
      </div>
    </Modal>
  );
};

export default CreateBalance;
