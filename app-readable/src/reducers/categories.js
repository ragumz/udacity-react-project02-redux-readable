import { CATEGORY_ACTIONS } from '../actions/categories';

export default function categories(state = {}, action) {
  switch (action.type) {
    case CATEGORY_ACTIONS.RECEIVE:
      return {
        ...state,
        ...action.categories
      };

    default:
      return state;
  }
}
