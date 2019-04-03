import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import * as commons from '../utils/commons';
import * as constants from '../utils/constants';
import VoteScore from '../common/VoteScore';
import { handlePostVoteScore, handleDeletePost } from './postOperations'
import EntityButtons from '../common/EntityButtons'
import MessageDialog from '../common/MessageDialog'


/**
 * @description React component to show Post's details.
 */
class PostItem extends Component {
  /**
   * @description Define props' arguments' types
   */
  static propTypes = {
    id: PropTypes.string,
    fixedCategory: PropTypes.bool,
  };

  state = {
    /** @description Control flag to manage dialog user interaction */
    showConfirmDialog: false,
  }

  /**
   * @description Component handle function to navigate to current Post details and Comments
   */
  handleView = (event) => {
    const { history, fixedCategory } = this.props;
    history.push(`/post/view/${this.props.id}/${fixedCategory}`)
  }

  /**
   * @description Component handle function to navigate to current Post data edition
   */
  handleEdit = (event) => {
    const { history, fixedCategory } = this.props;
    history.push(`/post/edit/${this.props.id}/${fixedCategory}`)
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
    const { dispatch, id } = this.props
    this.setState({ showConfirmDialog: false });
    dispatch(handleDeletePost(id));
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

    //Post deletion behavior required to ask user by dialog message
    let dialogSetup = {};
    if (showConfirmDialog) {
      dialogSetup = commons.createDeleteMessage(constants.ENTITY_NAME.POST,  this.handleDialogYesAnswer, this.handleDialogNoAnswer, ' and all its Comments');
    }

    return (
      <div className="post">
        <div className="panel-info">
          <div>
            <div className="panel-info-left">
              <span className="label-category">{category.name}</span>
            </div>
            <div className="panel-info-right" style={{width: '30%'}}>
              <EntityButtons
                entityName={constants.ENTITY_NAME.POST}
                handleView={this.handleView}
                handleEdit={this.handleEdit}
                handleDelete={this.handleShowDialog}/>
            </div>
          </div>
          <span className="panel-info-title">{title}</span>
          <span className="text-right" >{author}</span>
          <div className="text-right" style={{width: '100%'}}>
            <span className="label-info-timestamp">{commons.formatDate(timestamp)}</span>
          </div>
          <span className="panel-info-body">{body}</span>
          <div>
            <VoteScore
              id={id}
              object={post}
              entityName={constants.VOTE_OBJECT.POST}
              dispatch={dispatch}
              actionHandle={handlePostVoteScore}/>
            <span className="panel-info-right" style={{marginTop: "3px", textAlign: "right"}}><i>Comments {commentCount}</i></span>
          </div>
        </div>
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
function mapStateToProps({ categories, posts, common }, { id, fixedCategory=false }) {
  let post;
  //test to prevent refreshing on this page without loading app content
  if (!commons.isEmpty(posts)
        && posts.hasOwnProperty(id)) {
    post = posts[id];
  } else {
    post = Object.assign({}, constants.EMTPY_POST);
  }
  //extract the current Post's Category
  const category = post ? categories[post.category] : null;
  return {
    fixedCategory,
    id,
    category,
    post,
    common
  };
}

export default withRouter(connect(mapStateToProps)(PostItem));
