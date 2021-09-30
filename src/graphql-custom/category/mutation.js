import category0001 from "./fields/category0001";

export const createCategory = /* GraphQL */ `
    mutation createCategory($input: CreateCategoryInput!) {
        createCategory(input: $input) ${category0001}
    }
`;
