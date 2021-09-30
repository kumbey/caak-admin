import { API, Auth, graphqlOperation } from "aws-amplify";
import { getUser } from "../graphql-custom/user/queries";

export async function isLogged(user, setUser) {
  try {
    const usr = await Auth.currentAuthenticatedUser();
    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];

    if(!groups.includes('caak-admin')){
      setUser(null)
      return false
    }

    if (usr && !user) {
      let resp = await API.graphql(
        graphqlOperation(getUser, { id: usr.attributes.sub })
      );
      setUser({ ...usr, sysUser: resp.data.getUser });
    } else if (usr && user) {
      if (!user.sysUser) {
        let resp = await API.graphql(
          graphqlOperation(getUser, { id: usr.attributes.sub })
        );
        setUser({ ...usr, sysUser: resp.data.getUser });
      }
    } else if (!usr) {
      setUser(null);
    } else {
      setUser(null);
    }
  } catch (ex) {

  }
}

export async function signIn(setUser) {
  try {
    const usr = await Auth.currentAuthenticatedUser();
    const groups = usr.signInUserSession.accessToken.payload["cognito:groups"];

    if(!groups.includes('caak-admin')){
      setUser(null)
      return false
    }

    let resp = await API.graphql(
      graphqlOperation(getUser, { id: usr.attributes.sub })
    );
    let data = resp.data.getUser;

    setUser({ ...usr, sysUser: data });
    
    return true
  } catch (ex) {
    console.log(ex);
  }
}
