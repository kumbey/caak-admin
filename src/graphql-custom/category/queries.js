import categoryGetField from "./fields/categoryGetField";
import categoriesIdGetField from "./fields/categoryIdGetField";
import categoriesByIdGetField from "./fields/categoryGetByIdField";

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
export const getCategoryByID = /* GraphQL */ `
    query getCategoryByID($id: ID!) {
        getCategory(id:$id) ${categoriesByIdGetField}
    }
`;
