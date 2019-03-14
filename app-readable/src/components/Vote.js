import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti';
import * as Constants from '../utils/Constants';
import * as Commons from '../utils/Common'

class Vote extends Component {
  handleVote = (event, option) => {
    const { dispatch, id, actionHandle } = this.props;
    dispatch(actionHandle({ id, option }));
  };

  render() {
    const { object } = this.props;

    if (Commons.isNull(object)) {
      return <p>This ${this.props.entityName} doesn't exist</p>;
    }
    const { voteScore } = object;

    return (
      <div className="post-icons">
        <span>Vote Score {voteScore}</span>
        <button
          key={'up-btn-'.concat(object.id)}
          className="up-down-button"
          data-option={Constants.VOTE_OPTIONS.UP}
          onClick={(event) => {this.handleVote(event, Constants.VOTE_OPTIONS.UP)}}
        >
          <TiThumbsUp key={'up-img-'.concat(object.id)} className="post-icon" data-option={'upVote'} />
        </button>
        <button
          key={'down-btn-'.concat(object.id)}
          className="up-down-button"
          data-option={Constants.VOTE_OPTIONS.DOWN}
          onClick={(event) => {this.handleVote(event, Constants.VOTE_OPTIONS.DOWN)}}
        >
          <TiThumbsDown key={'down-img-'.concat(object.id)} className="post-icon" data-option={'downVote'}/>
        </button>
      </div>
    );
  }
}

/*
function mapStateToProps(
  { posts, comments },
  { entityName, id, actionHandle }
) {
  let object;
  switch (entityName) {
    case Constants.VOTE_OBJECT.POST:
      object = posts[id]; break;
    case Constants.VOTE_OBJECT.COMMENT:
      object = comments[id]; break;
    default:
      object = null;
  }
  return {
    entityName,
    object,
    id,
    actionHandle
  };
}

export default connect(mapStateToProps)(Vote);
*/
export default Vote