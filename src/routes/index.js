import Login from "../pages/Login";
import Logout from "../pages/Logout";

const Routes = [
  {
    path: "/",
    exact: true,
    auth: true,
    page: () => <h3>Root home</h3>,
  },
  {
    path: "/profile",
    exact: true,
    auth: true,
    page: () => <h2>User Config page</h2>,
  },
  {
    path: "/logout",
    exact: true,
    background: true,
    page: () => <Logout />,
  },
  {
    path: "/login",
    exact: true,
    background: true,
    unAuth: true,
    page: () => <Login />,
  },
];

export default Routes;
