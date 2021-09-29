import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Hub } from "aws-amplify";
import { isLogged, signIn } from "../utility/Authenty";
import SessionStorageUtil from "../utility/SessionStorageUtil";
import Consts from "../utility/Consts";

const UserContext = createContext();

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(`useUser must be used within a UserProvider`);
  }

  return context;
}

function UserProvider(props) {
  const [user, setUser] = useState(SessionStorageUtil.get(Consts.SS_UserKey));

  useEffect(() => {
    isLogged(user, setUser);

    Hub.listen("auth", ({ payload: { event } }) => {
      switch (event) {
        case "signOut":
          setUser(null);
          break;
        case "signIn":
          signIn(setUser);
          break;
        default:
          break;
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(user);
    if (user) {
      SessionStorageUtil.set(Consts.SS_UserKey, user);
    } else {
      SessionStorageUtil.remove(Consts.SS_UserKey);
    }
    // eslint-disable-next-line
  }, [user]);

  const value = useMemo(() => ({ user, setUser }), [user]);
  return <UserContext.Provider value={value} {...props} />;
}

export { UserProvider, useUser };
