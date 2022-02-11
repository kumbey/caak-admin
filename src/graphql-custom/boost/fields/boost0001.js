import file0001 from "./file0001";

const boost0001 = /* GraphQL */ `
  {
    createdAt
    end_date
    id
    meta
    post_id
    start_date
    status
    updatedAt
    post {
      title
      items{
        items{
          file ${file0001}
        }
      }
    }
  }
`;

export default boost0001;
