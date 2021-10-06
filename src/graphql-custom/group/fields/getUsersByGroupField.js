const getUsersByGroupField = /* GraphQL */ `
  {
    nextToken
    items {
      role
      user {
        id
        firstname
        nickname
      }
    }
  }
`;

export default getUsersByGroupField;
