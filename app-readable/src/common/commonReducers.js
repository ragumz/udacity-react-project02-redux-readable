import { COMMON_ACTIONS } from './commonActions';
import { getSortedEntityId } from './commonOperations'
import * as constants from '../utils/constants'

/**
 * @description Post's reducer implementation to manage global Common thunk actions.
 * @param {Object} state Current reducer state object
 * @param {Object} action Current reducer thunk action object
 */
export default function common(state = {}, action) {
  switch (action.type) {
    //set an user message to open a dialog window
    case COMMON_ACTIONS.SHOW_MESSAGE:
      return {
        ...state,
        userMessage: { title: action.title, message: action.message, error: action.error }
      };

    //clear an user message and close a dialog window
    case COMMON_ACTIONS.HIDE_MESSAGE:
      return {
        ...state,
        userMessage: null
      };

    //user's choice of global entity list sort field and order
    case COMMON_ACTIONS.SORTED_ENTITY:
      return {
        ...state,
        [getSortedEntityId(action.entityName)]: {fieldName: action.fieldName, order: action.order}
      };

    //add a component contextual toolbar menu item
    case COMMON_ACTIONS.ADD_MENU_ITEM:
      let newStateAdd = {...state};
      const keyAdd = constants.MENU_ITEM_CONTEXT_PREFIX.concat(action.menuItem.id);
      if (!newStateAdd.hasOwnProperty(keyAdd)) {
        newStateAdd[keyAdd] = action.menuItem;
      }
      return newStateAdd;

    //remove a component contextual toolbar menu item
    case COMMON_ACTIONS.DELETE_MENU_ITEM:
      let newStateDel = {...state};
      const keyDel = constants.MENU_ITEM_CONTEXT_PREFIX.concat(action.id);
      if (newStateDel.hasOwnProperty(keyDel)) {
        delete newStateDel[keyDel];
      }
      return newStateDel;

    default:
      return state;
  }
}