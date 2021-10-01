import groupSetField from "./fields/groupSetField";
import groupIDField from "./fields/groupIDField";

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

export const deleteGroup = /* GraphQL */ `    
    mutation deleteGroup($input: DeleteGroupInput!){
        deleteGroup(input: $input) ${groupIDField}
    }
`;
