import banner0001 from "./fields/banner0001";

export const getBanner = /* GraphQL */ `
    query GetBanner ($id: ID!) {
        getBanner (id: $id) ${banner0001}
    }
`;

export const listBanners = /* GraphQL */ `
    query ListBanners (
        $id: ID,
		$filter: ModelBannerFilterInput,
		$limit: Int,
		$nextToken: String,
		$sortDirection: ModelSortDirection
    ) {
        listBanners (
            id: $id,
            filter: $filter,
            limit: $limit,
            nextToken: $nextToken,
            sortDirection: $sortDirection
        ) {items ${banner0001}}
    }
`;
export const listBannersByType = /* GraphQL */ `
    query ListBannersByType (
        $type: String,
		$start_date: ModelStringKeyConditionInput,
		$sortDirection: ModelSortDirection,
		$filter: ModelBannerFilterInput,
		$limit: Int,
		$nextToken: String
    ) {
        listBannersByType (
            type: $type,
            start_date: $start_date,
            sortDirection: $sortDirection,
            filter: $filter,
            limit: $limit,
            nextToken: $nextToken
        ) {items ${banner0001}}
    }
`;
