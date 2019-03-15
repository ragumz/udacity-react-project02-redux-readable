import { COMMENT_ACTIONS } from './commentActions';

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
