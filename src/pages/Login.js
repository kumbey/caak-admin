import Auth from "@aws-amplify/auth";
import { useState } from "react";
import Button from "../components/Button";
import { isAdmin } from "../utility/Authenty";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const doSignIn = async () => {
    try {
      await Auth.signIn(username, password);
      if (!(await isAdmin())) {
        alert("YOU ARE NOT ADMIN");
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const togglePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="container flex h-screen items-center justify-center py-10 pt-20">
      <div className="w-full md:w-1/2 xl:w-1/3">
        <div className="mx-5 md:mx-10">
          <h2 className="uppercase">CAAK АДМИН</h2>
          <h4 className="uppercase">Нэвтрэх</h4>
        </div>
        <form
          className="card mt-5 p-5 md:p-10"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className=" mb-5">
            <label className=" label block mb-2" htmlFor=" email">
              Имэйл
            </label>
            <label className="form-control-addon-within">
              <input
                id="email"
                type=" text"
                className="form-control border-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-5">
            <label className="label block mb-2" htmlFor="password">
              Нууц үг
            </label>
            <label className="form-control-addon-within">
              <input
                id="password"
                type={`${isPasswordVisible ? "text" : "password"}`}
                className="form-control border-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="flex items-center pr-4">
                <button
                  onClick={togglePasswordVisible}
                  type="button"
                  className="btn btn-link text-gray-600 dark:text-gray-600 la la-eye text-xl leading-none"
                />
              </span>
            </label>
          </div>
          <div className="flex items-center">
            <a href="/" className="text-sm uppercase">
              Нууц үгээ мартсан уу?
            </a>
            <Button
              className={"ml-auto"}
              uppercase
              type={"submit"}
              skin={"primary"}
              onClick={doSignIn}
            >
              Нэвтрэх
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
