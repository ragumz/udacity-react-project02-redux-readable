import { POST_ACTIONS } from '../actions/posts';
import { VOTE_OPTIONS } from '../utils/Constants';

export default function posts(state = {}, action) {
  switch (action.type) {
    case POST_ACTIONS.RECEIVE:
      return {
        ...state,
        ...action.posts
      };

    case POST_ACTIONS.VOTE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.option === VOTE_OPTIONS.UP
            ? state[action.id].voteScore+1
            : state[action.id].voteScore-1
          }
      };
    default:
      return state;
  }
}
