import { COMMON_ACTIONS } from '../actions/common';

export const OBJECT_KEYS = Object.freeze({
  ERROR: 'error_thrown',
  MESSAGE: 'user_message'
});

export default function common(state = {}, action) {
  switch (action.type) {
    case COMMON_ACTIONS.SHOW_ERROR:
      return {
        ...state,
        [OBJECT_KEYS.ERROR]: action.error
      };
    case COMMON_ACTIONS.HIDE_ERROR:
      return {
        ...state,
        [OBJECT_KEYS.ERROR]: null
      };
    case COMMON_ACTIONS.SHOW_MESSAGE:
      return {
        ...state,
        [OBJECT_KEYS.MESSAGE]: action.message
      };
    case COMMON_ACTIONS.HIDE_MESSAGE:
      return {
        ...state,
        [OBJECT_KEYS.MESSAGE]: null
      };

    default:
      return state;
  }
}
