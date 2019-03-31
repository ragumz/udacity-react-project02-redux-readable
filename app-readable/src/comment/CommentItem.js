import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import * as commons from '../utils/commons';
import * as constants from '../utils/constants';
import { handleCommentVoteScore, handleDeleteComment } from './commentOperations';
import PropTypes from "prop-types";
import CommentEdit from "./CommentEdit"
import VoteScore from '../common/VoteScore';
import EntityButtons from '../common/EntityButtons'
import MessageDialog from '../common/MessageDialog'


class CommentItem extends Component {
  /**
   * @description Define props' arguments' types
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  state = {
    isEditing: false,
    showConfirmDialog: false,
  }

  handleEdit = (event) => {
//    this.props.history.push(`/comment/edit/${this.props.id}`)
    this.setState({isEditing: true});
  }

  handleFinishEdit = () => {
    this.setState({isEditing: false});
  }

  handleShowDialog = (event) => {
    this.setState({ showConfirmDialog: true });
  }

  handleDialogYesAnswer = (event) => {
    const { dispatch, id, post } = this.props
    this.setState({ showConfirmDialog: false });
    dispatch(handleDeleteComment(id, post.id));
  }

  handleDialogNoAnswer = (event) => {
    this.setState({ showConfirmDialog: false });
  }

  render() {
    const { isEditing, showConfirmDialog } = this.state;
    const { id, comment, dispatch } = this.props;
    if (isEditing) {
      //inline comment editing
      return <CommentEdit id={id} handleFinishEdit={this.handleFinishEdit} />
    }

    if (commons.isNull(comment)) {
      return <p>Comment with {id} doesn't exist</p>;
    }

    const {
      timestamp,
      body,
      author,
    } = comment;

    //deletion behavior
    let dialogSetup = {};
    if (showConfirmDialog) {
      dialogSetup = commons.createDeleteMessage(constants.ENTITY_NAME.COMMENT,  this.handleDialogYesAnswer, this.handleDialogNoAnswer);
    }

    return (
      <div className="comment">
        <div className="panel-info">
          <div style={{width: '100%'}} >
            <EntityButtons
              entityName={constants.ENTITY_NAME.COMMENT}
              handleEdit={this.handleEdit}
              handleDelete={this.handleShowDialog} />
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
            userMessage={dialogSetup.userMessage}
            buttons={dialogSetup.messageButtons}/>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments, common }, { id }) {
  const comment = Object.freeze(comments[id]);
  const post = comment ? posts[comment.parentId] : null;
  return {
    id,
    comment,
    post,
    common
  };
}

export default withRouter(connect(mapStateToProps)(CommentItem));
