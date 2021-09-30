import API from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { useState } from "react";
import Button from "../components/Button";
import { getUser } from "../graphql-custom/user/queries";
import Input from "../components/Input";
import { useUser } from "../context/userContext";
import { signIn } from "../utility/Authenty";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const history = useHistory();
  const { setUser } = useUser();
  const doSignIn = async () => {
    try {
      let resp = await Auth.signIn(username, password);
      await signIn(setUser);
      history.replace("/");
      console.log(resp);
    } catch (ex) {
      console.log(ex);
    }
  };

  const togglePasswordVisible = () => {
    setIsPasswordVisible(isPasswordVisible ? false : true);
  };

  async function printUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const groups =
        user.signInUserSession.accessToken.payload["cognito:groups"];

      if (groups.includes("caak-admin")) {
        console.log(user.attributes.sub);
        let resp = await API.graphql(
          graphqlOperation(getUser, { id: user.attributes.sub })
        );
        console.log(resp);
      } else {
        console.log("NORMAL USER");
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <div className="container flex h-screen items-center justify-center py-10 pt-20">
      <div className="w-full md:w-1/2 xl:w-1/3">
        <div className="mx-5 md:mx-10">
          <h2 className="uppercase">ajks dshaj!</h2>
          <h4 className="uppercase">Login Here</h4>
        </div>
        <form
          className="card mt-5 p-5 md:p-10"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className=" mb-5">
            <label className=" label block mb-2" htmlFor=" email">
              Email
            </label>
            <label className="form-control-addon-within">
              <input
                id="email"
                type=" text"
                className="form-control border-none"
                placeholder=" example
                @example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-5">
            <label className="label block mb-2" htmlFor="password">
              Password
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
            <a href="auth-forgot-password.html" className="text-sm uppercase">
              Forgot Password?
            </a>
            <Button
              className={"ml-auto"}
              uppercase
              type={"submit"}
              skin={"primary"}
              onClick={doSignIn}
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
