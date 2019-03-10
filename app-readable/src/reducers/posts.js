import { POST_ACTIONS } from '../actions/posts';

export default function posts(state = {}, action) {
  switch (action.type) {
    case POST_ACTIONS.RECEIVE:
      return {
        ...state,
        ...action.posts
      };

    default:
      return state;
  }
}
