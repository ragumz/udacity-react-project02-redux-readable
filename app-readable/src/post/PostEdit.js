import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as commons from '../utils/commons';
import * as constants from '../utils/constants';
import {
  handleAddNewPost,
  handleUpdatePost,
  handlePostVoteScore,
  handleDeletePost
} from './postOperations';
import {
  addContextMenuItem,
  deleteContextMenuItem
} from '../common/commonActions';
import NoRouteFound from '../common/NoRouteFound';
import Card from '@material-ui/core/Card';
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
import IconExit from '@material-ui/icons/ExitToApp';
import IconEdit from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

/**
 * @description React component to create new Posts.
 */
class PostEdit extends Component {
  /**
   * @description Define props' arguments' types
   */
  static propTypes = {
    id: PropTypes.string,
    post: PropTypes.object,
    category: PropTypes.object,
    readOnly: PropTypes.bool,
  };

  /**
   * @description Initializes component states
   */
  state = {
    /** @description Edited/Viewed Post object */
    editPost: Object.assign({}, constants.EMTPY_POST),
    /** @description Navigation flag indicating end of component use */
    goBack: false,
    /** @description Control flag to force one Category to Post */
    categoryRequired: false,
    /** @description Control flag to manage dialog user interaction */
    showConfirmDialog: false,
    /** @description Control flag to make readonly all input fields of Posts data */
    readOnly: false,
    /** @description Control flag to detect if an Post edition can be undone */
    canUndo: false,
  };

  isNewPost = () => {
    const { postId, post } = this.props;
    return postId === constants.NEW_POST_PATH || commons.isEmpty(postId) || commons.isNull(post);
  }

