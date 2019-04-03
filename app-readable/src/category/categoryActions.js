import { arrayToIndexedObject } from '../utils/commons'

/**
 * @description Freezed object with constant strings
 *              representing Category's reducer's actions enumeration.
 */
export const CATEGORY_ACTIONS = Object.freeze({
  RECEIVE: 'RECEIVE_CATEGORIES'
});

/**
 * @description Category reducer action to receive an array of Category objects
 * @param {Array} posts Array containing all Category objects fetched from backend server
 */
export function receiveCategories(categories) {
  return {
    type: CATEGORY_ACTIONS.RECEIVE,
    categories: arrayToIndexedObject(categories, 'name')
  };
}
