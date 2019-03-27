import * as actions from './commentActions'
import * as api from '../utils/readableAPI';
import * as constants from '../utils/constants';
import * as commons from '../utils/commons';
import * as postActions from '../post/postActions';
import { showLoading, hideLoading } from 'react-redux-loading';
import { showMessage } from '../common/commonActions';

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

function revertCommentVoteScore(dispatch, vote, error) {
  vote.option = vote.option === constants.VOTE_OPTIONS.UP
    ? constants.VOTE_OPTIONS.DOWN
    : constants.VOTE_OPTIONS.UP;
  dispatch(actions.commentVoteScore(vote));
  dispatch(showMessage('ERROR', 'There was an error voting on the comment. Try again.', error));
}

export function handleAddNewComment(newComment) {
  newComment.id = commons.generateUID();
  newComment.timestamp = Date.now();
  return (dispatch/*, getState*/) => {
    dispatch(showLoading())
    return api.addNewComment(newComment)
      .then((comment) => dispatch(actions.addNewComment(comment)))
      .then(() => dispatch(hideLoading()))
      .catch(error => dispatch(showMessage('ERROR', 'There was an error adding the new comment. Try again.', error)))
  }
}


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
          .then(() => dispatch(actions.deletedParentComment(parentId)))
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