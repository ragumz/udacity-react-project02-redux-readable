import { arrayToIndexedObject } from '../utils/Common';
import * as Api from '../utils/ReadableAPI';
import * as Constants from '../utils/Constants';
import { showMessage } from './common';

export const POST_ACTIONS = Object.freeze({
  RECEIVE: 'RECEIVE_POSTS',
  VOTE: 'VOTE_POST'
});

export function receivePosts(posts) {
  return {
    type: POST_ACTIONS.RECEIVE,
    posts: arrayToIndexedObject(posts)
  };
}

export function postVoteScore({id, option}) {
  return {
    type: POST_ACTIONS.VOTE,
    id,
    option
  };
}

export function handlePostVoteScore(vote) {
  return dispatch => {
    dispatch(postVoteScore(vote));

    return Api.placePostVote(vote)
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
  vote.option = vote.option === Constants.VOTE_OPTIONS.UP
    ? Constants.VOTE_OPTIONS.DOWN
    : Constants.VOTE_OPTIONS.UP;
  dispatch(postVoteScore(vote));
  dispatch(showMessage('ERROR', 'There was an error voting on the post. Try again.', error));
}
