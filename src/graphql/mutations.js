/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserCustom = /* GraphQL */ `
  mutation CreateUserCustom($input: CreateUserInputCustom!) {
    createUserCustom(input: $input) {
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
        type
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
        type
        createdAt
        updatedAt
      }
      username {
        nextToken
      }
      aura {
        user_id
        point
        createdAt
        updatedAt
      }
      category {
        nextToken
      }
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      commentType
      status
      user_id
      group_id
      category_id
      updatedAt
      createdAt
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
      category {
        id
        name
        icon
        createdAt
        updatedAt
      }
      items {
        nextToken
      }
      comments {
        nextToken
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
export const createFile = /* GraphQL */ `
  mutation CreateFile(
    $input: CreateFileInput!
    $condition: ModelFileConditionInput
  ) {
    createFile(input: $input, condition: $condition) {
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
export const updateFile = /* GraphQL */ `
  mutation UpdateFile(
    $input: UpdateFileInput!
    $condition: ModelFileConditionInput
  ) {
    updateFile(input: $input, condition: $condition) {
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
export const deleteFile = /* GraphQL */ `
  mutation DeleteFile(
    $input: DeleteFileInput!
    $condition: ModelFileConditionInput
  ) {
    deleteFile(input: $input, condition: $condition) {
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
export const createFollowedUsers = /* GraphQL */ `
  mutation CreateFollowedUsers(
    $input: CreateFollowedUsersInput!
    $condition: ModelFollowedUsersConditionInput
  ) {
    createFollowedUsers(input: $input, condition: $condition) {
      user_id
      followed_user_id
      createdAt
      updatedAt
    }
  }
`;
export const updateFollowedUsers = /* GraphQL */ `
  mutation UpdateFollowedUsers(
    $input: UpdateFollowedUsersInput!
    $condition: ModelFollowedUsersConditionInput
  ) {
    updateFollowedUsers(input: $input, condition: $condition) {
      user_id
      followed_user_id
      createdAt
      updatedAt
    }
  }
`;
export const deleteFollowedUsers = /* GraphQL */ `
  mutation DeleteFollowedUsers(
    $input: DeleteFollowedUsersInput!
    $condition: ModelFollowedUsersConditionInput
  ) {
    deleteFollowedUsers(input: $input, condition: $condition) {
      user_id
      followed_user_id
      createdAt
      updatedAt
    }
  }
`;
export const createUserCategory = /* GraphQL */ `
  mutation CreateUserCategory(
    $input: CreateUserCategoryInput!
    $condition: ModelUserCategoryConditionInput
  ) {
    createUserCategory(input: $input, condition: $condition) {
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
export const updateUserCategory = /* GraphQL */ `
  mutation UpdateUserCategory(
    $input: UpdateUserCategoryInput!
    $condition: ModelUserCategoryConditionInput
  ) {
    updateUserCategory(input: $input, condition: $condition) {
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
export const deleteUserCategory = /* GraphQL */ `
  mutation DeleteUserCategory(
    $input: DeleteUserCategoryInput!
    $condition: ModelUserCategoryConditionInput
  ) {
    deleteUserCategory(input: $input, condition: $condition) {
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      name
      icon
      createdAt
      updatedAt
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      name
      icon
      createdAt
      updatedAt
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      name
      icon
      createdAt
      updatedAt
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createReactions = /* GraphQL */ `
  mutation CreateReactions(
    $input: CreateReactionsInput!
    $condition: ModelReactionsConditionInput
  ) {
    createReactions(input: $input, condition: $condition) {
      id
      user_id
      type
      on_to
      createdAt
      updatedAt
    }
  }
`;
export const updateReactions = /* GraphQL */ `
  mutation UpdateReactions(
    $input: UpdateReactionsInput!
    $condition: ModelReactionsConditionInput
  ) {
    updateReactions(input: $input, condition: $condition) {
      id
      user_id
      type
      on_to
      createdAt
      updatedAt
    }
  }
`;
export const deleteReactions = /* GraphQL */ `
  mutation DeleteReactions(
    $input: DeleteReactionsInput!
    $condition: ModelReactionsConditionInput
  ) {
    deleteReactions(input: $input, condition: $condition) {
      id
      user_id
      type
      on_to
      createdAt
      updatedAt
    }
  }
`;
export const createReportedPost = /* GraphQL */ `
  mutation CreateReportedPost(
    $input: CreateReportedPostInput!
    $condition: ModelReportedPostConditionInput
  ) {
    createReportedPost(input: $input, condition: $condition) {
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
export const updateReportedPost = /* GraphQL */ `
  mutation UpdateReportedPost(
    $input: UpdateReportedPostInput!
    $condition: ModelReportedPostConditionInput
  ) {
    updateReportedPost(input: $input, condition: $condition) {
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
export const deleteReportedPost = /* GraphQL */ `
  mutation DeleteReportedPost(
    $input: DeleteReportedPostInput!
    $condition: ModelReportedPostConditionInput
  ) {
    deleteReportedPost(input: $input, condition: $condition) {
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
export const createReportType = /* GraphQL */ `
  mutation CreateReportType(
    $input: CreateReportTypeInput!
    $condition: ModelReportTypeConditionInput
  ) {
    createReportType(input: $input, condition: $condition) {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateReportType = /* GraphQL */ `
  mutation UpdateReportType(
    $input: UpdateReportTypeInput!
    $condition: ModelReportTypeConditionInput
  ) {
    updateReportType(input: $input, condition: $condition) {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteReportType = /* GraphQL */ `
  mutation DeleteReportType(
    $input: DeleteReportTypeInput!
    $condition: ModelReportTypeConditionInput
  ) {
    deleteReportType(input: $input, condition: $condition) {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const createGroupUsers = /* GraphQL */ `
  mutation CreateGroupUsers(
    $input: CreateGroupUsersInput!
    $condition: ModelGroupUsersConditionInput
  ) {
    createGroupUsers(input: $input, condition: $condition) {
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
export const updateGroupUsers = /* GraphQL */ `
  mutation UpdateGroupUsers(
    $input: UpdateGroupUsersInput!
    $condition: ModelGroupUsersConditionInput
  ) {
    updateGroupUsers(input: $input, condition: $condition) {
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
export const deleteGroupUsers = /* GraphQL */ `
  mutation DeleteGroupUsers(
    $input: DeleteGroupUsersInput!
    $condition: ModelGroupUsersConditionInput
  ) {
    deleteGroupUsers(input: $input, condition: $condition) {
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
export const createGroup = /* GraphQL */ `
  mutation CreateGroup(
    $input: CreateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    createGroup(input: $input, condition: $condition) {
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
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup(
    $input: UpdateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    updateGroup(input: $input, condition: $condition) {
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
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup(
    $input: DeleteGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    deleteGroup(input: $input, condition: $condition) {
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
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
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
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
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
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
