import { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";

import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import { useToast } from "../../../../components/Toast/ToastProvider";
import { getReturnData } from "../../../../utility/Util";
import { getAccouningtRequest } from "../../../../graphql-custom/accountingReq/queries";
import {
  doTransaction,
  updateAccouningtRequest,
} from "../../../../graphql-custom/accountingReq/mutation";
import { useUser } from "../../../../context/userContext";

const EditRefund = ({ deleteId, show, setShow, currReq }) => {
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
  const [refundReason, setRefundReason] = useState("");
  const { addToast } = useToast();
  const [isValid, setIsValid] = useState(false);

  const getAccReq = async () => {
    setLoading(true);

    try {
      if (deleteId !== "new" && deleteId !== "init") {
        const resp = await API.graphql(
          graphqlOperation(getAccouningtRequest, { id: deleteId })
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
  const updateReq = async () => {
    setLoading(true);
    try {
      const accReqData = {
        id: data.id,
        pack: data.pack,
        phoneNumber: data.phoneNumber,
        status: "REFUND",
        userStatus: `${data.user_id}#REFUND`,
        user_id: data.user_id,

        meta: JSON.stringify([
          ...data.meta,
          {
            action: "REFUND",
            amount: localAmount,
            updatedAt: data.updatedAt,
            requested_user_id: data.user_id,
            refunded_user_id: user.sysUser.id,
            refund_reason: refundReason,
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

  const refundReq = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      let resp = await API.graphql(
        graphqlOperation(doTransaction, {
          amount: localAmount,
          status: "DECREASE",
          user_id: data.user_id,
          desc: JSON.stringify({
            type: "REFUND",
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
        updateReq();
      }
      if (resp.statusCode === 500) {
        console.log(resp);
      }

      setLoading(false);
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
  }, [deleteId]);

  useEffect(() => {
    currReq && setLocalAmount(parseInt(JSON.parse(currReq.meta)[0].amount));
  }, [currReq]);

  return (
    <Modal
      onSubmit={refundReq}
      show={show}
      title={"Буцаан олголт"}
      content="content"
      onClose={() => {
        setShow(false);
        setLocalAmount(0);
      }}
      onCancel={() => {
        setLocalAmount(0);
        setShow(false);
      }}
      type="submit"
      loading={loading}
      isValid={isValid}
      cancelBtnName={"Хаах"}
      submitBtnName={"Буцаалт"}
    >
      <div className="mt-8 max-w-md">
        <Input
          value={localAmount}
          label="Буцаан олгох дүн"
          onChange={(e) => {
            setLocalAmount(e.target.value);
          }}
        />
        <Input
          value={refundReason}
          label="Буцаан олгох шалтгаан"
          onChange={(e) => {
            setRefundReason(e.target.value);
          }}
        />
      </div>
    </Modal>
  );
};

export default EditRefund;
