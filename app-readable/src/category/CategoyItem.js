import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostList from '../post/PostList'
import * as commons from '../utils/commons'
import Fab from '@material-ui/core/Fab';
import IconAdd from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom'
class CategoryItem extends Component {

  handleNewPost = (event) => {
    event.preventDefault();
    const { id, history } = this.props;
    history.push(`/post/new/${id}`)
  }

  render() {
    const { id, category, posts/*, dispatch*/ } = this.props;

    if (commons.isNull(category)) {
      return <p>Category {id} doesn't exist</p>;
    }
    const { name } = category;

    return (
      <div>
        <div className="center">
        <h2 className="side-by-side">{commons.capitalize(name)} Category's Posts</h2>
          <Fab color="primary" aria-label="Add New Post" size="small" placeholder="Add New Post" className="create-fab"
            onClick={this.handleNewPost}>
              <IconAdd placeholder="Add New Post"/>
          </Fab>
        </div>
        <PostList postsFilter={posts} />
      </div>
    );
  }
}

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
