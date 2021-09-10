import React from "react";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState();
  const handleChange = (e) => {
    const { value } = e.target.value;
    setEmail(value);
  };
  return (
    <div className="container flex h-screen  items-center justify-center py-10 pt-20">
      <div className="w-full md:w-1/2 xl:w-1/3">
        <div className="mx-5 md:mx-10">
          <h2 className="uppercase">Forgot Password?</h2>
          <h4 className="uppercase">We'll Email You Soon</h4>
        </div>
        <form className="card mt-5 p-5 md:p-10" action="#">
          <div className="mb-5">
            <label className="label block mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="form-control"
              placeholder="example@example.com"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="flex">
            <button type="submit" className="btn btn_primary ml-auto uppercase">
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
