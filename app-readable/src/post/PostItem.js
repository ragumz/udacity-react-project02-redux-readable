import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as common from '../utils/common';
import * as constants from '../utils/constants';
import VoteScore from '../common/VoteScore';
import { handlePostVoteScore } from './postOperations'
import EntityButtons from '../common/EntityButtons'

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
        <div className="panel-info">
          <div>
            <div className="panel-info-right">{category.name}</div>
            <div className="panel-info-left">
              <EntityButtons />
            </div>
          </div>
          <span className="panel-info-title">{title}</span>
          <span>{author}</span>
          <div className="label-info-timestamp">{common.formatDate(timestamp)}</div>
          <p>{body}</p>
          <VoteScore
            id={id}
            object={post}
            entityName={constants.VOTE_OBJECT.POST}
            dispatch={dispatch}
            actionHandle={handlePostVoteScore}
          />
          <span className="panel-info-right">Comments {commentCount}</span>
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
