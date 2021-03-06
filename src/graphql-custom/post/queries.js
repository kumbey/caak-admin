// import post0002 from "./fields/post0002";
import post0004 from "./fields/post0004";
import post0006 from "./fields/post0006";

// export const getPost = /* GraphQL */ `
//     query GetPost($id: ID!) {
//         getPost(id: $id) ${post0002}
//     }
// `;

export const getPostView = /* GraphQL */ `
    query GetPost($id: ID!) {
        getPost(id: $id) ${post0004}
    }
`;

export const getPostByStatus = /* GraphQL */ `
    query getPostByStatus($status: String,
        $createdAt: ModelStringKeyConditionInput,
        $sortDirection: ModelSortDirection,
        $filter: ModelPostFilterInput,
        $limit: Int,
        $nextToken: String)
    {
        getPostByStatus(
            status: $status,
            createdAt: $createdAt,
            sortDirection: $sortDirection,
            filter: $filter,
            limit: $limit,
            nextToken: $nextToken) {
            items ${post0006}
            nextToken
        }
    }
`;

export const getPostByUser = /* GraphQL */ `
    query GetPostByUser(
        $user_id: ID!,
        $sortDirection: ModelSortDirection,
        $filter: ModelPostFilterInput,
        $limit: Int,
        $nextToken: String) {
        getPostByUser(
            user_id: $user_id,
            sortDirection: $sortDirection,
            filter: $filter,
            limit: $limit,
            nextToken: $nextToken
        )
        {
            items ${post0004}
            nextToken
        }

    }
`;

export const getPostByGroup = /* GraphQL */ `
    query GetPostByGroup(
        $group_id: ID!,
        $sortDirection: ModelSortDirection,
        $filter: ModelPostFilterInput,
        $limit: Int,
        $nextToken: String) {
        getPostByGroup(
            group_id: $group_id,
            sortDirection: $sortDirection,
            filter: $filter,
            limit: $limit,
            nextToken: $nextToken
        )
        {
            items ${post0004}
            nextToken
        }

    }
`;

export const listPostOrderByReactions = /* GraphQL */ `
  query ListPostOrderByReactions(
    $status: String
#    $total_reactions: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostTotalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostOrderByReactions(
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        post 
        ${post0004}
        
      }
      nextToken
    }
  }
`;
