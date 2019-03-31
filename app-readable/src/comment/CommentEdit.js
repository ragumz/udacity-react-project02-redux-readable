import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as commons from '../utils/commons';
import * as constants from '../utils/constants';
import {
  handleAddNewComment,
  handleUpdateComment,
  handleCommentVoteScore,
  handleDeleteComment
} from './commentOperations';
import VoteScore from '../common/VoteScore';
import MessageDialog from '../common/MessageDialog'
import TextField from '@material-ui/core/TextField';
import IconDelete from '@material-ui/icons/Delete';
import IconSave from '@material-ui/icons/Save';
import IconExit from '@material-ui/icons/ExitToApp';
import Fab from '@material-ui/core/Fab';

class CommentEdit extends Component {

  /**
   * @description Initializes component states
   */
  state = {
    editComment: Object.assign({}, constants.EMTPY_COMMENT),
    showConfirmDialog: false,
  };

  handleChangeValue = event => {
    const { name, value } = event.target;
    this.setState(currState => {
      currState['editComment'][name] = value;
      return currState;
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (commons.isNull(this.props.comment)) {
      this.handleClickCreateComment();
    } else {
      this.handleClickUpdateComment();
    }
  };

  handleClickCreateComment = () => {
    const { editComment } = this.state;
    const { dispatch, post } = this.props;
    dispatch(handleAddNewComment(editComment, post.id))
      .then(() => {
        this.handleFinishedEdit();
      });
  };

  handleClickUpdateComment = () => {
    const { editComment } = this.state;
    const { dispatch } = this.props;
    dispatch(handleUpdateComment(editComment));
    this.handleFinishedEdit();
  };

  handleShowDialog = (event) => {
    this.setState({ showConfirmDialog: true });
  };

  handleDialogYesAnswer = (event) => {
    const { editComment } = this.state;
    const { dispatch, post } = this.props;
    this.setState({ showConfirmDialog: false });
    dispatch(handleDeleteComment(editComment.id, post.id))
      .then(() => {
        this.handleFinishedEdit();
      });
  };

  handleDialogNoAnswer = (event) => {
    this.setState({ showConfirmDialog: false });
  };

  handleFinishedEdit = () => {
    const { handleFinishEdit, history } = this.props;
    if (handleFinishEdit) {
      handleFinishEdit();
    } else {
      history.goBack();
    }
  }

  componentDidMount() {
    let { editComment } = this.state;
    const { comment } = this.props;
    if (!commons.isNull(comment)) {
      //edit existing Comment
      editComment = Object.assign({}, comment);
    }
    this.setState({ editComment });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.comment && this.props.comment
        && (nextProps.comment.voteScore !== this.props.comment.voteScore
            || nextProps.comment.deleted !== this.props.comment.deleted
            || nextProps.comment.parentDeleted !== this.props.comment.parentDeleted)) {
      const { comment } = nextProps;
      //update voteScore from redux state
      this.setState(currState => {
        currState['editComment']['voteScore'] = comment.voteScore;
        currState['editComment']['deleted'] = comment.deleted;
        currState['editComment']['parentDeleted'] = comment.parentDeleted;
        return currState;
      })
    }
  }

  render() {
    const { editComment, showConfirmDialog } = this.state;
    const { id, timestamp, body, author, deleted, parentDeleted } = editComment;
    const { dispatch } = this.props;

    if (deleted === true || parentDeleted === true) {
      this.handleFinishedEdit();
      return <div></div>;
    }

    let pageTitle = 'Edit Comment';
    let flagCreate = false;
    if (commons.isNull(this.props.comment)) {
      pageTitle = 'Create a new Comment';
      flagCreate = true;
    }

    //control the max length
    const bodyLeft = 500 - body.length;

    //deletion behavior
    let dialogSetup = {};
    if (showConfirmDialog) {
      dialogSetup = commons.createDeleteMessage(constants.ENTITY_NAME.COMMENT,  this.handleDialogYesAnswer, this.handleDialogNoAnswer);
    }

    return (
      <div className="comment">
        <form className="new-form" onSubmit={this.handleSubmit}>
          <div className="panel-info">
            <div className="center">
              <h3 className="side-by-side">{pageTitle}</h3>
                  <Fab color="primary" title="Save Comment" size="small" className="create-fab"
                    type="submit" onSubmit={this.handleSubmit}>
                    <IconSave />
                  </Fab>
                {!flagCreate && (
                  <Fab color="secondary" title="Delete Comment" size="small" className="create-fab"
                    type="button" onClick={this.handleShowDialog}>
                    <IconDelete />
                  </Fab>
                )}
                <Fab color="secondary" title="Cancel" size="small" className="create-fab"
                    type="button" onClick={this.handleFinishedEdit}>
                    <IconExit />
                  </Fab>
            </div>
            <TextField
              id="author"
              name="author"
              label="Author"
              className="inputField"
              variant="standard"
              margin="normal"
              fullWidth={true}
              maxLength={200}
              value={author}
              required={true}
              onChange={event => this.handleChangeValue(event)}
            />
            {!flagCreate &&
              <div className="label-info-timestamp">{commons.formatDate(timestamp)}</div>
            }
            <TextField
              id="body"
              name="body"
              label="Body"
              className="textarea"
              variant="standard"
              margin="normal"
              fullWidth={true}
              maxLength={500}
              rows={2}
              rowsMax={4}
              value={body}
              type="input"
              multiline={true}
              required={true}
              onChange={event => this.handleChangeValue(event)}
            />
            {bodyLeft <= 100 && <div className="textarea-length">{bodyLeft}</div>}
            {!flagCreate &&
              <div>
                <VoteScore
                  id={id}
                  object={editComment}
                  entityName={constants.VOTE_OBJECT.COMMENT}
                  dispatch={dispatch}
                  actionHandle={handleCommentVoteScore}
                />
              </div>
            }
          </div>
        </form>
        <MessageDialog
          userMessage={dialogSetup.userMessage}
          buttons={dialogSetup.messageButtons}
        />
      </div>
    )
  }

}

function mapStateToProps({ posts, comments }, { location, match, id, parentId, comment, handleFinishEdit }) {
  if (location.pathname.includes('/comment/') && !commons.isEmpty(match.params.id)) {
    id = match.params.id;
  }
  if (!commons.isEmpty(id) && commons.isNull(comment)) {
    //test to prevent refreshing on this page without loading app content
    if (!commons.isEmpty(comments) && comments.hasOwnProperty(id)) {
      //freezing the object to avoid its change
      comment = Object.freeze(comments[id]);
    }
  }
  //seek for comment parent's post object
  let post;
  if (!commons.isNull(comment)) {
    post = Object.freeze(posts[comment.parentId]);
  } else {
    if (commons.isEmpty(parentId) && !commons.isEmpty(match.params.parentId)) {
      parentId = match.params.parentId;
    }
    if (commons.isNull(post) && !commons.isEmpty(parentId)) {
      post = Object.freeze(posts[parentId]);
    }
  }
  if (commons.isNull(post)) {
    throw Error('Provide a valid Post object or a post "id" as Comment\'s parentId.');
  }
  return {
    comment: comment ? comment : null,
    post, //parent post
    handleFinishEdit  //finish function
  };
}

export default withRouter(connect(mapStateToProps)(CommentEdit));