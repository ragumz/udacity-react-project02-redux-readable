import React, { Component } from 'react';
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti';
import * as constants from '../utils/constants';
import * as commons from '../utils/common'

class Vote extends Component {
  handleVote = (event, option) => {
    const { dispatch, id, actionHandle } = this.props;
    dispatch(actionHandle({ id, option }));
  };

  render() {
    const { object } = this.props;

    if (commons.isNull(object)) {
      return <p>This ${this.props.entityName} doesn't exist</p>;
    }
    const { voteScore } = object;

    return (
      <div className="post-icons">
        <span>Vote Score {voteScore}</span>
        <button
          key={'up-btn-'.concat(object.id)}
          className="up-down-button"
          data-option={constants.VOTE_OPTIONS.UP}
          onClick={(event) => {this.handleVote(event, constants.VOTE_OPTIONS.UP)}}
        >
          <TiThumbsUp key={'up-img-'.concat(object.id)} className="post-icon" data-option={'upVote'} />
        </button>
        <button
          key={'down-btn-'.concat(object.id)}
          className="up-down-button"
          data-option={constants.VOTE_OPTIONS.DOWN}
          onClick={(event) => {this.handleVote(event, constants.VOTE_OPTIONS.DOWN)}}
        >
          <TiThumbsDown key={'down-img-'.concat(object.id)} className="post-icon" data-option={'downVote'}/>
        </button>
      </div>
    );
  }
}

export default Vote