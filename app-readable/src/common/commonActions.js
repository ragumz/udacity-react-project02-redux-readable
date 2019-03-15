export const COMMON_ACTIONS = Object.freeze({
  SHOW_MESSAGE: 'SHOW_MESSAGE',
  HIDE_MESSAGE: 'HIDE_MESSAGE',
  SORTED_ENTITY: 'SORTED_ENTITY_LIST',
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
