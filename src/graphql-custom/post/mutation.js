import post0004 from "./fields/post0004";
import post0005 from "./fields/post0005";

export const updatePost = /* GraphQL */ `
    mutation updatePost($input: UpdatePostInput!) {
        updatePost(input: $input) ${post0004}
    }
`;

export const createPostStatusHistory = /* GraphQL */ `
    mutation createPostStatusHistory($input: CreatePostStatusHistoryInput!) {
        createPostStatusHistory(input: $input) ${post0005}
    }
`;
