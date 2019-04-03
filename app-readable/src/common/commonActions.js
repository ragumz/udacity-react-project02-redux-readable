/**
 * @description Freezed object with constant strings
 *              representing Common reducer's actions enumeration.
 */
export const COMMON_ACTIONS = Object.freeze({
  SHOW_MESSAGE: 'SHOW_MESSAGE',
  HIDE_MESSAGE: 'HIDE_MESSAGE',
  SORTED_ENTITY: 'SORTED_ENTITY_LIST',
  ADD_MENU_ITEM: 'ADD_NEW_CONTEXT_MENU_ITEM',
  DELETE_MENU_ITEM: 'DELETE_CONTEXT_MENU_ITEM',
});

/**
 * @description Global common reducer action to prepare a global MessageDialog component
 *      to show messages to the user on a inner dialog window.
 *
 * @param {string} title Dialog window title
 * @param {string} message Message text
 * @param {Object} error Option error content, as text or JS Error instance
 */
export function showMessage(title='INFORMATION', message, error) {
  return {
    type: COMMON_ACTIONS.SHOW_MESSAGE,
    title,
    message,
    error
  };
}

/**
 * @description Global common reducer action to clear a global MessageDialog component
 *      and hide messages the inner dialog window from the user.
 */
export function hideMessage() {
  return {
    type: COMMON_ACTIONS.HIDE_MESSAGE
  };
}

/**
 * @description Global common reducer action to mark the field and order from and entity object
 *      (Post, Comment, Category etc) from user selecion menu to easy collection sort.
 *      The sort setup selecion is applied on all application lists on each entity.
 *
 * @param {string} entityName The entity name from ./utils/constants.ENTITY_NAME
 * @param {string} fieldName The name of a field to apply sort
 * @param {string} order The supporting order from ./utils/constants.SORT_ORDER
 */
export function sortedListData(entityName, fieldName, order) {
  return {
    type: COMMON_ACTIONS.SORTED_ENTITY,
    entityName,
    fieldName,
    order
  };
}

/**
 * @description Common reducer action to add an icon or url link to the app toolbar
 *    in a context way, depending on the page shown.
 *
 * @param {Object} menuItem An object containing an unique "id" field to identify the
 *    component instance, a "name" field to label, and optional "urlLink" field with route path,
 *    an option "handleClick" field with a click function and and "iconIndex" field
 *    with the known name of Menu component constants 'add' or 'delete'.
 */
export function addContextMenuItem({id, name, urlLink, handleClick, iconIndex}) {
  return {
    type: COMMON_ACTIONS.ADD_MENU_ITEM,
    menuItem: {id, name, iconIndex, urlLink, handleClick}
  }
}

/**
 * @description Common reducer action to remove an context icon or url link from the app toolbar
 *    by its identification.
 *
 * @param {string} id Unique identification of an added contextu toolbar menu item
 */
export function deleteContextMenuItem(id) {
  return {
    type: COMMON_ACTIONS.DELETE_MENU_ITEM,
    id
  }
}