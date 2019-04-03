import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti';
import * as constants from '../utils/constants';
import * as common from '../utils/commons';

/**
 * @description Vote score React Component to simplify user changes to Post or Comment.
 */
class VoteScore extends Component {
  /**
   * @description Define props' arguments' types
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
    object: PropTypes.object,
    actionHandle: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  /**
   * @description Component handle function to dispatch thunk action to update Post or Comment
   * vote score over redux state and backend server
   */
  handleVote = (event, option) => {
    event.preventDefault();
    const { dispatch, id, actionHandle } = this.props;
    if (id && actionHandle) {
      //dispatch props action to make the vote score change on object from its identification
      dispatch(actionHandle({ id, option }));
    }
  };

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  render() {
    let { object, disabled } = this.props;

    if (common.isNull(object) || !object.hasOwnProperty('id')) {
      //object does not exist yet, when a new entity is created
      object = { id: common.generateUID(), voteScore: 0};
    }
    const { id, voteScore } = object;

    return (
      <div  className="panel-info-left">
        <div className="view-icons">
          <span>Vote Score {voteScore}</span>
          <button
            disabled={disabled}
            key={'up-btn-'.concat(id)}
            className="up-down-button"
            data-option={constants.VOTE_OPTIONS.UP}
            onClick={(event) => {this.handleVote(event, constants.VOTE_OPTIONS.UP)}}
          >
            <TiThumbsUp visibility={disabled ? "hidden" : "display"} key={'up-img-'.concat(id)} className="view-icon" data-option={'upVote'} />
          </button>
          <button
            disabled={disabled}
            key={'down-btn-'.concat(id)}
            className="up-down-button"
            data-option={constants.VOTE_OPTIONS.DOWN}
            onClick={(event) => {this.handleVote(event, constants.VOTE_OPTIONS.DOWN)}}
          >
            <TiThumbsDown visibility={disabled ? "hidden" : "display"} key={'down-img-'.concat(id)} className="view-icon" data-option={'downVote'}/>
          </button>
        </div>
      </div>
    );
  }
}

export default VoteScore