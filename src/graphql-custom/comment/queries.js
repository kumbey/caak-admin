import comment0001 from "./fields/comment0001.js";

export const getCommentsByPost = /* GraphQL */ `
  query GetCommentsByPost(
    $post_id: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getCommentsByPost(
      post_id: $post_id
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
       ${comment0001}
      }
      nextToken
    }
  }
`;