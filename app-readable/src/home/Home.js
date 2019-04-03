import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryList from '../category/CategoryList';
import PostList from '../post/PostList';

/**
 * @description Home page React Component with all categories and posts lists
 */
class Home extends Component {

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  render() {
    return (
      <div>
        <CategoryList />
        <PostList />
      </div>
    )
  }
}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps ({ categories, posts }) {
  return {
    categories,
    posts,
  }
}

export default connect(mapStateToProps)(Home)