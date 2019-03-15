import { COMMON_ACTIONS } from './commonActions';

export default function common(state = {}, action) {
  switch (action.type) {
    case COMMON_ACTIONS.SHOW_MESSAGE:
      return {
        ...state,
        userMessage: { title: action.title, message: action.message, error: action.error }
      };
    case COMMON_ACTIONS.HIDE_MESSAGE:
      return {
        ...state,
        userMessage: null
      };

    default:
      return state;
  }
}
