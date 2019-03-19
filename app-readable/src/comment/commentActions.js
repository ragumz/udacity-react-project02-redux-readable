import { arrayToIndexedObject } from '../utils/common'

export const COMMENT_ACTIONS = Object.freeze({
  RECEIVE: 'RECEIVE_COMMENTS',
  VOTE: 'VOTE_COMMENT',
  DELETE:  'DELETE_COMMENT',
  DELETED_PARENT:  'DELETED_PARENT_COMMENT',
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

export function deleteComment(commentId) {
  return {
    type: COMMENT_ACTIONS.DELETE,
    commentId
  };
}

export function deletedParentComment(parentId) {
  return {
    type: COMMENT_ACTIONS.DELETED_PARENT,
    parentId
  };
}