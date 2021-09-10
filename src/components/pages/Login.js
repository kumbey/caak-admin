import React from "react";
import Button from "../Button";

const Login = () => {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser({
      ...user,
      [id]: value,
    });
  };
  return (
    <div className="container flex h-screen items-center justify-center py-10 pt-20">
      <div className="w-full md:w-1/2 xl:w-1/3">
        <div className="mx-5 md:mx-10">
          <h2 className="uppercase">It’s Great To See You!</h2>
          <h4 className="uppercase">Login Here</h4>
        </div>
        <form className="card mt-5 p-5 md:p-10" action="index.html">
          <div className="mb-5">
            <label className="label block mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="form-control"
              placeholder="example@example.com"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label className="label block mb-2" htmlFor="password">
              Password
            </label>
            <label className="form-control-addon-within">
              <input
                id="password"
                type="password"
                className="form-control border-none"
                value={user.password}
                onChange={handleChange}
              />
              <span className="flex items-center pr-4">
                <button
                  type="button"
                  className="btn btn-link text-gray-600 dark:text-gray-600 la la-eye text-xl leading-none"
                  data-toggle="password-visibility"
                />
              </span>
            </label>
          </div>
          <div className="flex items-center">
            <a href="auth-forgot-password.html" className="text-sm uppercase">
              Forgot Password?
            </a>
            <Button
                className={"ml-auto"}
                uppercase
                type={"submit"}
                skin={"primary"}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
