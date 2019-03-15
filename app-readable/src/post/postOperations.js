import * as actions from './postActions'
import * as api from '../utils/readableAPI';
import * as constants from '../utils/constants';
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
