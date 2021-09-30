import CreateCategory from "../pages/CreateCategory";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Home from "../pages/Home";
import HomePage from "../pages/HomePage";
import CreateGroup from "../pages/CreateGroup";

const Routes = [
  {
    path: "/",
    exact: true,
    auth: true,
    page: () => <HomePage />,
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
    path: "/categories",
    exact: true,
    background: true,
    auth: true,
    page: () => <CreateCategory />,
  },
  {
    path: "/groups",
    exact: true,
    background: true,
    auth: true,
    page: () => <CreateGroup />,
  },
];

export default Routes;
