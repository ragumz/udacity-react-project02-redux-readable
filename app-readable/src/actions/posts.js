import { arrayToIndexedObject } from '../utils/Commons'

export const POST_ACTIONS = Object.freeze({
  RECEIVE: 'RECEIVE_POSTS'
});

export function receivePosts(posts) {
  return {
    type: POST_ACTIONS.RECEIVE,
    posts: arrayToIndexedObject(posts)
  };
}
