const groupsGetField = /* GraphQL */ `
  {
    items {
      about
      category {
        icon
        name
        createdAt
        updatedAt
      }
    }
  }
`;

export default groupsGetField;
