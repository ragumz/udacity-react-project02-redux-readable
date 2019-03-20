import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as common from '../utils/common';
import * as constants from '../utils/constants';
import { handleAddNewPost, handlePostVoteScore } from './postOperations';
import { withRouter } from 'react-router-dom';
import VoteScore from '../common/VoteScore';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

export const EMTPY_POST = {
  id: '',
  category: '',
  title: '',
  body: '',
  author: '',
  timestamp: 0,
  voteScore: 0,
  commentCount: 0,
  deleted: false,
}

/**
 * @description Component to create new Posts.
 */
class PostEdit extends Component {
  state = {
    editPost: EMTPY_POST,
    goBack: false,
    categoryRequired: false,
  };

  handleChange = event => {
    this.setState((currState) => {
      currState.editPost[event.target.name] = event.target.value;
      return currState;
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if (common.isNull(this.props.post)) {
      this.handleCreatePost();
    } else {
      this.handleUpdatePost();
    }
  };

  handleCreatePost = () => {
    const { editPost } = this.state;
    //force category selection
    if (common.isEmpty(editPost.category)) {
      this.setState({categoryRequired: true});
      return;
    } else {
      this.setState({categoryRequired: false});
    }
    const { dispatch } = this.props;
    dispatch(handleAddNewPost(editPost))
      .then(() => {
        this.setState(() => ({
          goBack: true,
        }))
    });
  };

  handleUpdatePost = () => {

  };

  /**
   * @description React callback invoked when new props are to be received
   *
   * @param {object} nextProps The new props that will replace this.props
   */
  componentWillReceiveProps(nextProps) {
    //TODO: Check when update editPost state with this.props.post!!
    //shows the dialog if there is any message text.
    if ((!common.isEmpty(nextProps.category)
          && nextProps.category !== this.props.category)
        || (!common.isNull(nextProps.post))) {
      this.setState(currProps => ({
        ...currProps,
        category: nextProps.category,
        editPost: nextProps.post
      }));
    }
  }

  render() {
    const { editPost, goBack, categoryRequired } = this.state;

    let pageTitle = 'Edit Post', flagCreate = false;
    if (common.isNull(this.props.post)) {
      pageTitle = 'Create a new Post';
      flagCreate = true;
    }
    const { id, timestamp, category, title, body, author, commentCount } = editPost;
    const { fixedCategory, categories, dispatch } = this.props;

    if (goBack === true) {
      this.props.history.goBack();
      return <div />;
    }

    //control the max length
    const bodyLeft = 500 - body.length;

    return (
      <div>
        <h3 className="center">{pageTitle}</h3>
        <form className="new-post" onSubmit={this.handleSubmit}>
          <FormControl error={categoryRequired}>
            <InputLabel htmlFor="categories" className="inputField">Category*</InputLabel>
            <Select
              className="inputField"
              readOnly={fixedCategory}
              value={category}
              onChange={this.handleChange}
              required={true}
              input={
                <OutlinedInput
                  labelWidth={60}
                  name="category"
                  id="outlined-category"
                />
              }>
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
            variant="outlined"
            margin="normal"
            fullWidth={true}
            maxLength={200}
            value={title}
            required={true}
            onChange={this.handleChange}
          />
          <TextField
            id="author"
            name="author"
            label="Author"
            className="inputField"
            variant="outlined"
            margin="normal"
            fullWidth={true}
            maxLength={200}
            value={author}
            required={true}
            onChange={this.handleChange}
          />
          <TextField
            id="body"
            name="body"
            label="Body"
            className="textarea"
            variant="outlined"
            margin="normal"
            fullWidth={true}
            maxLength={500}
            rows={5}
            rowsMax={10}
            value={body}
            type="input"
            multiline={true}
            required={true}
            onChange={this.handleChange}
          />
          {bodyLeft <= 100 && <div className="post-length">{bodyLeft}</div>}
          <div className="label-info-timestamp">{common.formatDate(timestamp)}</div>
          <VoteScore
            id={id}
            object={editPost}
            entityName={constants.VOTE_OBJECT.POST}
            dispatch={dispatch}
            actionHandle={handlePostVoteScore}
            disabled={flagCreate}/>
          <span className="panel-info-right">Comments {commentCount}</span>
          <Button type="submit" variant="text" color="primary" onSubmit={this.handleSubmit}>
            Save
          </Button>
          {flagCreate && <Button type="button" variant="text" color="secondary">
            Clear Values
          </Button>}
        </form>
      </div>
    );
  }
}

function mapStateToProps({ posts, categories }, { match, id, post, category }) {
  if (!common.isEmpty(match.params.id)) {
    id = match.params.id;
  }
  if (!common.isEmpty(id) && common.isNull(post)) {
    post = posts[id];
  }
  return {
    categories,
    category,
    post: post ? post : null,
    fixedCategory: !common.isEmpty(category),
  };
}

export default withRouter(connect(mapStateToProps)(PostEdit));
