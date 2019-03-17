import { arrayToIndexedObject } from '../utils/common'

export const COMMENT_ACTIONS = Object.freeze({
  RECEIVE: 'RECEIVE_COMMENTS',
  VOTE: 'VOTE_COMMENT',
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