import report0001 from "./fields/report0001";
import report0003 from "./fields/report0003";

export const createReportType = /* GraphQL */ `
    mutation CreateReportType($input: CreateReportTypeInput!) {
        createReportType(input: $input) ${report0001}
    }
`;

export const updateReportType = /* GraphQL */ `
  mutation UpdateReportType($input: UpdateReportTypeInput!) {
    updateReportType(input: $input) {
      createdAt
      description
      id
      name
      status
      updatedAt
    }
  }
`;

export const deleteReportType = /* GraphQL */ `
    mutation DeleteReportType($input: DeleteReportTypeInput!) {
      deleteReportType(input: $input) ${report0001}
    }
`;

export const deleteReportedPost = /* GraphQL */ `
  mutation DeleteReportedPost($input: DeleteReportedPostInput!) {
    deleteReportedPost(input: $input) {
      id
    }
  }
`;
export const updateReportedPost = /* GraphQL */ `
  mutation UpdateReportedPost($input: UpdateReportedPostInput!) {
    updateReportedPost(input: $input) ${report0003}
  }
`;
