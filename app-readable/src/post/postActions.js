import { arrayToIndexedObject } from '../utils/commons';

/**
 * @description Freezed object with constant strings
 *              representing Post's reducer's actions enumeration.
 */
export const POST_ACTIONS = Object.freeze({
  RECEIVE: 'RECEIVE_POSTS',
  VOTE: 'VOTE_POST',
  NEW: 'NEW_POST',
  DELETE: 'DELETE_POST',
  UPDATE: 'UPDATE_POST',
  DELETE_COMMENT: 'DELETE_POST_COMMENT',
  ADD_COMMENT: 'ADD_POST_COMMENT',
});

/**
 * @description Post reducer action to receive an array of Post objects
 * @param {Array} posts Array containing all Post objects fetched from backend server
 */
export function receivePosts(posts) {
  return {
    type: POST_ACTIONS.RECEIVE,
    posts: arrayToIndexedObject(posts)
  };
}

/**
 * @description Post reducer action to change a Post vote score.
 * @param {Object} voteScore An object with Post's id field and option field
 *              containing one {@code ../utils/constants/VOTE_OPTIONS} constant.
 */
export function postVoteScore({id, option}) {
  return {
    type: POST_ACTIONS.VOTE,
    id,
    option
  };
}

/**
 * @description Post reducer action to create a new Post object
 * @param {Object} post Complete Post object
 */
export function addNewPost(post) {
  return {
    type: POST_ACTIONS.NEW,
    post
  }
}

/**
 * @description Post reducer action to delete an existing Post object
 * @param {String} postId Post unique identification key
 */
export function deletePost(postId) {
  return {
    type: POST_ACTIONS.DELETE,
    postId
  }
}

/**
 * @description Post reducer action to update commentCount field due to Post's comment deletion.
 * @param {String} postId Post unique identification key
 */
export function deletePostComment(postId) {
  return {
    type: POST_ACTIONS.DELETE_COMMENT,
    postId
  }
}

/**
 * @description Post reducer action to update commentCount field due to Post's comment creation.
 * @param {String} postId Post unique identification key
 */
export function addPostComment(postId) {
  return {
    type: POST_ACTIONS.ADD_COMMENT,
    postId
  }
}

/**
 * @description Post reducer action to update a Post object fields
 * @param {Object} post Complete Post object
 */
export function updatePost(post) {
  return {
    type: POST_ACTIONS.UPDATE,
    post
  }
}