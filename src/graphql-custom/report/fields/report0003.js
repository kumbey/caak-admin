const report0003 = /* GraphQL */ `
  {
    id
    reason
    status
    createdAt
    updatedAt
    user {
      id
      firstname
      lastname
      nickname
      birthdate
      age
      gender
      pic_id
      cover_pic_id
      about
      aura
      is_public
      status
      followed
      verified
      employed
      meta
      createdAt
      updatedAt
    }
    post {
      id
      title
      description
      f_text
      commentType
      status
      user_id
      updated_user_id
      group_id
      category_id
      reacted
      updatedAt
      owned
      ignoreNotification
      createdAt
      version
      items {
        items {
          file {
            bucket
            createdAt
            ext
            external_url
            isExternal
            id
            key
            level
            name
            owner
            region
            type
            updatedAt
          }
        }
      }
    }
  }
`;

export default report0003;
