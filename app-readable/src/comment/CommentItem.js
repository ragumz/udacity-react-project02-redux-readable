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
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

/**
 * @description React component to show Comment's details.
 */
class CommentItem extends Component {
  /**
   * @description Define props' arguments' types
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  state = {
    /** @description Control flag to manage inline comment editing */
    isEditing: false,
    /** @description Control flag to manage dialog user interaction */
    showConfirmDialog: false,
  }

  /**
   * @description Component handle function to manage inline current Comment data edition
   */
  handleEdit = (event) => {
    if (commons.isNull(event.target.localName)
        || (!event.target.localName.includes('button')
          && !event.target.localName.includes('svg')
          && !event.target.localName.includes('path'))) {
      this.setState({isEditing: true});
    }
  }

  /**
   * @description Component handle function to end inline current Comment data edition
   */
  handleFinishEdit = () => {
    this.setState({isEditing: false});
  }

  /**
   * @description Component handle function to show a dialog to the user
   */
  handleShowDialog = (event) => {
    this.setState({ showConfirmDialog: true });
  }

  /**
   * @description Component handle function to process dialog user Yes decision button
   */
  handleDialogYesAnswer = (event) => {
    const { dispatch, id, post } = this.props
    this.setState({ showConfirmDialog: false });
    dispatch(handleDeleteComment(id, post.id));
  }

  /**
   * @description Component handle function to process dialog user No decision button
   */
  handleDialogNoAnswer = (event) => {
    this.setState({ showConfirmDialog: false });
  }

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  render() {
    const { isEditing, showConfirmDialog } = this.state;
    const { id, comment, dispatch } = this.props;
    if (isEditing) {
      //when inline comment editing, allow user to change Comment data
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

    //Comment deletion behavior required to ask user by dialog message
    let dialogSetup = {};
    if (showConfirmDialog) {
      dialogSetup = commons.createDeleteMessage(constants.ENTITY_NAME.COMMENT,  this.handleDialogYesAnswer, this.handleDialogNoAnswer);
    }

    return (
      <div className="new-form">
        <Card key="commentCard" className="comment" raised onClick={this.handleEdit}>
          <CardHeader
            action={
              <EntityButtons
                entityName={constants.ENTITY_NAME.COMMENT}
                handleDelete={this.handleShowDialog}
                maxWidth='100%' />
            }
            title={<span className="label-info-timestamp"
                    onClick={this.handleEdit}>
                      {author}
                    </span>}
            subheader={<span className="label-info-timestamp"
                      style={{width: '100%', textAlign: 'right'}}
                      onClick={this.handleEdit}>
                        {commons.formatDate(timestamp)}
                      </span>}
          />
          <CardContent>
            <Typography component="p" className="panel-info-body" onClick={this.handleEdit}>
              {body}
            </Typography>
          </CardContent>
          <CardActions style={{display: 'flex'}} disableActionSpacing>
            <VoteScore
              key={id}
              id={id}
              object={comment}
              entityName={constants.VOTE_OBJECT.COMMENT}
              dispatch={dispatch}
              actionHandle={handleCommentVoteScore}
            />
          </CardActions>
        </Card>
        <MessageDialog
            userMessage={dialogSetup.userMessage}
            buttons={dialogSetup.messageButtons}/>
      </div>
    );
  }
}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
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
