import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryList from '../category/CategoryList';
import PostList from '../post/PostList';

class Home extends Component {
  render() {
    return (
      <div>
        <CategoryList />
        <PostList />
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts }) {
  return {
    categories,
    posts,
  }
}

export default connect(mapStateToProps)(Home)