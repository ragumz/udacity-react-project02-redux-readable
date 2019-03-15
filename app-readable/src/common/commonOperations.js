import { getInitialData } from '../utils/readableAPI';
import { receiveCategories } from '../category/categoryActions';
import { receivePosts } from '../post/postActions';
import { showLoading, hideLoading } from 'react-redux-loading';
import { showMessage } from '../common/commonActions'
import * as constants from '../utils/constants'
import * as common from '../utils/common'

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

export function getSortedEntityId(entityName) {
  return `sorted_${entityName}`
}

export function sortEntityMap(entityMap, sortingSetup) {
  let sortedEntities = [];
  if (sortingSetup) {
    const { fieldName, order } = sortingSetup;
    if (!common.isEmpty(fieldName) && !common.isEmpty(order)) {
      if (order === constants.SORT_ORDER.DESCENDING) {
        sortedEntities = Object.keys(entityMap)
                            .sort((a,b) => entityMap[b][fieldName] > entityMap[a][fieldName])
      } else {
        sortedEntities = Object.keys(entityMap)
                            .sort((a,b) => entityMap[b][fieldName] < entityMap[a][fieldName])
      }
    }
  }
  return sortedEntities;
}