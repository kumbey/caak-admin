import accReq0001 from "./fields/accReq0001";
import accReq0002 from "./fields/accReq0002";

export const getAccouningtRequest = /* GraphQL */ `
    query GetAccouningtRequest ($id: ID!) {
        getAccouningtRequest (id: $id) ${accReq0002}
    }
`;

export const listAccouningtRequests = /* GraphQL */ `
    query ListAccouningtRequests (
        $filter: ModelAccouningtRequestFilterInput, 
        $limit: Int, 
        $nextToken: String
    ) {
        listAccouningtRequests (
            filter: $filter, 
            limit: $limit, 
            nextToken: $nextToken
        )  ${accReq0001}
    }
`;
