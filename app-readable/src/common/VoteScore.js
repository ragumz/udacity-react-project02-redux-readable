import React, { Component } from 'react';
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti';
import * as constants from '../utils/constants';
import * as common from '../utils/common'

class VoteScore extends Component {
  handleVote = (event, option) => {
    const { dispatch, id, actionHandle } = this.props;
    if (id && actionHandle) {
      dispatch(actionHandle({ id, option }));
    }
  };

  render() {
    let { object, disabled } = this.props;

    if (common.isNull(object) || !object.hasOwnProperty('id')) {
      //objeto não existe ainda, quando criado nova entidade
      object = { id: common.generateUID(), voteScore: 0};
    }
    const { id, voteScore } = object;

    return (
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
    );
  }
}

export default VoteScore