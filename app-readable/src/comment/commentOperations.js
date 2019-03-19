import * as actions from './commentActions'
import * as api from '../utils/readableAPI';
import * as constants from '../utils/constants';
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
    return Promise.all(promises)
                  .then()
                  .catch(error => dispatch(showMessage('ERROR', 'There was an error marking one Comment after its Post deletion. Try again.', error)));
  }
}