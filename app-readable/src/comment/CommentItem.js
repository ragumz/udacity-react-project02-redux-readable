import React, { Component } from 'react';
import { connect } from 'react-redux';
import VoteScore from '../common/VoteScore';
import * as commons from '../utils/common';
import * as constants from '../utils/constants';
import { handleCommentVoteScore, handleDeleteComment } from './commentOperations';
import PropTypes from "prop-types";
import EntityButtons from '../common/EntityButtons'
import MessageDialog from '../common/MessageDialog'
import { withRouter } from 'react-router-dom'

class CommentItem extends Component {
  /**
   * @description Define props' arguments' types
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  state = {
    showDeleteDialog: false,
  }

  handleEdit = (event) => {
    this.props.history.push(`/comment/edit/${this.props.id}`)
  }

  handleShowDeleteDialog = (event) => {
    this.setState({ showDeleteDialog: true });
  }

  handleDeleteYes = (event) => {
    const { dispatch, id, post } = this.props
    this.setState({ showDeleteDialog: false });
    dispatch(handleDeleteComment(id, post.id));
  }

  handleDeleteNo = (event) => {
    this.setState({ showDeleteDialog: false });
  }

  render() {
    const { showDeleteDialog } = this.state;
    const { id, comment, dispatch } = this.props;

    if (commons.isNull(comment)) {
      return <p>Comment with {id} doesn't exist</p>;
    }
    const {
      timestamp,
      body,
      author,
    } = comment;

    //deletion behavior
    let dialogDetails = {};
    if (showDeleteDialog) {
      dialogDetails = commons.createDeleteMessage(constants.ENTITY_NAME.COMMENT,  this.handleDeleteYes, this.handleDeleteNo);
    }

    return (
      <div className="comment">
        <div className="panel-info">
          <div className="panel-info-left">
            <EntityButtons
              entityName={constants.ENTITY_NAME.COMMENT}
              handleEdit={this.handleEdit}
              handleDelete={this.handleShowDeleteDialog} />
          </div>
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
        <MessageDialog
            userMessage={dialogDetails.userMessage}
            buttons={dialogDetails.messageButtons}/>
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

export default withRouter(connect(mapStateToProps)(CommentItem));
