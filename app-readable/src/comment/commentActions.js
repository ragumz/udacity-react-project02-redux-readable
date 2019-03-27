import { arrayToIndexedObject } from '../utils/commons'

export const COMMENT_ACTIONS = Object.freeze({
  RECEIVE: 'RECEIVE_COMMENTS',
  VOTE: 'VOTE_COMMENT',
  NEW: 'NEW_COMMENT',
  UPDATE: 'UPDATE_COMMENT',
  DELETE:  'DELETE_COMMENT',
  DELETED_PARENT:  'DELETED_PARENT_COMMENT',  //TODO check if use!
});

export function receiveComments(comments) {
  return {
    type: COMMENT_ACTIONS.RECEIVE,
    comments: arrayToIndexedObject(comments)
  };
}

export function commentVoteScore({id, option}) {
  return {
    type: COMMENT_ACTIONS.VOTE,
    id,
    option
  };
}

export function addNewComment(comment) {
  return {
    type: COMMENT_ACTIONS.NEW,
    comment
  }
}


export function deleteComment(id) {
  return {
    type: COMMENT_ACTIONS.DELETE,
    id
  };
}

export function deletedParentComment(parentId) {
  return {
    type: COMMENT_ACTIONS.DELETED_PARENT,
    parentId
  };
}

export function updateComment(comment) {
  return {
    type: COMMENT_ACTIONS.UPDATE,
    comment
  }
}