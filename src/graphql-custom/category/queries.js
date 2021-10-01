import categoryGetField from "./fields/categoryGetField";
import categoriesIdGetField from "./fields/categoryIdGetField";

export const getCategoryList = /* GraphQL */ `
    query GetCategoryList {
        listCategories ${categoryGetField}
    }
`;
export const getCategoryID = /* GraphQL */ `
    query GetCategoryID {
        listCategories ${categoriesIdGetField}
    }
`;
