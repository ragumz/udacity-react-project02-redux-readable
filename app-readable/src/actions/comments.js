import { arrayToIndexedObject } from '../utils/Commons'

export const COMMENT_ACTIONS = Object.freeze({
  RECEIVE: 'RECEIVE_COMMENTS'
});

export function receiveComments(comments) {
  return {
    type: COMMENT_ACTIONS.RECEIVE,
    comments: arrayToIndexedObject(comments)
  };
}
