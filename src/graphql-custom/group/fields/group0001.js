const groupsGetField = /* GraphQL */ `
  {
    featured
    category {
      id
      name
    }
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
    category {
      id
      name
    }
  }
`;

export default groupsGetField;
