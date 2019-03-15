import { combineReducers } from 'redux'
import categories from '../category/categoryReducers'
import comments from '../comment/commentReducers'
import posts from '../post/postsReducers'
import common from '../common/commonReducers'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  categories,
  posts,
  comments,
  common,
  loadingBar: loadingBarReducer,
})