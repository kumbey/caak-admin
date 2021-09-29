import user0001 from "./fields/user0001";

export const createUserCustom = /* GraphQL */ `
  mutation createUserCustom($input: CreateUserInputCustom!) {
    createUserCustom(input: $input) ${user0001}
  }
`;