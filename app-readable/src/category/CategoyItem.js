import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PostList from '../post/PostList'
import * as commons from '../utils/commons'
import Fab from '@material-ui/core/Fab';
import IconAdd from '@material-ui/icons/Add';
import IconExit from '@material-ui/icons/ExitToApp';

/**
 * @description React component to show Category's details.
 */
class CategoryItem extends Component {

  /**
   * @description Component handle function to navigate to new Post Edit route
   */
  handleNewPost = (event) => {
    event.preventDefault();
    const { name, history } = this.props;
    history.push(`/${name}/newPost`)
  }

  /**
   * @description Component handle function to return to main page
   */
  handleClickExit = () => {
    this.props.history.push('/');
  }

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  render() {
    const { name, category, posts } = this.props;

    if (commons.isNull(category)) {
      return <p>Category {name} doesn't exist</p>;
    }

    return (
      <div>
        <div className="center">
          <h2 className="side-by-side">Category {name} Posts</h2>
          <Fab color="primary" title="Add New Post" size="small" className="create-fab"
            onClick={this.handleNewPost}>
              <IconAdd />
          </Fab>
          <Fab color="secondary" title="Go Back" size="small" className="create-fab"
            type="button" onClick={this.handleClickExit}>
            <IconExit />
          </Fab>
        </div>
        <PostList postsFilter={posts} flagFixedCategory={true} />
      </div>
    );
  }
}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps({ categories, posts, common }, { match }) {
  let { category } = match.params;
  const categoryObj = categories[category];
  const postsFilter = Object.values(posts)
                        .filter(post => post.category === category)
                        .reduce((obj, post) => {
                          obj[post.id] = post;
                          return obj;
                        }, {});
  return {
    name: category,
    category: categoryObj,
    posts: postsFilter,
    common
  };
}

export default withRouter(connect(mapStateToProps)(CategoryItem));
