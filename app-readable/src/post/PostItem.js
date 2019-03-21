import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as commons from '../utils/common';
import * as constants from '../utils/constants';
import VoteScore from '../common/VoteScore';
import { handlePostVoteScore, handleDeletePost } from './postOperations'
import EntityButtons from '../common/EntityButtons'
import MessageDialog from '../common/MessageDialog'
import { withRouter } from 'react-router-dom'

class PostItem extends Component {

  state = {
    showDeleteDialog: false,
  }

  handleEdit = (event) => {
    this.props.history.push(`/post/edit/${this.props.id}`)
  }

  handleShowDeleteDialog = (event) => {
    this.setState({ showDeleteDialog: true });
  }

  handleDeleteYes = (event) => {
    const { dispatch, id } = this.props
    this.setState({ showDeleteDialog: false });
    dispatch(handleDeletePost(id));
  }

  handleDeleteNo = (event) => {
    this.setState({ showDeleteDialog: false });
  }

  render() {
    const { showDeleteDialog } = this.state;
    const { id, post, category, dispatch } = this.props;

    if (commons.isNull(post)) {
      return <p>Post with {id} does not exist</p>;
    }
    const {
      title,
      timestamp,
      body,
      author,
      commentCount
    } = post;

    //deletion behavior
    let deleteDialog = {};
    if (showDeleteDialog) {
      deleteDialog = commons.createDeleteMessage(constants.ENTITY_NAME.POST,  this.handleDeleteYes, this.handleDeleteNo);
    }

    return (
      <div className="post">
        <div className="panel-info">
          <div>
            <div className="panel-info-right">{category.name}</div>
            <div className="panel-info-left">
              <EntityButtons
                entityName={constants.ENTITY_NAME.POST}
                handleDelete={this.handleShowDeleteDialog}
                handleEdit={this.handleEdit}/>
            </div>
          </div>
          <span className="panel-info-title">{title}</span>
          <span>{author}</span>
          <div className="label-info-timestamp">{commons.formatDate(timestamp)}</div>
          <span className="panel-info-body">{body}</span>
          <VoteScore
            id={id}
            object={post}
            entityName={constants.VOTE_OBJECT.POST}
            dispatch={dispatch}
            actionHandle={handlePostVoteScore}/>
          <span className="panel-info-right">Comments {commentCount}</span>
        </div>
        <MessageDialog
            userMessage={deleteDialog.userMessage}
            buttons={deleteDialog.messageButtons}/>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts, common }, { id }) {
  let post;
  //test to prevent refreshing on this page without loading app content
  if (!commons.isEmpty(posts)
        && posts.hasOwnProperty(id)) {
    post = posts[id];
  } else {
    post = Object.assign({}, constants.EMTPY_POST);
  }
  const category = post ? categories[post.category] : null;
  return {
    id,
    category,
    post,
    common
  };
}

export default withRouter(connect(mapStateToProps)(PostItem));
