import groupSetField from "./fields/groupSetField";

export const createGroup = /* GraphQL */ `
    mutation createGroup($input: CreateGroupInput!) {
        createGroup(input: $input) ${groupSetField}
    }
`;
