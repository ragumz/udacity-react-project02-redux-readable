import * as actions from './commentActions'
import * as api from '../utils/readableAPI';
import * as constants from '../utils/constants';
import * as common from '../utils/common';
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