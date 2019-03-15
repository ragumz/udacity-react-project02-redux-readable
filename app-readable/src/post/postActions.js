import { arrayToIndexedObject } from '../utils/common';

export const POST_ACTIONS = Object.freeze({
  RECEIVE: 'RECEIVE_POSTS',
  VOTE: 'VOTE_POST'
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