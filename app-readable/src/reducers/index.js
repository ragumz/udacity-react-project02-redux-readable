import { combineReducers } from 'redux'
import authedUser from './authedUser'
import categories from './categories'
import comments from './comments'
import posts from './posts'
import common from './common'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  authedUser,
  categories,
  posts,
  comments,
  common,
  loadingBar: loadingBarReducer,
})