import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as common from '../utils/common';
import * as constants from '../utils/constants';
import VoteScore from '../common/VoteScore';
import { handlePostVoteScore, handleDeletePost } from './postOperations'
import EntityButtons from '../common/EntityButtons'
import MessageDialog from '../common/MessageDialog'

class PostItem extends Component {

  state = {
    showDeleteDialog: false,
  }

  handleEdit = (event) => {
    console.log('edit button click!');
  }

  handleShowDeleteDialog = (event) => {
    this.setState({ showDeleteDialog: true });
  }

  handleDeleteYes = (event) => {
    const { dispatch, id } = this.props
    this.setState({ showDeleteDialog: false },
                  dispatch(handleDeletePost(id)));
  }

  handleDeleteNo = (event) => {
    this.setState({ showDeleteDialog: false });
  }

  render() {
    const { showDeleteDialog } = this.state;
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

    let userMessage;
    if (showDeleteDialog) {
      userMessage = {title: "QUESTION", message: "Are you sure you want to delete this Post? It cannot be recovered."};
    } else {
      userMessage = null;
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
          <div className="label-info-timestamp">{common.formatDate(timestamp)}</div>
          <p>{body}</p>
          <VoteScore
            id={id}
            object={post}
            entityName={constants.VOTE_OBJECT.POST}
            dispatch={dispatch}
            actionHandle={handlePostVoteScore}/>
          <span className="panel-info-right">Comments {commentCount}</span>
        </div>
        <MessageDialog
            userMessage={userMessage}
            buttons={[{ text: 'Yes', handleClick: this.handleDeleteYes },
                      { text: 'No',  handleClick: this.handleDeleteNo }]}/>
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
