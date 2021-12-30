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
