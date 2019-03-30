export const COMMON_ACTIONS = Object.freeze({
  SHOW_MESSAGE: 'SHOW_MESSAGE',
  HIDE_MESSAGE: 'HIDE_MESSAGE',
  SORTED_ENTITY: 'SORTED_ENTITY_LIST',
  ADD_MENU_ITEM: 'ADD_NEW_CONTEXT_MENU_ITEM',
  DELETE_MENU_ITEM: 'DELETE_CONTEXT_MENU_ITEM',
});

export function showMessage(title='INFORMATION', message, error) {
  return {
    type: COMMON_ACTIONS.SHOW_MESSAGE,
    title,
    message,
    error
  };
}

export function hideMessage() {
  return {
    type: COMMON_ACTIONS.HIDE_MESSAGE
  };
}

export function sortedListData(entityName, fieldName, order) {
  return {
    type: COMMON_ACTIONS.SORTED_ENTITY,
    entityName,
    fieldName,
    order
  };
}

export function addContextMenuItem({id, name, urlLink, handleClick}) {
  return {
    type: COMMON_ACTIONS.ADD_MENU_ITEM,
    menuItem: {id, name, urlLink, handleClick}
  }
}

export function deleteContextMenuItem(id) {
  return {
    type: COMMON_ACTIONS.DELETE_MENU_ITEM,
    id
  }
}