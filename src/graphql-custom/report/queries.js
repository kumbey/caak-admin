import report0001 from "./fields/report0001";
import report0003 from "./fields/report0003";

export const listReportTypes = /* GraphQL */ `
    query ListReportTypes {
      listReportTypes {
        items ${report0001}
      }
    }
`;
export const getReportType = /* GraphQL */ `
    query GetReportType($id: ID!) {
      getReportType(id:$id) ${report0001}
    }
`;

export const listReportedPosts = /* GraphQL */ `
  query ListReportedPosts {
    listReportedPosts{
     items ${report0003}
    }
  }
`;
export const ListReportedPostOrderByCreatedAt = /* GraphQL */ `
  query ListReportedPostOrderByCreatedAt(
    $typeName: String,
		$createdAt: ModelStringKeyConditionInput,
		$sortDirection: ModelSortDirection,
		$filter: ModelReportedPostFilterInput,
		$limit: Int,
		$nextToken: String
  ) {
    ListReportedPostOrderByCreatedAt(
      typeName: $typeName,
      createdAt: $createdAt,
      sortDirection: $sortDirection,
      filter: $filter,
      limit: $limit,
      nextToken: $nextToken
    ) {
     items ${report0003}
    }
  }
`;
