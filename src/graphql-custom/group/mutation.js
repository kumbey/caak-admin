import groupSetField from "./fields/groupSetField";
import groupIDField from "./fields/groupIDField";
import setUsersRoleField from "./fields/setUsersRoleField";

export const createGroup = /* GraphQL */ `
    mutation createGroup($input: CreateGroupInput!) {
        createGroup(input: $input) ${groupSetField}
    }
`;

export const updateGroup = /* GraphQL */ `
    mutation updateGroup($input: UpdateGroupInput!) {
        updateGroup(input: $input) ${groupSetField}
    }
`;
export const updateGroupUsers = /* GraphQL */ `
    mutation updateGroupUsers($input: UpdateGroupUsersInput!) {
        updateGroupUsers(input: $input) ${setUsersRoleField}
    }
`;

export const deleteGroup = /* GraphQL */ `    
    mutation deleteGroup($input: DeleteGroupInput!){
        deleteGroup(input: $input) ${groupIDField}
    }
`;
