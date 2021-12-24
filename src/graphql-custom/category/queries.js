import categoryGetField from "./fields/categoryGetField";
import categoriesIdGetField from "./fields/categoryIdGetField";
import categoriesByIdGetField from "./fields/categoryGetByIdField";

export const getCategoryList = /* GraphQL */ `
    query GetCategoryList {
        listCategorys ${categoryGetField}
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

export const listUserCategoryByUser = /* GraphQL */ `
  query ListUserCategoryByUser(
    $user_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelUserCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserCategoryByUser(
      user_id: $user_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        category {
          name
          id
          icon
        }
      }
    }
  }
`;
