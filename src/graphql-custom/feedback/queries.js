import feedback0001 from "./fields/feedback0001.js";

export const listFeedBacks = /* GraphQL */ `
  query ListFeedBacks(
    $filter: ModelFeedBackFilterInput, 
    $limit: Int, 
    $nextToken: String
  ) {
    listFeedBacks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items ${feedback0001}
      nextToken
    }
  }
`;
export const listFeedBackOrderByCreatedAt = /* GraphQL */ `
  query listFeedBackOrderByCreatedAt(
    $typeName: String,
		$createdAt: ModelStringKeyConditionInput,
		$sortDirection: ModelSortDirection,
		$filter: ModelFeedBackFilterInput,
		$limit: Int,
		$nextToken: String
  ) {
    listFeedBackOrderByCreatedAt(
      typeName: $typeName,
      createdAt: $createdAt,
      sortDirection: $sortDirection,
      filter: $filter,
      limit: $limit,
      nextToken: $nextToken
    ) {
      items ${feedback0001}
      nextToken
    }
  }
`;
