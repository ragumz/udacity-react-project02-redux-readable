import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostItem from './PostItem'
import SortListMenu from '../common/SortListMenu'
import { ENTITY_NAME } from '../utils/constants'
import { getSortedEntityId, sortEntityMap } from '../common/commonOperations'

/**
 * @description Object with global Post sort menu options.
 */
export const POST_SORT_MENU = [
  {title: 'Author', fieldName: 'author'},
  {title: 'Comment Count', fieldName: 'commentCount'},
  {title: 'Creation Time', fieldName: 'timestamp'},
  {title: 'Title', fieldName: 'title'},
  {title: 'Vote Score', fieldName: 'voteScore'},
]

/**
 * @description React component to enlist all existing Posts.
 */
class PostList extends Component {

  render() {
    const { posts, sortingSetup, fixedCategory } = this.props;
    //execute sort method over Post collection from menu user sorting selection
    let sortedPosts = sortEntityMap(posts, sortingSetup)
                        .filter(key => posts[key].deleted !== true);

    return (
      <div>
        <div className="center">
          <h3 className="side-by-side">POSTS</h3>
          <SortListMenu entityName={ENTITY_NAME.POST} sortMenuOptions={POST_SORT_MENU}  />
        </div>
        <ul className="unordered-list">
          {sortedPosts.map((id) => (
            <li key={id}>
              <PostItem id={id} fixedCategory={fixedCategory}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ posts, common },{ postsFilter, fixedCategory=false }) {
  return {
    fixedCategory,  //control flag to force a Post's Category
    posts: postsFilter ? postsFilter : posts, //post data collection
    sortingSetup: common[getSortedEntityId(ENTITY_NAME.POST)] //menu user sort selection
  }
}

export default connect(mapStateToProps)(PostList)