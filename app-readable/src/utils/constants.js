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
  category: '',
  title: '',
  body: '',
  author: '',
  timestamp: 0,
  voteScore: 0,
  commentCount: 0,
  deleted: false,
})