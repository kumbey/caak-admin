const categoriesGetField = /* GraphQL */ `
  {
    items {
      id
      name
      icon
      createdAt
      updatedAt
      pic_id
      picture {
        bucket
        createdAt
        ext
        external_url
        id
        isExternal
        key
        level
        name
        owner
        provided_item
        provider
        region
        type
        updatedAt
      }
    }
  }
`;

export default categoriesGetField;
