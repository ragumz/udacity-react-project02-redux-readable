import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../../utils/Common';
import * as Constants from '../../utils/Constants';
import Vote from '../Vote';
import { handlePostVoteScore } from '../../actions/posts'

class Post extends Component {
  render() {
    const { post, /*postComments,*/ category, dispatch } = this.props;

    if (post === null) {
      return <p>This Post doesn't exist</p>;
    }
    const {
      id,
      title,
      timestamp,
      body,
      author,
      commentCount
    } = post;

    return (
      <div className="post">
        <div className="post-info">
          <div className="post-info-right">Category {category.name}</div>
          <span className="post-info-title">{title}</span>
          <span>{author}</span>
          <div className="post-info-date">{formatDate(timestamp)}</div>
          <p>{body}</p>
          <Vote
            key={id}
            id={id}
            object={post}
            entityName={Constants.VOTE_OBJECT.POST}
            dispatch={dispatch}
            actionHandle={handlePostVoteScore}
          />
          <span className="post-info-right">Comments {commentCount/*postComments ? postComments.length : 0*/}</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts, /*comments,*/ common }, { id }) {
  const post = posts[id];
  const category = post ? categories[post.category] : null;
  /*const postComments = post
    ? Object.values(comments)
        .filter(comment => comment.parentId === id)
        .sort((a, b) => a.voteScore < b.voteScore)
    : null;*/
  return {
    category,
    post,
    //postComments,
    common
  };
}

export default connect(mapStateToProps)(Post);
