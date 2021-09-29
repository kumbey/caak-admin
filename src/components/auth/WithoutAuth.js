import { useEffect } from "react";
import { useHistory, useLocation } from "react-router";

function WithoutAuth() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    history.push({ pathname: "/login", state: { background: location } });
    //eslint-disable-next-line
  }, []);

  return null;
}

export default WithoutAuth;