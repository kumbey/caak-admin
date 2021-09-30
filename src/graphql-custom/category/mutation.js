import categorySetField from "./fields/categorySetField";

export const createCategory = /* GraphQL */ `
    mutation createCategory($input: CreateCategoryInput!) {
        createCategory(input: $input) ${categorySetField}
    }
`;
