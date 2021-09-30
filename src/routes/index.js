import CreateCategory from "../pages/CreateCategory";
import Login from "../pages/Login";
import Logout from "../pages/Logout";

const Routes = [
  {
    path: "/",
    exact: true,
    auth: true,
    page: () => <Home />,
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
  {
    path: "/category",
    exact: true,
    background: true,
    unAuth: false,
    page: () => <CreateCategory />,
  },
];

export default Routes;
