import API from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { getUser } from "../../graphql-custom/user/queries";

const Login = () => {
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const doSignIn = async () => {
      try{
        let resp = await Auth.signIn(username, password)
        console.log(resp)
      }catch(ex){
        console.log(ex)
      }
  }

  async function printUser(){
    const user =  await Auth.currentAuthenticatedUser();
    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];

    if(groups.includes('caak-admin')){
      console.log(user.attributes.sub)
      try{
        let resp = await API.graphql(graphqlOperation(getUser, {id : user.attributes.sub}))
        console.log(resp)
      }catch(ex){
        console.log(ex)
      }

    }else{
      console.log("NORMAL USER")
    }
  }

  useEffect(() => {
    printUser()
  },[])


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
            <Input
              type="text"
              placeholder="example@example.com"
              value={username}
              id="email"
              onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
