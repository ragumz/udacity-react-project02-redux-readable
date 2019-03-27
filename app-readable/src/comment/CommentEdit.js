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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import VoteScore from '../common/VoteScore';
import MessageDialog from '../common/MessageDialog'
import CommentList from '../comment/CommentList'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import IconDelete from '@material-ui/icons/Delete';
import IconSave from '@material-ui/icons/Save';
import IconUndo from '@material-ui/icons/Undo';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

class CommentEdit extends Component {

  /**
   * @description Initializes component states
   */
  state = {
    open: false,
    editComment: Object.assign({}, constants.EMTPY_COMMENT),
    showConfirmDialog: false,
    readOnly: false,
  };

  /**
   * @description Set the dialog to show
   */
  handleOpen = () => {
    this.setState({ open: true });
  };

  /**
   *  @description Set the dialog to hide
   */
  handleClose = () => {
    this.setState({ open: false });
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

  handleClickCreatePost = () => {
    const { editComment } = this.state;
    const { dispatch } = this.props;
    dispatch(handleAddNewComment(editComment)).then(() => {
      this.setState(() => ({
        open: false
      }));
    });
  };

  handleClickUpdatePost = () => {
    const { editComment } = this.state;
    const { dispatch } = this.props;
    dispatch(handleUpdateComment(editComment));
  };

  handleClickCancel = () => {
    let { comment } = this.props;
    if (commons.isNull(comment)) {
      comment = Object.assign({}, constants.EMTPY_COMMENT);
    } else {
      comment = Object.assign({}, comment);
    }
    this.setState({
      editComment: comment
    })
  };

  handleShowDialog = (event) => {
    this.setState({ showConfirmDialog: true });
  };

  handleDialogYesAnswer = (event) => {
    const { dispatch } = this.props;
    const { editComment } = this.state;
    this.setState({ showConfirmDialog: false });
    dispatch(handleDeleteComment(editComment.id))
      .then(() => this.setState({open: false}));
  };

  handleDialogNoAnswer = (event) => {
    this.setState({ showConfirmDialog: false });
  };

  componentDidMount() {
    let { editComment } = this.state;
    const { comment } = this.props;
    if (!commons.isNull(comment)) {
      editComment = Object.assign({}, comment);
    }
    this.setState({ editComment });
  }

  render() {
    const { readOnly, comment, post } = this.props;

    let pageTitle = (readOnly ? 'View' : 'Edit').concat(' Comment');
    let flagCreate = false;
    if (commons.isNull(this.props.post)) {
      pageTitle = 'Create a new Comment';
      flagCreate = true;
    }

    //deletion behavior
    let dialogSetup = {};
    if (showConfirmDialog) {
      dialogSetup = commons.createDeleteMessage(constants.ENTITY_NAME.COMMENT,  this.handleDialogYesAnswer, this.handleDialogNoAnswer);
    }

    return (
      <div>
        <form className="new-form" onSubmit={this.handleSubmit}>
          <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              scroll="paper"
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">New Comment</DialogTitle>
              <DialogActions>

              </DialogActions>
              <DialogContent>

              </DialogContent>
            </Dialog>
        </form>
        <MessageDialog
          userMessage={dialogSetup.userMessage}
          buttons={dialogSetup.messageButtons}
        />
      </div>
    )
  }

}

function mapStateToProps({ posts, comments }, { match, id, comment, post, readOnly=false }) {
  if (!commons.isEmpty(match.params.id)) {
    id = match.params.id;
  }
  if (!commons.isEmpty(id) && commons.isNull(comment)) {
    //test to prevent refreshing on this page without loading app content
    if (!commons.isEmpty(comment) && comment.hasOwnProperty(id)) {
      //freezing the object to avoid its change
      comment = Object.freeze(comments[id]);
    }
  }
  return {
    readOnly,
    comment: comment ? comment : null,
    post,
  };
}

export default withRouter(connect(mapStateToProps)(CommentEdit));