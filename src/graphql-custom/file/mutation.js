import file0001 from "./fields/file0001";

export const createFile = /* GraphQL */ `
    mutation CreateFile(
        $input: CreateFileInput!
        $condition: ModelFileConditionInput
    ) {
        createFile(input: $input, condition: $condition) ${file0001}
    }
`;