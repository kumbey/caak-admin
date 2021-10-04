const groupsGetField = /* GraphQL */ `
  {
    items {
      category_id
      founder_id
      name
      createdAt
      updatedAt
      id
      about
      cover {
        id
        bucket
        ext
        level
        region
      }
      profile {
        id
        bucket
        ext
        level
        region
      }
    }
  }
`;

export default groupsGetField;
