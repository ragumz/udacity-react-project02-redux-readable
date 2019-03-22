import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as commons from '../utils/common';
import * as constants from '../utils/constants';
import {
  handleAddNewPost,
  handleUpdatePost,
  handlePostVoteScore,
  handleDeletePost
} from './postOperations';
import VoteScore from '../common/VoteScore';
import MessageDialog from '../common/MessageDialog'
import CommentList from '../comment/CommentList'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

/**
 * @description Component to create new Posts.
 */
class PostEdit extends Component {
  state = {
    editPost: Object.assign({}, constants.EMTPY_POST),
    goBack: false,
    categoryRequired: false,
    showDeleteDialog: false,
    readOnly: false,
  };

  handleChangeValue = event => {
    const { name, value } = event.target;
    this.setState(currState => {
      currState['editPost'][name] = value;
      return currState;
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (commons.isNull(this.props.post)) {
      this.handleClickCreatePost();
    } else {
      this.handleClickUpdatePost();
    }
  };

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
    dispatch(handleAddNewPost(editPost)).then(() => {
      this.setState(() => ({
        goBack: true
      }));
    });
  };

  handleClickUpdatePost = () => {
    const { editPost } = this.state;
    const { dispatch } = this.props;
    dispatch(handleUpdatePost(editPost));
  };

  handleClickCancel = () => {
    let { post } = this.props;
    if (commons.isNull(post)) {
      post = Object.assign({}, constants.EMTPY_POST);
    } else {
      post = Object.assign({}, post);
    }
    this.setState({
      editPost: post
    })
  };

  handleShowDeleteDialog = (event) => {
    this.setState({ showDeleteDialog: true });
  };

  handleDeleteYes = (event) => {
    const { dispatch } = this.props;
    const { editPost } = this.state;
    this.setState({ showDeleteDialog: false });
    dispatch(handleDeletePost(editPost.id))
      .then(() => this.setState({goBack: true}));
  };

  handleDeleteNo = (event) => {
    this.setState({ showDeleteDialog: false });
  };

  componentDidMount() {
    let { editPost } = this.state;
    const { post, category } = this.props;
    if (!commons.isNull(post)) {
      editPost = Object.assign({}, post);
    } else if (commons.isEmpty(editPost.category) && !commons.isEmpty(category)) {
      editPost.category = category;
    }
    this.setState({ editPost });
  }

  /*componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate()", prevProps, prevState);
  }*/

  componentWillReceiveProps(nextProps) {
    if (nextProps.post && this.props.post
        && nextProps.post.voteScore !== this.props.post.voteScore) {
      const { post, readOnly } = nextProps;
      //update voteScore from redux state
      this.setState(currState => {
        currState['editPost']['voteScore'] = post.voteScore;
        currState['readOnly'] = readOnly;
        return currState;
      })
    }
  }

  render() {
    if (this.state.goBack === true) {
      this.props.history.goBack();
      return <div />;
    }

    const { editPost, categoryRequired, showDeleteDialog } = this.state;
    const { id, timestamp, category, title, body, author, commentCount } = editPost;
    const { readOnly, fixedCategory, categories, postComments, dispatch } = this.props;

    let pageTitle = 'Edit Post',
      flagCreate = false;
    if (commons.isNull(this.props.post)) {
      pageTitle = 'Create a new Post';
      flagCreate = true;
    }

    //control the max length
    const bodyLeft = 500 - body.length;

    //deletion behavior
    let deleteDialog = {};
    if (showDeleteDialog) {
      deleteDialog = commons.createDeleteMessage(constants.ENTITY_NAME.POST,  this.handleDeleteYes, this.handleDeleteNo);
    }

    return (
      <div>
        <h3 className="center">{pageTitle}</h3>
        <form className="new-post" onSubmit={this.handleSubmit}>
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
                <MenuItem key={categories[key].name} value={categories[key].name}>
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
            readOnly={readOnly}
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
            readOnly={readOnly}
            onChange={event => this.handleChangeValue(event)}
          />
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
            readOnly={readOnly}
            onChange={event => this.handleChangeValue(event)}
          />
          {bodyLeft <= 100 && <div className="post-length">{bodyLeft}</div>}
          {!flagCreate &&
            <div>
              <div className="label-info-timestamp">{commons.formatDate(timestamp)}</div>
              <VoteScore
                id={id}
                object={editPost}
                entityName={constants.VOTE_OBJECT.POST}
                dispatch={dispatch}
                actionHandle={handlePostVoteScore}
                disabled={flagCreate}
              />
              <span className="panel-info-right">Comments {commentCount}</span>
            </div>
          }
          <div>
            <Button
              className="edit-button"
              type="submit"
              variant="contained"
              color="primary"
              onSubmit={this.handleSubmit}>
              Save
            </Button>
            <Button
              className="edit-button"
              type="button"
              variant="contained"
              color="secondary"
              onClick={this.handleClickCancel}>
              Cancel
            </Button>
            {!flagCreate && (
              <Button
                className="edit-button"
                type="button"
                variant="contained"
                color="secondary"
                onClick={this.handleShowDeleteDialog}>
                Delete
              </Button>
            )}
          </div>
        </form>
        {(!flagCreate && !commons.isEmpty(id)) &&
          <div>
            <CommentList commentsFilter={postComments} parentPost={editPost} />
          </div>
        }
        <MessageDialog
          userMessage={deleteDialog.userMessage}
          buttons={deleteDialog.messageButtons}
        />
      </div>
    );
  }
}

function mapStateToProps({ posts, comments, categories }, { match, id, post, category, readOnly=false }) {
  if (!commons.isEmpty(match.params.id)) {
    id = match.params.id;
  }
  let postComments = null;
  if (!commons.isEmpty(id) && commons.isNull(post)) {
    //test to prevent refreshing on this page without loading app content
    if (!commons.isEmpty(posts) && posts.hasOwnProperty(id)) {
      postComments = commons.arrayToIndexedObject(Object.values(comments).filter(comment => comment.parentId === id));
      //freezing the object to avoid its change
      post = Object.freeze(posts[id]);
    }
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
