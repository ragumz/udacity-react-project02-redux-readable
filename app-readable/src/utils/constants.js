export const ENTITY_NAME = Object.freeze({
  CATEGORY: 'Category',
  POST: 'Post',
  COMMENT: 'Comment'
})

/**
 * Post voting API options
 */
export const VOTE_OPTIONS = Object.freeze({
  /**
   * Increment Post vote
   */
  UP: 'upVote',
  /**
   * Decrement Post vote
   */
  DOWN: 'downVote'
})


export const VOTE_OBJECT = Object.freeze({
  COMMENT: 'comment',
  POST: 'post'
})

export const SORT_ORDER = Object.freeze({
  ASCENDING: 'Ascending',
  DESCENDING: 'Descending'
})

export const EMTPY_POST = Object.freeze({
  id: '',
  timestamp: 0,
  title: '',
  body: '',
  author: '',
  category: '',
  voteScore: 0,
  commentCount: 0,
  deleted: false,
})

export const EMTPY_COMMENT = Object.freeze({
  id: '',
  parentId: '',
  timestamp: 0,
  body: '',
  author: '',
  voteScore: 0,
  deleted: false,
  parentDeleted: false
})