import React, { Component } from 'react';
import { connect } from 'react-redux';
import VoteScore from '../common/VoteScore';
import * as commons from '../utils/common';
import * as constants from '../utils/constants';
import { handleCommentVoteScore } from './commentOperations';
import PropTypes from "prop-types";

class CommentItem extends Component {
  /**
   * @description Define props' arguments' types
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  render() {
    const { id, comment, dispatch } = this.props;

    if (commons.isNull(comment)) {
      return <p>Comment with {id} doesn't exist</p>;
    }
    const {
      timestamp,
      body,
      author,
    } = comment;

    return (
      <div className="comment">
        <div className="panel-info">
          <span>{author}</span>
          <div className="label-info-timestamp">{commons.formatDate(timestamp)}</div>
          <span className="panel-info-body">{body}</span>
          <VoteScore
            key={id}
            id={id}
            object={comment}
            entityName={constants.VOTE_OBJECT.COMMENT}
            dispatch={dispatch}
            actionHandle={handleCommentVoteScore}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments, common }, { id }) {
  const currComment = comments[id];
  const post = currComment ? posts[currComment.parentId] : null;
  return {
    id,
    comment: currComment,
    post,
    common
  };
}

export default connect(mapStateToProps)(CommentItem);
