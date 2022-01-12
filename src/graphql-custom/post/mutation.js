import post0004 from "./fields/post0004";

export const updatePost = /* GraphQL */ `
    mutation updatePost($input: UpdatePostInput!) {
        updatePost(input: $input) ${post0004}
    }
`;
