import { Route } from "react-router-dom";
import { useUser } from "../../context/userContext";
import WithOutAuth from "../auth/WithoutAuth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useUser();

  return (
    <Route
      {...rest}
      render={(props) => (user ? <Component {...props} /> : <WithOutAuth />)}
    />
  );
};

export default PrivateRoute;