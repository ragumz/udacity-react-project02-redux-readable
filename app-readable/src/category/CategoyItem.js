import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostList from '../post/PostList'
import * as common from '../utils/common'

class CategoryItem extends Component {
  render() {
    const { id, category, posts/*, dispatch*/ } = this.props;

    if (common.isNull(category)) {
      return <p>Category {id} doesn't exist</p>;
    }
    const { name } = category;

    return (
      <div>
        <h2 className="category-item">{common.capitalize(name)} Category's Posts</h2>
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

export default connect(mapStateToProps)(CategoryItem);
