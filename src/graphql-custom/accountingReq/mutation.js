import accReq0002 from "./fields/accReq0002";
import accReq0003 from "./fields/accReq0003";

export const createAccountBalance = /* GraphQL */ `
    mutation CreateAccountBalance($input: CreateAccountBalanceInput!) {
        createAccountBalance(input: $input) ${accReq0003}
    }
`;

export const updateAccouningtRequest = /* GraphQL */ `
    mutation UpdateAccouningtRequest($input: UpdateAccouningtRequestInput!) {
        updateAccouningtRequest(input: $input) ${accReq0002}
    }
`;
export const doTransaction = /* GraphQL */ `
  mutation DoTransaction(
    $user_id: ID!
    $status: String!
    $amount: Int!
    $desc: String!
  ) {
    doTransaction(
      user_id: $user_id
      status: $status
      amount: $amount
      desc: $desc
    )
  }
`;
