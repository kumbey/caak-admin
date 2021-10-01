import { Route } from "react-router-dom";
import { useUser } from "../../context/userContext";
import WithOutAuth from "../auth/WithoutAuth";
import TopBar from "../TopBar";
import MenuBar from "../MenuBar";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <>
            <TopBar />
            <MenuBar />
            <Component {...props} />
          </>
        ) : (
          <WithOutAuth />
        )
      }
    />
  );
};

export default PrivateRoute;
