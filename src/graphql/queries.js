/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserCustom = /* GraphQL */ `
  query GetUserCustom($id: ID!) {
    getUserCustom(id: $id) {
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
export const getFile = /* GraphQL */ `
  query GetFile($id: ID!) {
    getFile(id: $id) {
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
export const listFiles = /* GraphQL */ `
  query ListFiles(
    $filter: ModelFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getUserPostTotals = /* GraphQL */ `
  query GetUserPostTotals($id: ID!) {
    getUserPostTotals(id: $id) {
      id
      user_id
      pending
      confirmed
      archived
      reported
      createdAt
      updatedAt
    }
  }
`;
export const listUserPostTotals = /* GraphQL */ `
  query ListUserPostTotals(
    $filter: ModelUserPostTotalsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserPostTotals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        pending
        confirmed
        archived
        reported
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGroupPostTotals = /* GraphQL */ `
  query GetGroupPostTotals($id: ID!) {
    getGroupPostTotals(id: $id) {
      id
      group_id
      pending
      confirmed
      createdAt
      updatedAt
    }
  }
`;
export const listGroupPostTotals = /* GraphQL */ `
  query ListGroupPostTotals(
    $filter: ModelGroupPostTotalsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroupPostTotals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        group_id
        pending
        confirmed
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUsername = /* GraphQL */ `
  query GetUsername($id: ID!) {
    getUsername(id: $id) {
      id
      user_id
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
    }
  }
`;
export const listUsernames = /* GraphQL */ `
  query ListUsernames(
    $filter: ModelUsernameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsernames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const usernameByUser = /* GraphQL */ `
  query UsernameByUser(
    $user_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelUsernameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usernameByUser(
      user_id: $user_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAura = /* GraphQL */ `
  query GetAura($user_id: ID!) {
    getAura(user_id: $user_id) {
      user_id
      point
      createdAt
      updatedAt
    }
  }
`;
export const listAuras = /* GraphQL */ `
  query ListAuras(
    $user_id: ID
    $filter: ModelAuraFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAuras(
      user_id: $user_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        user_id
        point
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFollowedUsers = /* GraphQL */ `
  query GetFollowedUsers($user_id: ID!, $followed_user_id: ID!) {
    getFollowedUsers(user_id: $user_id, followed_user_id: $followed_user_id) {
      user_id
      followed_user_id
      createdAt
      updatedAt
    }
  }
`;
export const listFollowedUsers = /* GraphQL */ `
  query ListFollowedUsers(
    $user_id: ID
    $followed_user_id: ModelIDKeyConditionInput
    $filter: ModelFollowedUsersFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFollowedUsers(
      user_id: $user_id
      followed_user_id: $followed_user_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        user_id
        followed_user_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byFollowed = /* GraphQL */ `
  query ByFollowed(
    $user_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelFollowedUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byFollowed(
      user_id: $user_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        user_id
        followed_user_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byFollowing = /* GraphQL */ `
  query ByFollowing(
    $followed_user_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelFollowedUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byFollowing(
      followed_user_id: $followed_user_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        user_id
        followed_user_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserCategory = /* GraphQL */ `
  query GetUserCategory($user_id: ID!, $category_id: ID!) {
    getUserCategory(user_id: $user_id, category_id: $category_id) {
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
export const listUserCategories = /* GraphQL */ `
  query ListUserCategories(
    $user_id: ID
    $category_id: ModelIDKeyConditionInput
    $filter: ModelUserCategoryFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserCategories(
      user_id: $user_id
      category_id: $category_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        user_id
        category_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      icon
      createdAt
      updatedAt
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        icon
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPostByStatus = /* GraphQL */ `
  query GetPostByStatus(
    $status: String
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPostByStatus(
      status: $status
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getPostByGroup = /* GraphQL */ `
  query GetPostByGroup(
    $group_id: ID
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPostByGroup(
      group_id: $group_id
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getPostByUser = /* GraphQL */ `
  query GetPostByUser(
    $user_id: ID
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPostByUser(
      user_id: $user_id
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getPostItems = /* GraphQL */ `
  query GetPostItems($id: ID!) {
    getPostItems(id: $id) {
      id
      post_id
      file_id
      title
      order
      createdAt
      updatedAt
      file {
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
    }
  }
`;
export const listPostItems = /* GraphQL */ `
  query ListPostItems(
    $filter: ModelPostItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        post_id
        file_id
        title
        order
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getReactions = /* GraphQL */ `
  query GetReactions($id: ID!, $user_id: ID!) {
    getReactions(id: $id, user_id: $user_id) {
      id
      user_id
      type
      on_to
      createdAt
      updatedAt
    }
  }
`;
export const listReactions = /* GraphQL */ `
  query ListReactions(
    $id: ID
    $user_id: ModelIDKeyConditionInput
    $filter: ModelReactionsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listReactions(
      id: $id
      user_id: $user_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        user_id
        type
        on_to
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReportedPost = /* GraphQL */ `
  query GetReportedPost($id: ID!) {
    getReportedPost(id: $id) {
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
export const listReportedPosts = /* GraphQL */ `
  query ListReportedPosts(
    $filter: ModelReportedPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportedPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        reason
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReportType = /* GraphQL */ `
  query GetReportType($id: ID!) {
    getReportType(id: $id) {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const listReportTypes = /* GraphQL */ `
  query ListReportTypes(
    $filter: ModelReportTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        status
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGroupUsers = /* GraphQL */ `
  query GetGroupUsers($user_id: ID!, $group_id: ID!) {
    getGroupUsers(user_id: $user_id, group_id: $group_id) {
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
export const listGroupUsers = /* GraphQL */ `
  query ListGroupUsers(
    $user_id: ID
    $group_id: ModelIDKeyConditionInput
    $filter: ModelGroupUsersFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listGroupUsers(
      user_id: $user_id
      group_id: $group_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        user_id
        group_id
        role
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGroupUsersByGroup = /* GraphQL */ `
  query GetGroupUsersByGroup(
    $group_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelGroupUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getGroupUsersByGroup(
      group_id: $group_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        group_id
        role
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGroup = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
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
export const listGroups = /* GraphQL */ `
  query ListGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        category_id
        about
        founder_id
        rating
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
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
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        from
        to
        group_id
        post_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
