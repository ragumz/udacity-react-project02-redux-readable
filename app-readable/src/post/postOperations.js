import * as actions from './postActions'
import * as commentOperations from '../comment/commentOperations'
import * as commentActions from '../comment/commentActions'
import * as api from '../utils/readableAPI';
import * as constants from '../utils/constants';
import * as common from '../utils/commons';
import { showLoading, hideLoading } from 'react-redux-loading';
import { showMessage } from '../common/commonActions';

/**
 * @description Exclusive Post function to update a Post object vote score field
 *             on backend server and local redux store.  
 * @param {Object} vote An object with Post's id field and option field
 *              containing one {@code ../utils/constants/VOTE_OPTIONS} constant.
 */
export function handlePostVoteScore(vote) {
  return dispatch => {
    dispatch(actions.postVoteScore(vote));

    return api.placePostVote(vote)
    .then(data => {
      if (data['error']) {
        revertPostVoteScore(dispatch, vote)
      }
    })
    .catch(error => {
      //revert situation
      revertPostVoteScore(dispatch, vote, error)
    });
  };
}

/**
 * @description Inner function to revert Post vote score imediate update in case of backend errors.
 * @param {Function} dispatch Middleware thunk action dispatch function
 * @param {Object} vote An object with Post's id field and option field
 *              containing one {@code ../utils/constants/VOTE_OPTIONS} constant.
 * @param {Object} error Object with backend web service rest error details
 */
function revertPostVoteScore(dispatch, vote, error) {
  vote.option = vote.option === constants.VOTE_OPTIONS.UP
    ? constants.VOTE_OPTIONS.DOWN
    : constants.VOTE_OPTIONS.UP;
  //undo vote score increment
  dispatch(actions.postVoteScore(vote));
  //show error message to user on a dialog
  dispatch(showMessage('ERROR', 'There was an error changing the Post vote score. Try again.', error));
}

/**
 * @description Exclusive Post function to update a Post object on backend server and on local redux store.  
 *        It will show a success message to the user. If any error occurs, a message is also shown to user.
 * @param {Object} newPost Complete Post object, except id and timestamp fields that will be replaced here.
 */
export function handleAddNewPost(newPost) {
  newPost.id = common.generateUID();
  newPost.timestamp = Date.now();
  return (dispatch) => {
    dispatch(showLoading())
    return api.addNewPost(newPost)
      .then((post) => dispatch(actions.addNewPost(post)))
      .then(() => dispatch(showMessage('INFORMATION', 'The new Post was successfully created.')))
      .then(() => dispatch(hideLoading()))
      .catch(error => dispatch(showMessage('ERROR', 'There was an error creating the new Post. Try again.', error)))
  }
}

/**
 * @description Exclusive Post function to delete a Post object from backend server and local redux store.  
 *        It will also delete all Comment objects from this Post.
 *        It will show a success message to the user. If any error occurs, a message is also shown to user.
 * @param {string} postId Post object unique identification
 */
export function handleDeletePost(postId) {
  return (dispatch) => {
    dispatch(showLoading())
    return api.deletePost(postId)
      .then(post => dispatch(actions.deletePost(postId)))
      .then(() => dispatch(commentOperations.handleDeletedParent(postId)))
      .then(() => dispatch(hideLoading()))
      .then(() => dispatch(showMessage('INFORMATION', 'The Post was successfully deleted.')))
      .catch(error => dispatch(showMessage('ERROR', 'There was an error deleting the Post. Try again.', error)))
  }
}

/**
 * @description Exclusive Post function to update a Post object on backend server and on local redux store.  
 *        It will show a success message to the user. If any error occurs, a message is also shown to user.
 * @param {string} postId Post object unique identification
 */
export function handleUpdatePost(post) {
  return (dispatch) => {
    dispatch(showLoading())
    return api.updatePost(post)
      .then(post => dispatch(actions.updatePost(post)))
      .then(() => dispatch(hideLoading()))
      .then(() => dispatch(showMessage('INFORMATION', 'The Post was successfully updated.')))
      .catch(error => dispatch(showMessage('ERROR', 'There was an error updating the Post. Try again.', error)))
  }
}

/**
 * @description Exclusive Post function to load all Post's Comments objects from backend server to local redux store.  
 *        If any error occurs, a message is shown to user.
 * @param {string} postId Post object unique identification
 */
export function handleLoadPostComments(postId) {
  return (dispatch) => {
    dispatch(showLoading())
    return api.loadCommentsFromPost(postId)
      .then(comments => dispatch(commentActions.receiveComments(comments)))
      .then(() => dispatch(hideLoading()))
      .catch(error => dispatch(showMessage('ERROR', 'There was an error loading this post\'s comments. Try again.', error)))
  }
}