import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as common from '../utils/common';
import * as constants from '../utils/constants';
import Vote from '../common/Vote';
import { handlePostVoteScore } from './postOperations'

class PostItem extends Component {
  render() {
    const { id, post, category, dispatch } = this.props;

    if (common.isNull(post)) {
      return <p>Post with {id} doesn't exist</p>;
    }
    const {
      title,
      timestamp,
      body,
      author,
      commentCount
    } = post;

    return (
      <div className="post">
        <div className="post-info">
          <div className="post-info-right">{category.name}</div>
          <span className="post-info-title">{title}</span>
          <span>{author}</span>
          <div className="post-info-date">{common.formatDate(timestamp)}</div>
          <p>{body}</p>
          <Vote
            key={id}
            id={id}
            object={post}
            entityName={constants.VOTE_OBJECT.POST}
            dispatch={dispatch}
            actionHandle={handlePostVoteScore}
          />
          <span className="post-info-right">Comments {commentCount}</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts, common }, { id }) {
  const post = posts[id];
  const category = post ? categories[post.category] : null;
  return {
    id,
    category,
    post,
    common
  };
}

export default connect(mapStateToProps)(PostItem);
