import { COMMENT_ACTIONS } from './commentActions';
import { VOTE_OPTIONS } from '../utils/constants';

export default function comments(state = {}, action) {
  switch (action.type) {
    case COMMENT_ACTIONS.RECEIVE:
      return {
        ...state,
        ...action.comments
      };

    case COMMENT_ACTIONS.VOTE:
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
