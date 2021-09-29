import { Fragment, useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import Consts from "../../utility/Consts";
import { checkUser, useQuery } from "../../utility/Util";
import Login from "../Login";

const QueryModals = () => {
  const { getQuery } = useQuery();
  const { user } = useUser();

  const [modals] = useState({
    signIn: <Login />,
  });

  let param = getQuery().get(Consts.signInUp);

  const [page, setPage] = useState("");

  useEffect(() => {
    setPage(definePage());
    // eslint-disable-next-line
  }, [user]);

  const definePage = () => {
    if (checkUser(user)) {
      if (Object.keys(user.sysUser).length <= 0) {
        // LOAD USER INFO PAGE HERE
        return page;
      } else {
        if (user.sysUser.category && user.sysUser.category.items.length <= 0) {
          //LOAD SELECT CATEGORY PAGE HERE
          return page;
        }
      }
    }
    return param;
  };

  return <Fragment>{modals[param]}</Fragment>;
};

export default QueryModals