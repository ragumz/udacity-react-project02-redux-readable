import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostItem from './PostItem'
import SortListMenu from '../common/SortListMenu'
import { ENTITY_NAME } from '../utils/constants'
import { getSortedEntityId, sortEntityMap } from '../common/commonOperations'

export const POST_SORT_MENU = [
  {title: 'Author', fieldName: 'author'},
  {title: 'Comment Count', fieldName: 'commentCount'},
  {title: 'Creation Time', fieldName: 'timestamp'},
  {title: 'Title', fieldName: 'title'},
  {title: 'Vote Score', fieldName: 'voteScore'},
]

class PostList extends Component {

  render() {
    const { posts, sortingSetup } = this.props;

    let sortedPosts = sortEntityMap(posts, sortingSetup)
                        .filter(key => posts[key].deleted !== true);

    return (
      <div>
        <div className="center">
          <h3 className="side-by-side">POSTS</h3>
          <SortListMenu entityName={ENTITY_NAME.POST} sortMenuOptions={POST_SORT_MENU}  />
        </div>

        <ul className="dashboard-list">
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

function mapStateToProps ({ posts, common },{ postsFilter }) {
  return {
    posts: postsFilter ? postsFilter : posts,
    sortingSetup: common[getSortedEntityId(ENTITY_NAME.POST)]
  }
}

export default connect(mapStateToProps)(PostList)