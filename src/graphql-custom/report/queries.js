import report0001 from "./fields/report0001";

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
