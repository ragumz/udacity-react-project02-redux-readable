import { arrayToIndexedObject } from '../utils/commons'

export const CATEGORY_ACTIONS = Object.freeze({
  RECEIVE: 'RECEIVE_CATEGORIES'
});

export function receiveCategories(categories) {
  return {
    type: CATEGORY_ACTIONS.RECEIVE,
    categories: arrayToIndexedObject(categories, 'name')
  };
}
