import * as actions from './postActions'
import * as commentOperations from '../comment/commentOperations'
import * as api from '../utils/readableAPI';
import * as constants from '../utils/constants';
import * as common from '../utils/common';
import { showLoading, hideLoading } from 'react-redux-loading';
import { showMessage } from '../common/commonActions';

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

function revertPostVoteScore(dispatch, vote, error) {
  vote.option = vote.option === constants.VOTE_OPTIONS.UP
    ? constants.VOTE_OPTIONS.DOWN
    : constants.VOTE_OPTIONS.UP;
  dispatch(actions.postVoteScore(vote));
  dispatch(showMessage('ERROR', 'There was an error voting on the post. Try again.', error));
}

function getNewEmptyPost() {
  return {
    id: common.generateUID(),
    timestamp: Date.now(),
    voteScore: 0,
    commentCount: 0,
    deleted: false,
  }
}

export function handleAddNewPost(category, title, body, author) {
  const newPost = Object.assign(getNewEmptyPost(), { category, title, body, author });
  return (dispatch/*, getState*/) => {
    dispatch(showLoading())
    return api.addNewPost(newPost)
      .then((post) => dispatch(actions.addNewPost(post)))
      .then(() => dispatch(hideLoading()))
      .catch(error => dispatch(showMessage('ERROR', 'There was an error adding the new post. Try again.', error)))
  }
}

export function handleDeletePost(postId) {
  return (dispatch) => {
    dispatch(showLoading())
    return api.deletePost(postId)
      .then(post => dispatch(actions.deletePost(postId)))
      .then(() => dispatch(commentOperations.handleDeletedParent(postId)))
      .then(() => dispatch(hideLoading()))
      .catch(error => dispatch(showMessage('ERROR', 'There was an error deleting the post. Try again.', error)))
  }
}