import user0001 from "./fields/user0001";
import user0002 from "./fields/user0002";
import user0003 from "./fields/user0003";

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

export const listUsers = /* GraphQL */ `
  query ListUsers {
    listUsers ${user0003}
  }
`;

export const getUserCategory = /* GraphQL */ `
  query GetUserCategory($id: ID!) {
    getUserCategory(id: $id) {
      id
      user_id
      category_id
      createdAt
      updatedAt
      category {
        id
        name
        icon
        createdAt
        updatedAt
      }
    }
  }
`;
