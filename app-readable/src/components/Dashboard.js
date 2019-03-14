import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryList from './category/CategoryList';
import PostList from './post/PostList';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>CATEGORIES</h3>
        <CategoryList />
        <h3 className='center'>POSTS</h3>
        <PostList />
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts, common }) {
  return {
    categories,
    posts,
  }
}

export default connect(mapStateToProps)(Dashboard)