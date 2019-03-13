import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti';
import * as Constants from '../utils/Constants';

class Vote extends Component {
  render() {
    const { object, entityName } = this.props;

    if (object === null) {
      return <p>This ${entityName} doesn't exist</p>;
    }
    const { voteScore } = object;

    return (
      <div className="post-icons">
        <span>Vote Score {voteScore}</span>
        <TiThumbsUp className="post-icon" />
        <TiThumbsDown className="post-icon" />
      </div>
    );
  }
}

function mapStateToProps(
  { posts, comments },
  { entityName, id, actionHandle }
) {
  let object;
  switch (entityName) {
    case Constants.VOTE_OBJECT.POST:
      object = posts[id];
      break;
    case Constants.VOTE_OBJECT.COMMENT:
      object = comments[id];
      break;
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
