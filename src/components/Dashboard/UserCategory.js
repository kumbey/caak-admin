import { useState, useEffect } from "react";

import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getReturnData } from "../../utility/Util";
import { listUserCategoryByUser } from "../../graphql-custom/category/queries";

const UserCategory = ({ userId }) => {
  const [cats, setCats] = useState([]);

  const getCategory = async (id) => {
    try {
      const resp = await API.graphql(
        graphqlOperation(listUserCategoryByUser, { user_id: id })
      );
      setCats(getReturnData(resp).items);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    getCategory(userId);
  }, [userId]);

  return (
    <div className="grid grid-cols-3 gap-2">
      {cats.map((cat, i) => {
        return (
          <p
            key={i}
            className="mr-4"
          >{`${cat.category.icon} ${cat.category.name}`}</p>
        );
      })}
    </div>
  );
};

export default UserCategory;
