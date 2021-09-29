import { useHistory, useLocation } from "react-router";
import { useEffect } from "react";
import { useUser } from "../../context/userContext";

const WithAuth = () => {
  const { user } = useUser();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      if (!user.sysUser) {
        history.push({
          pathname: "/register/main",
          state: { background: location, onlyInfo: true },
        });
      }
    }
    // eslint-disable-next-line
  }, [user]);

  return null;
};

export default WithAuth;