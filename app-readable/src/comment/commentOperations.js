import * as actions from './commentActions'
import * as api from '../utils/readableAPI';
import * as constants from '../utils/constants';
import * as commons from '../utils/commons';
import * as postActions from '../post/postActions';
import { showLoading, hideLoading } from 'react-redux-loading';
import { showMessage } from '../common/commonActions';

/**
 * @description Exclusive Comment function to update a Comment object vote score field
 *             on backend server and local redux store.
 * @param {Object} vote An object with Comment's id field and option field
 *              containing one {@code ../utils/constants/VOTE_OPTIONS} constant.
 */
export function handleCommentVoteScore(vote) {
  return dispatch => {
    dispatch(actions.commentVoteScore(vote));

    return api.placeCommentVote(vote)
    .then(data => {
      if (data['error']) {
        revertCommentVoteScore(dispatch, vote)
      }
    })
    .catch(error => {
      //revert situation
      revertCommentVoteScore(dispatch, vote, error)
    });
  };
}

/**
 * @description Inner function to revert Comment vote score imediate update in case of backend errors.
 * @param {Function} dispatch Middleware thunk action dispatch function
 * @param {Object} vote An object with Comment's id field and option field
 *              containing one {@code ../utils/constants/VOTE_OPTIONS} constant.
 * @param {Object} error Object with backend web service rest error details
 */
function revertCommentVoteScore(dispatch, vote, error) {
  vote.option = vote.option === constants.VOTE_OPTIONS.UP
    ? constants.VOTE_OPTIONS.DOWN
    : constants.VOTE_OPTIONS.UP;
  dispatch(actions.commentVoteScore(vote));
  dispatch(showMessage('ERROR', 'There was an error voting on the comment. Try again.', error));
}

/**
 * @description Exclusive Comment function to update a Comment object on backend server and on local redux store.
 *        It also update the parent Post's commentCount field with the respective Post action.
 *        It will show a success message to the user. If any error occurs, a message is also shown to user.
 * @param {Object} newPost Complete Comment object, except id and timestamp fields that will be replaced here.
 * @param {string} parentId Parent Post object identification value
 */
export function handleAddNewComment(newComment, parentId) {
  newComment.id = commons.generateUID();
  newComment.parentId = parentId;
  newComment.timestamp = Date.now();
  return (dispatch) => {
    dispatch(showLoading())
    return api.addNewComment(newComment)
      .then((comment) => dispatch(actions.addNewComment(comment)))
      .then(() => dispatch(postActions.addPostComment(parentId)))  //update post's comment count
      .then(() => dispatch(showMessage('INFORMATION', 'The new Comment was successfully created.')))
      .then(() => dispatch(hideLoading()))
      .catch(error => dispatch(showMessage('ERROR', 'There was an error adding the new comment. Try again.', error)))
  }
}

/**
 * @description Exclusive Comment function to update a Comment object on backend server and on local redux store.
 *        It will show a success message to the user. If any error occurs, a message is also shown to user.
 * @param {string} postId Post object unique identification
 */
export function handleUpdateComment(comment) {
  return (dispatch) => {
    dispatch(showLoading())
    return api.updateComment(comment)
      .then(comment => dispatch(actions.updateComment(comment)))
      .then(() => dispatch(hideLoading()))
      .then(() => dispatch(showMessage('INFORMATION', 'The comment was successfully updated.')))
      .catch(error => dispatch(showMessage('ERROR', 'There was an error updating the comment. Try again.', error)))
  }
}

/**
 * @description Exclusive Comment function to delete a Comment object from backend server and local redux store.
 *        It also update the parent Post's commentCount field with the respective Post action.
 *        It will show a success message to the user. If any error occurs, a message is also shown to user.
 * @param {string} postId Post object unique identification
 */
export function handleDeleteComment(commentId, parentId) {
  return (dispatch) => {
    dispatch(showLoading())
    return api.deleteComment(commentId)
      .then(comment => dispatch(actions.deleteComment(commentId)))
      .then(() => dispatch(postActions.deletePostComment(parentId)))  //update post's comment count
      .then(() => dispatch(hideLoading()))
      .then(() => dispatch(showMessage('INFORMATION', 'The comment was successfully deleted.')))
      .catch(error => dispatch(showMessage('ERROR', 'There was an error deleting the comment. Try again.', error)))
  }
}

/**
 * @description Exclusive Comment function to change the deletion mark of all Comments from one Post.
 * @param {string} parentId Parent Post identification field value
 */
export function handleDeletedParent(parentId) {
  return (dispatch, getState) => {
    var promises = [];
    const { comments } = getState();
    Object.values(comments)
      .filter(comment => comment.parentId === parentId)
      .forEach(comment => {
        const updComment = {...comment, parentDeleted: true};
        promises.push(
          api.updateComment(updComment)
          .then(() => dispatch(actions.deletedParentComment(comment.id)))
        )
      });
    if (promises.length > 0) {
      return Promise.all(promises)
                    .then(([...result]) => {console.log(Array.toString(result))})
                    .catch(error => dispatch(showMessage('ERROR', 'There was an error marking one Comment after its Post deletion. Try again.', error)));
    } else  {
      return Promise.resolve();
    }
  }
}