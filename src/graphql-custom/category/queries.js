import category0001 from "./fields/category0001";

export const getCategoryList = /* GraphQL */ `
    query GetCategoryList {
        listCategories ${category0001}
    }
`;
