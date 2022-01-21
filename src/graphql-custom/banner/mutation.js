import banner0001 from "./fields/banner0001";

export const createBanner = /* GraphQL */ `
    mutation CreateBanner($input: CreateBannerInput!) {
        createBanner(input: $input) ${banner0001}
    }
`;

export const updateBanner = /* GraphQL */ `
    mutation UpdateBanner($input: UpdateBannerInput!) {
        updateBanner(input: $input) ${banner0001}
    }
`;

export const deleteBanner = /* GraphQL */ `
    mutation DeleteBanner($input: DeleteBannerInput!) {
        deleteBanner(input: $input) ${banner0001}
    }
`;
