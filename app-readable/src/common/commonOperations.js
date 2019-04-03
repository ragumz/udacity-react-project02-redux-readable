import { getInitialData } from '../utils/readableAPI';
import { receiveCategories } from '../category/categoryActions';
import { receivePosts } from '../post/postActions';
import { showLoading, hideLoading } from 'react-redux-loading';
import { showMessage } from '../common/commonActions'
import * as constants from '../utils/constants'
import * as common from '../utils/commons'

/**
 * @description Global function to load all known objects of Category and Posts
 *    from backend server web service.
 */
export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ categories, posts }) => {
        dispatch(receiveCategories(categories));
        dispatch(receivePosts(posts));
        //return getAllComments(posts);
        dispatch(hideLoading());
      })
      /*.then((comments) => {
        dispatch(receiveComments(comments))
        dispatch(hideLoading());
      })*/
      .catch(error => {
        dispatch(hideLoading());
        dispatch(showMessage('ERROR', 'Failed to load data from server. Try again later.', error));
      });
  };
}

/**
 * @description A helper function to create an unique name
 *    to a global entity sort setup.
 * @param {*} entityName
 */
export function getSortedEntityId(entityName) {
  return `sortSetup_${entityName}`
}

/**
 * @description A helper function to apply sort over an entity
 *    list considering the field and order setup.
 * @param {Object} entityMap Object indexing entity objects by their ids
 * @param {*} sortingSetup Sort setup chose by user and set by commonActions.sortedListData()
 */
export function sortEntityMap(entityMap, sortingSetup) {
  let sortedEntities = [];
  if (sortingSetup) {
    //get the field name and the order
    const { fieldName, order } = sortingSetup;
    if (!common.isEmpty(fieldName) && !common.isEmpty(order)) {
      const asc = order === constants.SORT_ORDER.ASCENDING;
      sortedEntities = Object.keys(entityMap)
                          .sort((a,b) => {
                            const valA = entityMap[a][fieldName];
                            const valB = entityMap[b][fieldName];
                            if (valA > valB) return asc ? 1 : -1;
                            if (valA < valB) return asc ? -1 : 1;
                            return 0;
                          });
    }
  }
  return sortedEntities;
}
