import file0001 from "./fields/file0001";
import deleteFileField from "../file/fields/deleteFileField";

export const createFile = /* GraphQL */ `
    mutation CreateFile(
        $input: CreateFileInput!
        $condition: ModelFileConditionInput
    ) {
        createFile(input: $input, condition: $condition) ${file0001}
    }
`;

export const deleteFile = /* GraphQL */ `    
    mutation deleteFile($input: DeleteFileInput!){
        deleteFile(input: $input) ${deleteFileField}
    }
`;
