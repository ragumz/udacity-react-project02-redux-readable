import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../utils/Commons';
import { TiArrowUpThick, TiArrowDownOutline } from 'react-icons/ti';

class Post extends Component {
  render() {
    const { post } = this.props;

    if (post === null) {
      return <p>This Post doesn't exist</p>;
    }
    const {
      title,
      timestamp,
      body,
      voteScore,
      author,
      category,
      postComments
    } = post;

    return (
      <div className="post-info">
        <div>
          <span>Category {category.name}</span>
          <span>{title}</span>
          <span>{author}</span>
          <div>{formatDate(timestamp)}</div>
          <p>{body}</p>
        </div>
        <div className="post-icons">
          <span>Vote Score {voteScore}</span>
          <TiArrowUpThick className="post-icon" />
          <TiArrowDownOutline className="post-icon" />
        </div>
        <span>Comments {postComments ? postComments.length : 0}</span>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts, comments, common }, { id }) {
  const post = posts[id];
  const category = post ? categories[post.category] : null;
  const postComments = post
    ? Object.values(comments)
        .map(comment => {
          comment.parentId === id;
        })
        .sort((a, b) => a.voteScore < b.voteScore)
    : null;
  return {
    category,
    post,
    postComments,
    common
  };
}

export default withRouter(connect(mapStateToProps)(Post));
