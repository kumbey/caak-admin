const comment0002 = /* GraphQL */ `
  {
    items {
      post {
        id
        title
        items {
          items {
            file {
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
              region
              type
              updatedAt
            }
          }
        }
      }
      user {
        id
        nickname
        pic {
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
      comment
      createdAt
    }
    nextToken
  }
`;
export default comment0002;
