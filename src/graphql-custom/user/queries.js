import user0001 from "./fields/user0001";
import user0002 from "./fields/user0002";

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) ${user0001}
  }
`;

export const getUserID = /* GraphQL */ `
  query GetUserID($id: ID!) {
    getUser(id: $id) ${user0002}
  }
`;