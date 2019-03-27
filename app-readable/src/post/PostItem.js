import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as commons from '../utils/commons';
import * as constants from '../utils/constants';
import VoteScore from '../common/VoteScore';
import { handlePostVoteScore, handleDeletePost } from './postOperations'
import EntityButtons from '../common/EntityButtons'
import MessageDialog from '../common/MessageDialog'
import { withRouter } from 'react-router-dom'

class PostItem extends Component {

  state = {
    showConfirmDialog: false,
  }

  handleView = (event) => {
    this.props.history.push(`/post/view/${this.props.id}`)
  }

  handleEdit = (event) => {
    this.props.history.push(`/post/edit/${this.props.id}`)
  }

  handleShowDialog = (event) => {
    this.setState({ showConfirmDialog: true });
  }

  handleDialogYesAnswer = (event) => {
    const { dispatch, id } = this.props
    this.setState({ showConfirmDialog: false });
    dispatch(handleDeletePost(id));
  }

  handleDialogNoAnswer = (event) => {
    this.setState({ showConfirmDialog: false });
  }

  render() {
    const { showConfirmDialog } = this.state;
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
    let dialogSetup = {};
    if (showConfirmDialog) {
      dialogSetup = commons.createDeleteMessage(constants.ENTITY_NAME.POST,  this.handleDialogYesAnswer, this.handleDialogNoAnswer, ' and all its Comments');
    }

    return (
      <div className="post">
        <div className="panel-info">
          <div>
            <div className="panel-info-left">{category.name}</div>
            <div className="panel-info-right">
              <EntityButtons
                entityName={constants.ENTITY_NAME.POST}
                handleView={this.handleView}
                handleEdit={this.handleEdit}
                handleDelete={this.handleShowDialog}/>
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
            userMessage={dialogSetup.userMessage}
            buttons={dialogSetup.messageButtons}/>
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
