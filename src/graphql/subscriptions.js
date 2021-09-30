/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFile = /* GraphQL */ `
  subscription OnCreateFile {
    onCreateFile {
      id
      key
      name
      owner
      bucket
      region
      level
      ext
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFile = /* GraphQL */ `
  subscription OnUpdateFile {
    onUpdateFile {
      id
      key
      name
      owner
      bucket
      region
      level
      ext
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFile = /* GraphQL */ `
  subscription OnDeleteFile {
    onDeleteFile {
      id
      key
      name
      owner
      bucket
      region
      level
      ext
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFollowedUsers = /* GraphQL */ `
  subscription OnCreateFollowedUsers {
    onCreateFollowedUsers {
      user_id
      followed_user_id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFollowedUsers = /* GraphQL */ `
  subscription OnUpdateFollowedUsers {
    onUpdateFollowedUsers {
      user_id
      followed_user_id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFollowedUsers = /* GraphQL */ `
  subscription OnDeleteFollowedUsers {
    onDeleteFollowedUsers {
      user_id
      followed_user_id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserCategory = /* GraphQL */ `
  subscription OnCreateUserCategory {
    onCreateUserCategory {
      id
      user_id
      category_id
      createdAt
      updatedAt
      category {
        id
        name
        icon
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateUserCategory = /* GraphQL */ `
  subscription OnUpdateUserCategory {
    onUpdateUserCategory {
      id
      user_id
      category_id
      createdAt
      updatedAt
      category {
        id
        name
        icon
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteUserCategory = /* GraphQL */ `
  subscription OnDeleteUserCategory {
    onDeleteUserCategory {
      id
      user_id
      category_id
      createdAt
      updatedAt
      category {
        id
        name
        icon
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
      id
      name
      icon
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
      id
      name
      icon
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
      id
      name
      icon
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      user_id
      post_id
      comment
      status
      type
      parent_id
      replyUserID
      createdAt
      updatedAt
      user {
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
      }
      replyTo {
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
      }
      post {
        id
        title
        commentType
        status
        user_id
        group_id
        category_id
        updatedAt
        createdAt
      }
      sub {
        nextToken
      }
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      user_id
      post_id
      comment
      status
      type
      parent_id
      replyUserID
      createdAt
      updatedAt
      user {
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
      }
      replyTo {
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
      }
      post {
        id
        title
        commentType
        status
        user_id
        group_id
        category_id
        updatedAt
        createdAt
      }
      sub {
        nextToken
      }
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      user_id
      post_id
      comment
      status
      type
      parent_id
      replyUserID
      createdAt
      updatedAt
      user {
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
      }
      replyTo {
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
      }
      post {
        id
        title
        commentType
        status
        user_id
        group_id
        category_id
        updatedAt
        createdAt
      }
      sub {
        nextToken
      }
    }
  }
`;
export const onCreateReactions = /* GraphQL */ `
  subscription OnCreateReactions {
    onCreateReactions {
      id
      user_id
      type
      on_to
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateReactions = /* GraphQL */ `
  subscription OnUpdateReactions {
    onUpdateReactions {
      id
      user_id
      type
      on_to
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteReactions = /* GraphQL */ `
  subscription OnDeleteReactions {
    onDeleteReactions {
      id
      user_id
      type
      on_to
      createdAt
      updatedAt
    }
  }
`;
export const onCreateReportedPost = /* GraphQL */ `
  subscription OnCreateReportedPost {
    onCreateReportedPost {
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
        gender
        pic_id
        cover_pic_id
        about
        is_public
        status
        createdAt
        updatedAt
      }
      post {
        id
        title
        commentType
        status
        user_id
        group_id
        category_id
        updatedAt
        createdAt
      }
      type {
        id
        name
        status
        description
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateReportedPost = /* GraphQL */ `
  subscription OnUpdateReportedPost {
    onUpdateReportedPost {
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
        gender
        pic_id
        cover_pic_id
        about
        is_public
        status
        createdAt
        updatedAt
      }
      post {
        id
        title
        commentType
        status
        user_id
        group_id
        category_id
        updatedAt
        createdAt
      }
      type {
        id
        name
        status
        description
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteReportedPost = /* GraphQL */ `
  subscription OnDeleteReportedPost {
    onDeleteReportedPost {
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
        gender
        pic_id
        cover_pic_id
        about
        is_public
        status
        createdAt
        updatedAt
      }
      post {
        id
        title
        commentType
        status
        user_id
        group_id
        category_id
        updatedAt
        createdAt
      }
      type {
        id
        name
        status
        description
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreateReportType = /* GraphQL */ `
  subscription OnCreateReportType {
    onCreateReportType {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateReportType = /* GraphQL */ `
  subscription OnUpdateReportType {
    onUpdateReportType {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteReportType = /* GraphQL */ `
  subscription OnDeleteReportType {
    onDeleteReportType {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const onCreateGroupUsers = /* GraphQL */ `
  subscription OnCreateGroupUsers {
    onCreateGroupUsers {
      id
      user_id
      group_id
      role
      createdAt
      updatedAt
      user {
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
      }
      group {
        id
        name
        category_id
        about
        founder_id
        rating
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateGroupUsers = /* GraphQL */ `
  subscription OnUpdateGroupUsers {
    onUpdateGroupUsers {
      id
      user_id
      group_id
      role
      createdAt
      updatedAt
      user {
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
      }
      group {
        id
        name
        category_id
        about
        founder_id
        rating
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteGroupUsers = /* GraphQL */ `
  subscription OnDeleteGroupUsers {
    onDeleteGroupUsers {
      id
      user_id
      group_id
      role
      createdAt
      updatedAt
      user {
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
      }
      group {
        id
        name
        category_id
        about
        founder_id
        rating
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup {
    onCreateGroup {
      id
      name
      category_id
      about
      founder_id
      rating
      createdAt
      updatedAt
      cover {
        id
        key
        name
        owner
        bucket
        region
        level
        ext
        type
        createdAt
        updatedAt
      }
      founder {
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
      }
      category {
        id
        name
        icon
        createdAt
        updatedAt
      }
      members {
        nextToken
      }
    }
  }
`;
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup {
    onUpdateGroup {
      id
      name
      category_id
      about
      founder_id
      rating
      createdAt
      updatedAt
      cover {
        id
        key
        name
        owner
        bucket
        region
        level
        ext
        type
        createdAt
        updatedAt
      }
      founder {
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
      }
      category {
        id
        name
        icon
        createdAt
        updatedAt
      }
      members {
        nextToken
      }
    }
  }
`;
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup {
    onDeleteGroup {
      id
      name
      category_id
      about
      founder_id
      rating
      createdAt
      updatedAt
      cover {
        id
        key
        name
        owner
        bucket
        region
        level
        ext
        type
        createdAt
        updatedAt
      }
      founder {
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
      }
      category {
        id
        name
        icon
        createdAt
        updatedAt
      }
      members {
        nextToken
      }
    }
  }
`;
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
      id
      type
      from
      to
      group_id
      post_id
      createdAt
      updatedAt
      post {
        id
        title
        commentType
        status
        user_id
        group_id
        category_id
        updatedAt
        createdAt
      }
      group {
        id
        name
        category_id
        about
        founder_id
        rating
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification {
    onUpdateNotification {
      id
      type
      from
      to
      group_id
      post_id
      createdAt
      updatedAt
      post {
        id
        title
        commentType
        status
        user_id
        group_id
        category_id
        updatedAt
        createdAt
      }
      group {
        id
        name
        category_id
        about
        founder_id
        rating
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification {
    onDeleteNotification {
      id
      type
      from
      to
      group_id
      post_id
      createdAt
      updatedAt
      post {
        id
        title
        commentType
        status
        user_id
        group_id
        category_id
        updatedAt
        createdAt
      }
      group {
        id
        name
        category_id
        about
        founder_id
        rating
        createdAt
        updatedAt
      }
    }
  }
`;
