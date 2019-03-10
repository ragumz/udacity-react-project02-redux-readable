import { COMMENT_ACTIONS } from '../actions/comments';

export default function comments(state = {}, action) {
  switch (action.type) {
    case COMMENT_ACTIONS.RECEIVE:
      return {
        ...state,
        ...action.comments
      };

    default:
      return state;
  }
}
