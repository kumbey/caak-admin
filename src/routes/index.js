import Categories from "../pages/Categories/Categories";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import HomePage from "../pages/HomePage";
import Groups from "../pages/Groups/Groups";

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
    page: () => <Categories />,
  },
  {
    path: "/groups",
    exact: true,
    background: true,
    auth: true,
    page: () => <Groups />,
  },
];

export default Routes;
