import React, { Component } from 'react';
import { connect } from 'react-redux';
import VoteScore from '../common/VoteScore';
import * as common from '../utils/common';
import * as constants from '../utils/constants';
import { handleCommentVoteScore } from './commentOperations';

class CommentItem extends Component {
  render() {
    const { id, comment, post, dispatch } = this.props;

    if (common.isNull(post)) {
      return <p>Comment with {id} doesn't exist</p>;
    }
    const {
      timestamp,
      body,
      author,
//      parentDeleted,
    } = comment;

    return (
      <div className="comment">
        <div className="panel-info">
          <span>{author}</span>
          <div className="label-info-timestamp">{common.formatDate(timestamp)}</div>
          <p>{body}</p>
          <VoteScore
            key={id}
            id={id}
            object={post}
            entityName={constants.VOTE_OBJECT.COMMENT}
            dispatch={dispatch}
            actionHandle={handleCommentVoteScore}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts, comment, common }, { id }) {
  const comment = comment[id];
  const post = comment ? posts[comment.parentId] : null;
  return {
    id,
    comment,
    post,
    common
  };
}

export default connect(mapStateToProps)(CommentItem);
