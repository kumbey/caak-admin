import file0001 from "../../file/fields/file0001";

const post0006 = /* GraphQL */ `
  {
    id
    title
    owned
    status
    user_id
    group_id
    category_id
    updatedAt
    createdAt
    version
    user {
      firstname
      id
      followed
      aura
      about
      totals {
        followers
      }
      nickname
      pic ${file0001}
    }
    group {
      id
      name
      followed
    }

    totals {
      comments
      createdAt
      post_id
      reactions
      search_id
      shares
      updatedAt
      views
      reach
    }
    reacted
    items {
      items {
        user_id
        post_id
        id
        title
        reacted
        file_id
  
        file ${file0001}
        totals {
          reactions
          comments
        }
      }
    }
  }
`;

export default post0006;
