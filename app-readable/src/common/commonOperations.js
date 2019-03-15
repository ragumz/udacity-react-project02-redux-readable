import { getInitialData } from '../utils/readableAPI';
import { receiveCategories } from '../category/categoryActions';
import { receivePosts } from '../post/postActions';
import { showLoading, hideLoading } from 'react-redux-loading';
import { showMessage } from '../common/commonActions'

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

