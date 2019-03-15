import { COMMON_ACTIONS } from './commonActions';
import { getSortedEntityId } from './commonOperations'

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
    case COMMON_ACTIONS.SORTED_ENTITY:
      return {
        ...state,
        [getSortedEntityId(action.entityName)]: {fieldName: action.fieldName, order: action.order}
      };
    default:
      return state;
  }
}