import { getInitialData } from '../utils/ReadableAPI'
import { receiveCategories } from './categories'
import { receivePosts } from './posts'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'ragumz'

export const COMMON_ACTIONS = Object.freeze({
  SHOW_ERROR: 'SHOW_ERROR_THROWN',
  HIDE_ERROR: 'CLEAR_ERROR_THROWN',
  SHOW_MESSAGE: 'SHOW_MESSAGE',
  HIDE_MESSAGE: 'HIDE_MESSAGE',
})

export function showError(error) {
  return {
    type: COMMON_ACTIONS.SHOW_ERROR,
    error,
  }
}

export function hideError() {
  return {
    type: COMMON_ACTIONS.HIDE_ERROR,
  }
}

export function showMessage(message) {
  return {
    type: COMMON_ACTIONS.SHOW_MESSAGE,
    message,
  }
}

export function hideMessage() {
  return {
    type: COMMON_ACTIONS.HIDE_MESSAGE,
  }
}

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ categories, posts }) => {
        dispatch(receiveCategories(categories))
        dispatch(receivePosts(posts))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
      .catch((error) => {
        dispatch(hideLoading())
        dispatch(showError(error));
      })
  }
}