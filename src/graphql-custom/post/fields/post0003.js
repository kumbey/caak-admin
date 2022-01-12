import post0001 from "../fields/post0001";

const post0003 = /* GraphQL */ `
  {
    id
    title
    description
    commentType
    owned
    f_text
    status
      status_history {
          items {
              description
              id
          }
      }
    user_id
    group_id
    category_id
    updatedAt
    createdAt
    version
    isSaved
    comments {
      items {
        comment
        parent_id
        post_item_id
        post_id
        createdAt
        reacted
        id
        totals {
          reactions
        }
        user {
          nickname
          pic ${post0001}
          id
        }
        sub {
          items {
            comment
            id
            createdAt
            parent_id
            totals {
              reactions
            }
            user {
              nickname
              pic ${post0001}
              id
            }
          }
        }
      }
    }
    user {
      firstname
      gender
      id
      followed
      aura
      about
      verified
      totals {
        followers
      }
      nickname
      pic ${post0001}
    }
    group {
      id
      name
      profile ${post0001}
      followed
      role_on_group
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
    }
    reacted
     items(filter: {isEmbed: {attributeExists: false}}) {
      items {
        user_id
        post_id
        id
        title
        reacted
        file_id
        file ${post0001}
        comments {
          items {
            comment
            id
            parent_id
            reacted
            createdAt
            totals {
              reactions
            }
            user {
              id
              nickname
              pic ${post0001}
              cover_pic ${post0001}
            }
          }
        }
        file ${post0001}
        totals {
          reactions
          comments
        }
      }
    }
  }
`;

export default post0003;
