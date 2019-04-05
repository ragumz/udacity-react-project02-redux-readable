/**
 * @description Application main entity names enumeration
 */
export const ENTITY_NAME = Object.freeze({
  CATEGORY: 'Category',
  POST: 'Post',
  COMMENT: 'Comment'
});

/**
 * @description Post and Comment voting API options enumeration
 */
export const VOTE_OPTIONS = Object.freeze({
  /**
   * Increment vote score
   */
  UP: 'upVote',
  /**
   * Decrement vote score
   */
  DOWN: 'downVote'
});

/**
 * @description Post and Comment voting API options enumeration
 */
export const VOTE_OBJECT = Object.freeze({
  COMMENT: 'comment',
  POST: 'post'
});

/**
 * @description SortListMenu component options enumeration
 */
export const SORT_ORDER = Object.freeze({
  ASCENDING: 'Ascending',
  DESCENDING: 'Descending'
});

/**
 * @description Empty Post freezed object
 */
export const EMTPY_POST = Object.freeze({
  id: '',
  timestamp: 0,
  title: '',
  body: '',
  author: '',
  category: '',
  voteScore: 0,
  commentCount: 0,
  deleted: false
});

/**
 * @description Empty Comment freezed object
 */
export const EMTPY_COMMENT = Object.freeze({
  id: '',
  parentId: '',
  timestamp: 0,
  body: '',
  author: '',
  voteScore: 0,
  deleted: false,
  parentDeleted: false
});

/**
 * @description Context menu item name prefix constant
 */
export const MENU_ITEM_CONTEXT_PREFIX = 'menu_';

/**
 * @description Text that represents an unselected Category name
 */
export const CATEGORY_UNSELECTED = '_unselected_';