import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostList from './PostList'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>POSTS</h3>
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

export default connect(mapStateToProps)(Dashboard)