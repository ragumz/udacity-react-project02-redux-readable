import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostItem from './PostItem'

class PostList extends Component {

  state = {
    sortField: 'voteScore',
    sortType: 'asc',
  }

  render() {
    const { posts } = this.props;
    const { sortField/*, sortType*/ } = this.state;

    const sortedPosts = Object.keys(posts)
                      .sort((a,b) => posts[b][sortField] > posts[a][sortField])

    return (
      <div>
        <ul className='dashboard-list'>
          {sortedPosts.map((id) => (
            <li key={id}>
              <PostItem id={id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ posts },{ postsFilter }) {
  return {
    posts: postsFilter ? postsFilter : posts
  }
}

export default connect(mapStateToProps)(PostList)