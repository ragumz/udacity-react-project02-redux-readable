import { getInitialData } from '../utils/ReadableAPI';
import { receiveCategories } from './categories';
import { receivePosts } from './posts';
import { showLoading, hideLoading } from 'react-redux-loading';

export const COMMON_ACTIONS = Object.freeze({
  SHOW_MESSAGE: 'SHOW_MESSAGE',
  HIDE_MESSAGE: 'HIDE_MESSAGE',
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

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ categories, posts }) => {
        dispatch(receiveCategories(categories));
        dispatch(receivePosts(posts));
        dispatch(hideLoading());
      })
      .catch(error => {
        dispatch(hideLoading());
        dispatch(showMessage('ERROR', 'Failed to load data from server. Try again later.', error));
      });
  };
}
