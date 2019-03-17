import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as common from '../utils/common';
import { handleAddNewPost } from './postOperations';
import { withRouter } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const NEW_POST = {
  category: '',
  title: '',
  body: '',
  author: ''
};

/**
 * @description Component to create new Posts.
 */
class PostCreate extends Component {
  state = {
    ...NEW_POST,
    goBack: false,
    categoryRequired: false,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { category, title, body, author } = this.state;
    if (common.isEmpty(category)) {
      this.setState({categoryRequired: true});
      return;
    } else {
      this.setState({categoryRequired: false});
    }

    const { dispatch } = this.props;
    dispatch(handleAddNewPost(category, title, body, author));
    this.setState(() => ({
      ...NEW_POST,
      goBack: true
    }));
  };

  /**
   * @description React callback invoked when new props are to be received
   *
   * @param {object} nextProps The new props that will replace this.props
   */
  componentWillReceiveProps(nextProps) {
    //shows the dialog if there is any message text.
    if (!common.isEmpty(nextProps.category) && nextProps.category !== this.props.category) {
      this.setState(currProps => ({
        ...currProps,
        category: nextProps.category
      }));
    }
  }

  render() {
    const { categoryRequired, category, title, body, author, goBack } = this.state;
    const { fixedCategory, categories } = this.props;

    if (goBack === true) {
      //return <Redirect to={common.isEmpty(sourceLocation) ? '/' : sourceLocation} />
      this.props.history.goBack();
      return <div />;
    }

    //control the max length
    const bodyLeft = 500 - body.length;

    return (
      <div>
        <h3 className="center">Create a new Post</h3>
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
          <Button type="submit" variant="contained" color="primary" onSubmit={this.handleSubmit}>
            Save
          </Button>
          <Button type="button" variant="contained" color="secondary">
            Clear Values
          </Button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ categories }, { category }) {
  return {
    categories,
    category,
    fixedCategory: !common.isEmpty(category),
  };
}

export default withRouter(connect(mapStateToProps)(PostCreate));
