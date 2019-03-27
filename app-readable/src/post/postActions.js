import { arrayToIndexedObject } from '../utils/commons';

export const POST_ACTIONS = Object.freeze({
  RECEIVE: 'RECEIVE_POSTS',
  VOTE: 'VOTE_POST',
  NEW: 'NEW_POST',
  DELETE: 'DELETE_POST',
  UPDATE: 'UPDATE_POST',
  DELETE_COMMENT: 'DELETE_POST_COMMENT',
});

export function receivePosts(posts) {
  return {
    type: POST_ACTIONS.RECEIVE,
    posts: arrayToIndexedObject(posts)
  };
}

export function postVoteScore({id, option}) {
  return {
    type: POST_ACTIONS.VOTE,
    id,
    option
  };
}

export function addNewPost(post) {
  return {
    type: POST_ACTIONS.NEW,
    post
  }
}

export function deletePost(postId) {
  return {
    type: POST_ACTIONS.DELETE,
    postId
  }
}

export function deletePostComment(postId) {
  return {
    type: POST_ACTIONS.DELETE_COMMENT,
    postId
  }
}

export function updatePost(post) {
  return {
    type: POST_ACTIONS.UPDATE,
    post
  }
}