import { useState, useEffect } from "react";

import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getFileUrl, getGenderImage, getReturnData } from "../../utility/Util";
import { listGroupUsersByGroup } from "../../graphql-custom/group/queries";

const GroupAdmins = ({ groupId }) => {
  const [admins, setAdmins] = useState([]);

  const getAdmins = async (id) => {
    try {
      const resp = await API.graphql(
        graphqlOperation(listGroupUsersByGroup, { group_id: id })
      );
      setAdmins(getReturnData(resp).items);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    getAdmins(groupId);
  }, [groupId]);

  return (
    <div className="grid grid-cols-2 gap-2">
      {admins.map((admin, i) => {
        return admin.role === "ADMIN" || admin.role === "MODERATOR" ? (
          <div key={i} className="flex items-center">
            <img
              onClick={() =>
                window.open(
                  `https://www.beta.caak.mn/user/${admin.user.id}/profile`
                )
              }
              className="mr-2 w-8 h-8 object-cover cursor-pointer rounded-full"
              src={
                admin?.user?.pic
                  ? getFileUrl(admin.user.pic)
                  : getGenderImage("default")
              }
              alt={""}
            />
            <p
              onClick={() =>
                window.open(
                  `https://www.beta.caak.mn/user/${admin.user.id}/profile`
                )
              }
              className="line-clamp cursor-pointer "
            >
              {admin.user.nickname}
            </p>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default GroupAdmins;
