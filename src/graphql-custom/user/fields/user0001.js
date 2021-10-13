const user0001 = /* GraphQL */ `{
    id
    firstname
    lastname
    nickname
    birthdate
    gender
    pic_id
    cover_pic_id
    about
    is_public
    status
    createdAt
    updatedAt
    pic {
      id
      key
      name
      owner
      bucket
      region
      level
      ext
      createdAt
      updatedAt
    }
    cover_pic {
      id
      key
      name
      owner
      bucket
      region
      level
      ext
      createdAt
      updatedAt
    }
    username {
      id_name
    }
    aura 
    category{
      items{
        id
      }
    }
  }`

  export default user0001