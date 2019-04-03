import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

/**
 * @description React component to create new Posts.
 */
class PostEdit extends Component {

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
    if (commons.isNull(this.props.post)) {
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
    const { dispatch, history } = this.props;
    dispatch(handleAddNewPost(editPost))
      .then(() => {
        if (!history.location.pathname.includes('/post/view/')) {
          //if this edition is not from a Post page, just go back to the source
          this.setState({
            goBack: true
          }, this.handleGoBack);
        }
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
    if (commons.isNull(post)) {
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
    const { category, history } = this.props;
    if (!commons.isNull(category)) {
      history.push('/category/'.concat(category.name));
    } else if (history.location.pathname.includes('/post/')) {
      history.push('/');
    } else {
      history.goBack();
    }
  }

  /** 
   * @description Lifecycle function to initialize component inner state controls 
   */
  componentDidMount() {
    let { editPost } = this.state;
    const { post, category, dispatch } = this.props;
    if (!commons.isNull(post)) {
      dispatch(addContextMenuItem({id: 'deletePost', name: 'Delete Post', handleClick: this.handleShowDialog, iconIndex: 'delete'}));
      editPost = Object.assign({}, post);
    } else if (commons.isEmpty(editPost.category) && !commons.isEmpty(category)) {
      editPost.category = category.name;
    }
    this.setState({ editPost });
  }

  /** 
   * @description Lifecycle function to finalize component inner state controls 
   */
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(deleteContextMenuItem('deletePost'));
  }

  /**
   * @description Lifecycle function to detect inner state controls changes from props changes
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.post && this.props.post
        && (nextProps.post.voteScore !== this.props.post.voteScore
            || nextProps.post.commentCount !== this.props.post.commentCount)) {
      const { post, readOnly } = nextProps;
      //se foi salvo
      this.props.dispatch(addContextMenuItem({id: 'deletePost', name: 'Delete Post', handleClick: this.handleShowDialog, iconIndex: 'delete'}));
      //update voteScore from redux state
      this.setState(currState => {
        currState['editPost']['voteScore'] = post.voteScore;
        currState['editPost']['commentCount'] = post.commentCount;
        currState['readOnly'] = readOnly;
        return currState;
      })
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

    const { readOnly, fixedCategory, categories, postComments, dispatch } = this.props;
    const { editPost, categoryRequired, showConfirmDialog, canUndo } = this.state;
    const { id, timestamp, category, title, body, author, commentCount } = editPost;

    //detect Post input state and title
    let pageTitle = (readOnly ? 'View' : 'Edit').concat(' Post');
    let flagCreate = false;
    if (commons.isNull(this.props.post)) {
      pageTitle = 'Create a new Post';
      flagCreate = true;
    }

    //control the max length countdown to body character length
    const bodyLeft = 500 - body.length;

    //Post deletion behavior required to ask user by dialog message
    let dialogSetup = {};
    if (showConfirmDialog) {
      dialogSetup = commons.createDeleteMessage(constants.ENTITY_NAME.POST,  this.handleDialogYesAnswer, this.handleDialogNoAnswer, ' and all its Comments');
    }

    return (
      <div>
        <form className="new-form" onSubmit={this.handleSubmit}>
          <div className="center">
            <h3 className="side-by-side">{pageTitle}</h3>
            {!readOnly && (
                <Fab color="primary" size="small" title="Save Post" className="create-fab"
                  type="submit" onSubmit={this.handleSubmit}>
                  <IconSave />
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
            <Fab color="secondary" title="Go Back" size="small" className="create-fab"
              type="button" onClick={this.handleClickExit}>
              <IconExit />
            </Fab>
          </div>
          <FormControl error={categoryRequired}>
            <InputLabel htmlFor="categories" className="inputField">
              Category*
            </InputLabel>
            <Select
              className="selectField"
              readOnly={fixedCategory || readOnly}
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

function mapStateToProps({ posts, comments, categories }, { history, location, match, id, post, category, readOnly=false }) {
  //a Post id was defined
  if (!commons.isEmpty(match.params.id)) {
    id = match.params.id;
  }
  //detect the input state
  if (!readOnly && location.pathname.includes('/post/view/')) {
    readOnly = true;
  }
  //extract the Post category
  if (!commons.isEmpty(match.params.category)
      && match.params.category !== '?') {
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
    }
  }
  //detect if category can change
  if (commons.isNull(category)
      && !commons.isNull(post)
      && match.params.fixedCategory === "true") {
    //category cannot be changed
    category = categories[post.category];
  }
  return {
    readOnly,
    categories,
    category,
    post: post ? post : null,
    postComments,
    fixedCategory: !commons.isEmpty(category)
  };
}

export default withRouter(connect(mapStateToProps)(PostEdit));
