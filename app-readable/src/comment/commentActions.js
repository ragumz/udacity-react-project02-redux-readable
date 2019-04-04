import { arrayToIndexedObject } from '../utils/commons'

/**
 * @description Freezed object with constant strings
 *              representing Comments's reducer's actions enumeration.
 */
export const COMMENT_ACTIONS = Object.freeze({
  RECEIVE: 'RECEIVE_COMMENTS',
  VOTE: 'VOTE_COMMENT',
  NEW: 'NEW_COMMENT',
  UPDATE: 'UPDATE_COMMENT',
  DELETE:  'DELETE_COMMENT',
  DELETED_PARENT:  'DELETED_PARENT_COMMENT',  //TODO check if use!
});

/**
 * @description Comment reducer action to receive an array of Post objects
 * @param {Array} comments Array containing Comment objects fetched by parent Post from backend server
 */
export function receiveComments(comments) {
  return {
    type: COMMENT_ACTIONS.RECEIVE,
    comments: arrayToIndexedObject(comments)
  };
}

/**
 * @description Comment reducer action to change a Comment vote score.
 * @param {Object} voteScore An object with Comment's id field and option field
 *              containing one {@code ../utils/constants/VOTE_OPTIONS} constant.
 */
export function commentVoteScore({id, option}) {
  return {
    type: COMMENT_ACTIONS.VOTE,
    id,
    option
  };
}

/**
 * @description Comment reducer action to create a new Comment object
 * @param {Object} post Complete Comment object
 */
export function addNewComment(comment) {
  return {
    type: COMMENT_ACTIONS.NEW,
    comment
  }
}

/**
 * @description Comment reducer action to delete an existing Comment object
 * @param {String} postId Comment unique identification key
 */
export function deleteComment(id) {
  return {
    type: COMMENT_ACTIONS.DELETE,
    id
  };
}

/**
 * @description Comment reducer action to update parentDelete field due to Post's comment deletion.
 * @param {String} commentId Comment id that had its parent Post deleted
 */
export function deletedParentComment(commentId) {
  return {
    type: COMMENT_ACTIONS.DELETED_PARENT,
    id: commentId
  };
}

/**
 * @description Comment reducer action to update a Comment object fields
 * @param {Object} post Complete Comment object
 */
export function updateComment(comment) {
  return {
    type: COMMENT_ACTIONS.UPDATE,
    comment
  }
}