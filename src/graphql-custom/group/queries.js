import groupGetField from "./fields/groupGetField";
import group0001 from "./fields/group0001";

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
