import groupGetField from "./fields/groupGetField";

export const getGroupList = /* GraphQL */ `
    query GetGroupList {
        listGroups ${groupGetField}
    }
`;
