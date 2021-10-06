import groupGetField from "./fields/groupGetField";
import group0001 from "./fields/group0001";
import getUsersByGroupField from "./fields/getUsersByGroupField";

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
    query GetGroupUsersByGroup($group_id: ID!) {
        getGroupUsersByGroup(group_id: $group_id) ${getUsersByGroupField}
    }
`;
