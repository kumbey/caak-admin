import groupGetField from "./fields/groupGetField";
import group0001 from "./fields/group0001";
import getUsersByGroupField from "./fields/getUsersByGroupField";
import group0002 from "./fields/group0002";
import group0003 from "./fields/group0003";

export const getGroupList = /* GraphQL */ `
    query GetGroupList {
        listGroups ${groupGetField}
    }
`;

export const getGroup = /* GraphQL */ `
    query GetGroup($id: ID!) {
        getGroup(id: $id) ${group0001}
    }
`;
export const getGroupUsersByGroup = /* GraphQL */ `
    query GetGroupUsersByGroup(
        $group_id: ID!,
        $nextToken: String

        ) {
        getGroupUsersByGroup(
            group_id: $group_id,
            nextToken: $nextToken

            ) ${getUsersByGroupField}
    }
`;

export const listGroups = /* GraphQL */ `
    query ListGroups {
        listGroups ${group0002}
    }
`;
export const listGroupUsersByGroup = /* GraphQL */ `
    query ListGroupUsersByGroup(
        $group_id: ID,
        $sortDirection: ModelSortDirection,
        $limit: Int,
        $nextToken: String
    ) {
        listGroupUsersByGroup(
            group_id: $group_id,
            sortDirection: $sortDirection,
            limit: $limit,
            nextToken: $nextToken
        ){ 
            ${group0003}
        }
    }
`;
