import React from "react";

const Register = () => {
  const [user, setUser] = React.useState({
    name: "",
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
          <h2 className="uppercase">Create Your Account</h2>
          <h4 className="uppercase">Let's Roll</h4>
        </div>
        <form className="card mt-5 p-5 md:p-10" action="#">
          <div className="mb-5">
            <label className="label block mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="John Doe"
              value={user.name}
              onChange={handleChange}
            />
          </div>
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
                  className="btn btn-link la la-eye text-gray-600 text-xl leading-none"
                  data-toggle="password-visibility"
                />
              </span>
            </label>
          </div>
          <div className="flex">
            <button type="submit" className="btn btn_primary ml-auto uppercase">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
