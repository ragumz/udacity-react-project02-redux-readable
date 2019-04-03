import { CATEGORY_ACTIONS } from './categoryActions';

/**
 * @description Category's reducer implementation to manage all Category thunk actions.
 * @param {Object} state Current reducer state object
 * @param {Object} action Current reducer thunk action object
 */
export default function categories(state = {}, action) {
  switch (action.type) {
    //add all backend server loaded Categories into state
    case CATEGORY_ACTIONS.RECEIVE:
      return {
        ...state,
        ...action.categories
      };

    default:
      return state;
  }
}
