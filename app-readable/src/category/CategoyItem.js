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
    const { id, history } = this.props;
    history.push(`/post/new/${id}`)
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
    const { id, category, posts } = this.props;

    if (commons.isNull(category)) {
      return <p>Category {id} doesn't exist</p>;
    }
    const { name } = category;

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
        <PostList postsFilter={posts} fixedCategory={true} />
      </div>
    );
  }
}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps({ categories, posts, common }, props) {
  let { id } = props.match.params;
  if (!id) {
    id = props.id;
  }
  const category = categories[id];
  const postsFilter = Object.values(posts)
                        .filter(post => post.category === id)
                        .reduce((obj, post) => {
                          obj[post.id] = post;
                          return obj;
                        }, {});
  return {
    id,
    category,
    posts: postsFilter,
    common
  };
}

export default withRouter(connect(mapStateToProps)(CategoryItem));