  /**
   * @description Component handle function to update an editing Post field value with input events from user
   */
  handleChangeValue = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState(currState => {
      currState['editPost'][name] = value;
      currState['canUndo'] = true;
      return currState;
    });
  };

  /**
   * @description Component handle function to manage Post creation or update
   */
  handleSubmit = event => {
    event.preventDefault();
    if (this.isNewPost()) {
      this.handleClickCreatePost();
    } else {
      this.handleClickUpdatePost();
    }
  };

  /**
   * @description Component handle function to create a new Post through reducer actions
   */
  handleClickCreatePost = () => {
    const { editPost } = this.state;
    //force category selection
    if (commons.isEmpty(editPost.category)) {
      this.setState({ categoryRequired: true });
      return;
    } else {
      this.setState({ categoryRequired: false });
    }
    const { dispatch } = this.props;
    dispatch(handleAddNewPost(editPost))
      .then(() => {
        //if this edition is not from a Post page, just go back to the source
        this.setState({
          goBack: true
        }, this.handleGoBack);
      });
  };

  /**
   * @description Component handle function to update an existing Post through reducer actions
   */
  handleClickUpdatePost = () => {
    const { editPost } = this.state;
    const { dispatch } = this.props;
    dispatch(handleUpdatePost(editPost))
      .then(() => {
        this.setState({canUndo: false});
      });
  };

  /**
   * @description Component handle function to exit from the current page
   */
  handleClickExit = () => {
    this.setState({
      goBack: true
    }, this.handleGoBack);
  }

  /**
   * @description Component handle function to undo user changes over Post's field input values
   */
  handleClickUndo = () => {
    let { post, category } = this.props;
    if (this.isNewPost()) {
      //if it is a new Post
      post = Object.assign({}, constants.EMTPY_POST);
    } else {
      //if it is an existing Post
      post = Object.assign({}, post);
    }
    if (!commons.isNull(category)) {
      //force category name
      post.category = category.name;
    }
    this.setState({
      editPost: post,
      canUndo: false,
    })
  };

  /**
   * @description Component handle function to show a dialog to the user
   */
  handleShowDialog = (event) => {
    this.setState({ showConfirmDialog: true });
  };

  /**
   * @description Component handle function to process dialog user Yes decision button
   */
  handleDialogYesAnswer = (event) => {
    const { dispatch } = this.props;
    const { editPost } = this.state;
    this.setState({ showConfirmDialog: false });
    dispatch(handleDeletePost(editPost.id))
      .then(() => this.setState({
        goBack: true
      }, this.handleGoBack));
  };

  /**
   * @description Component handle function to process dialog user No decision button
   */
  handleDialogNoAnswer = (event) => {
    this.setState({ showConfirmDialog: false });
  };

  /**
   * @description Component handle function to discover the right path to return after an demanding action.
   */
  handleGoBack = () => {
    const { history, category } = this.props;
    const { editPost } = this.state;
    //return to home page to avoid edit confusion
    if (commons.isNull(category)) {
      history.push('/');
    } else if (commons.isNull(editPost) || commons.isNull(editPost.category) ) {
      history.push(`/${category.name}`);
    } else {
      history.push(`/${editPost.category}`);
    }
  }

  /**
   * @description When viewing Post's details make it to edit the current object
   */
  handleEdit = () => {
    this.setState({ readOnly: false }, () => {
      //this.titleInput.focus();
    });
  }

  /**
   * @description Lifecycle function to initialize component inner state controls
   */
  componentDidMount() {
    const { editPost } = this.state;
    let newEditPost = Object.assign({}, editPost);
    const { post, category, dispatch, readOnly } = this.props;
    if (!this.isNewPost()) {
      dispatch(addContextMenuItem({id: 'deletePost', name: 'Delete Post', handleClick: this.handleShowDialog, iconIndex: 'delete'}));
      newEditPost = Object.assign({}, post);
    } else if (commons.isEmpty(newEditPost.category) && !commons.isEmpty(category)) {
      newEditPost.category = category.name;
    }
    this.setState({ editPost: newEditPost, readOnly });
  }

  /**
   * @description Lifecycle function to finalize component inner state controls
   */
  componentWillUnmount() {
    //update full component state
    this.setState({
      editPost: Object.assign({}, constants.EMTPY_POST),
      canUndo: false,
      readOnly: false,
      categoryRequired: false,
    });
    const { dispatch } = this.props;
    dispatch(deleteContextMenuItem('deletePost'));
  }

  /**
   * @description Lifecycle function to detect inner state controls changes from props changes
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.postId !== constants.EMTPY_POST && commons.isNull(nextProps.post)) {
      this.setState({
        editPost: null,
        canUndo: false,
        readOnly: false,
        categoryRequired: false,
      });
      return;
    }
    if (nextProps.postId !== constants.NEW_POST_PATH
        && nextProps.post && this.props.post
        && (nextProps.post.voteScore !== this.props.post.voteScore
            || nextProps.post.commentCount !== this.props.post.commentCount)) {
      //update post state
      const { post } = nextProps;
      //when post is sucessfully saved add delete context option
      this.props.dispatch(addContextMenuItem({id: 'deletePost', name: 'Delete Post', handleClick: this.handleShowDialog, iconIndex: 'delete'}));
      //update voteScore from redux state
      this.setState(currState => {
        currState['editPost']['voteScore'] = post.voteScore;
        currState['editPost']['commentCount'] = post.commentCount;
        return currState;
      })
    } else {
      //update full component state
      this.setState({
        editPost: Object.assign({}, nextProps.post),
        canUndo: false,
        readOnly: nextProps.readOnly,
        categoryRequired: false,
      });
    }
  }

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  render() {
    if (this.state.goBack === true) {
      //no content can be shown anymore
      return <div />;
    }

    const { postId, post, categories, postComments, dispatch } = this.props;
    if (!commons.isEmpty(postId) && commons.isNull(post)) {
      return <NoRouteFound />;
    }

    const { editPost, readOnly, categoryRequired, showConfirmDialog, canUndo } = this.state;
    const { id, timestamp, category, title, body, author, commentCount } = editPost;

    //detect Post input state and title
    let pageTitle = (readOnly ? 'VIEW' : 'EDIT').concat(' POST');
    let flagCreate = false;
    if (this.isNewPost()) {
      pageTitle = 'CREATE NEW POST';
      flagCreate = true;
    }
    const backTitle = commons.isNull(this.props.category) ? 'Go Back to Home' : 'Go Back to Category';

    //control the max length countdown to body character length
    const bodyLeft = 500 - body.length;

    //Post deletion behavior required to ask user by dialog message
    let dialogSetup = {};
    if (showConfirmDialog) {
      dialogSetup = commons.createDeleteMessage(constants.ENTITY_NAME.POST,  this.handleDialogYesAnswer, this.handleDialogNoAnswer, ' and all its Comments');
    }

    return (
      <div className="post-panel">
        <form className="new-form" onSubmit={this.handleSubmit}>
          <div className="center">
            <h3 className="side-by-side">{pageTitle}</h3>
            {!readOnly && (
                <Fab color="primary" size="small" title="Save Post" className="create-fab"
                  type="submit" onSubmit={this.handleSubmit}>
                  <IconSave />
                </Fab>
            )}
            {readOnly && (
                <Fab color="primary" size="small" title="Edit Post" className="create-fab"
                  type="button" onClick={this.handleEdit}>
                  <IconEdit />
                </Fab>
            )}
            {!flagCreate && (
                <Fab color="secondary" title="Delete Post" size="small" className="create-fab"
                  type="button" onClick={this.handleShowDialog}>
                  <IconDelete />
                </Fab>
            )}
            {!readOnly && (
                <Fab color="secondary" title="Undo All Changes" size="small" className="create-fab"
                  type="button" onClick={this.handleClickUndo} disabled={!canUndo}>
                  <IconUndo />
                </Fab>
            )}
            <Fab color="secondary" title={backTitle} size="small" className="create-fab"
              type="button" onClick={this.handleClickExit}>
              <IconExit />
            </Fab>
          </div>
          <Card className="post" raised>
          <FormControl error={categoryRequired} className="selectField">
            <InputLabel htmlFor="categories" className="inputField">
              Category*
            </InputLabel>
            <Select
              readOnly={readOnly}
              value={category}
              onChange={event => this.handleChangeValue(event)}
              required={true}
              input={<Input name="category" id="input-category" />}>
              {Object.keys(categories).map(key => (
                <MenuItem key={categories[key].name} value={categories[key].name} >
                  {categories[key].name}
                </MenuItem>
              ))}
            </Select>
            {categoryRequired && <FormHelperText>Choose a category.</FormHelperText>}
          </FormControl>
          <TextField
            id="title"
            ref={(titleInput) => { this.titleInput = titleInput; }}
            name="title"
            label="Title"
            className="inputField"
            variant="standard"
            margin="normal"
            fullWidth={true}
            maxLength={200}
            value={title}
            required={true}
            inputProps={{ readOnly: Boolean(readOnly) }}
            onChange={event => this.handleChangeValue(event)}
          />
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
            inputProps={{ readOnly: Boolean(readOnly) }}
            onChange={event => this.handleChangeValue(event)}
          />
          {!flagCreate &&
              <div className="text-right" style={{width: '100%'}}>
                <span className="label-info-timestamp">{commons.formatDate(timestamp)}</span>
              </div>
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
            inputProps={{ readOnly: Boolean(readOnly) }}
            onChange={event => this.handleChangeValue(event)}
          />
          {bodyLeft <= 100 && <div className="textarea-length">{bodyLeft}</div>}
          {!flagCreate &&
            <div>
              <VoteScore
                id={id}
                object={editPost}
                entityName={constants.VOTE_OBJECT.POST}
                dispatch={dispatch}
                actionHandle={handlePostVoteScore}
              />
              <span className="panel-info-right" style={{marginTop: "3px", textAlign: "right"}}><i>Comments {commentCount}</i></span>
            </div>
          }
          </Card>
        </form>
        {(!flagCreate && !commons.isEmpty(id)) &&
          <div>
            <CommentList commentsFilter={postComments} parentPost={editPost} />
          </div>
        }
        <MessageDialog
          userMessage={dialogSetup.userMessage}
          buttons={dialogSetup.messageButtons}
        />
      </div>
    );
  }
}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps({ posts, comments, categories }, { match, id, post, category, readOnly=false }) {
  //a Post id was defined
  if (!commons.isEmpty(match.params.post_id)) {
    id = match.params.post_id;
  }
  //extract the Post category
  if (!commons.isEmpty(match.params.category)
      && match.params.category !== constants.UNSELECTED_CATEGORY_PATH) {
    category = categories[match.params.category];
  }
  let postComments = null;
  //load Post's comments if existing Post and Comments
  if (!commons.isEmpty(id) && commons.isNull(post)) {
    //test to prevent refreshing on this page without loading app content
    if (!commons.isEmpty(posts) && posts.hasOwnProperty(id)) {
      postComments = commons.arrayToIndexedObject(Object.values(comments).filter(comment => comment.parentId === id));
      //freezing the object to avoid its change
      post = Object.freeze(posts[id]);
    } else if (constants.NEW_POST_PATH === id) {
      const categName = category ? category.name : '';
      post = Object.assign({}, constants.EMTPY_POST, {category: categName});
    }
  }
  //detect if category can change
  if (commons.isNull(category)
      && !commons.isNull(post)
      && !commons.isEmpty(post.category)) {
    //category cannot be changed
    category = categories[post.category];
  }
  return {
    postId: id,
    readOnly,
    categories,
    category,
    post: post ? post : null,
    postComments,
  };
}

export default withRouter(connect(mapStateToProps)(PostEdit));
