import React from 'react';
import PropTypes from 'prop-types';
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti';
import * as constants from '../utils/constants';
import * as common from '../utils/commons';

/**
 * @description Vote score React Component to simplify user changes to Post or Comment.
 */
const VoteScore = ({object, disabled, dispatch, id, actionHandle}) => {

  /**
   * @description Component handle function to dispatch thunk action to update Post or Comment
   * vote score over redux state and backend server
   */
  const handleVote = (event, option) => {
    event.preventDefault();
    if (id && actionHandle) {
      //dispatch props action to make the vote score change on object from its identification
      dispatch(actionHandle({ id, option }));
    }
  };

  /**
   * @description Create a new Entity object if empty or extract from the existing one
   */
  const getEntityObject = () => {
    if (common.isNull(object) || !object.hasOwnProperty('id')) {
      //object does not exist yet, when a new entity is created
      object = { id: common.generateUID(), voteScore: 0};
    }
    return object;
  }

  /**
   * @description Current instance entity object to vote
   */
  const currObject = getEntityObject();

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  return (
      <div className="panel-info-left">
        <div className="view-icons">
          <span>Vote Score {currObject.voteScore}</span>
          <button
            disabled={disabled}
            key={'up-btn-'.concat(currObject.id)}
            className="up-down-button"
            data-option={constants.VOTE_OPTIONS.UP}
            onClick={(event) => {handleVote(event, constants.VOTE_OPTIONS.UP)}}
          >
            <TiThumbsUp visibility={disabled ? "hidden" : "display"} key={'up-img-'.concat(currObject.id)} className="view-icon" data-option={'upVote'} />
          </button>
          <button
            disabled={disabled}
            key={'down-btn-'.concat(currObject.id)}
            className="up-down-button"
            data-option={constants.VOTE_OPTIONS.DOWN}
            onClick={(event) => {handleVote(event, constants.VOTE_OPTIONS.DOWN)}}
          >
            <TiThumbsDown visibility={disabled ? "hidden" : "display"} key={'down-img-'.concat(currObject.id)} className="view-icon" data-option={'downVote'}/>
          </button>
        </div>
      </div>
  );
}

/**
 * @description Define props' arguments' types
 */
VoteScore.propTypes = {
  id: PropTypes.string.isRequired,
  object: PropTypes.object,
  actionHandle: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default VoteScore