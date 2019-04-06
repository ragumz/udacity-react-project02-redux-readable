import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import SortListMenu from '../common/SortListMenu';
import { ENTITY_NAME } from '../utils/constants';
import { getSortedEntityId, sortEntityMap } from '../common/commonOperations';

/**
 * @description Object with global Post sort menu options.
 */
export const POST_SORT_MENU = [
  {title: 'Category', fieldName: 'category'},
  {title: 'Author', fieldName: 'author'},
  {title: 'Comment Count', fieldName: 'commentCount'},
  {title: 'Creation Time', fieldName: 'timestamp'},
  {title: 'Title', fieldName: 'title'},
  {title: 'Vote Score', fieldName: 'voteScore'},
]

/**
 * @description React component to enlist all existing Posts.
 */
const PostList = ({posts, sortingSetup, flagFixedCategory}) => {

  /**
   * @description Apply sorting setup options to the Posts' object collection
   */
  const getSortedPosts = () => {
    //execute sort method over Post collection from menu user sorting selection
    return sortEntityMap(posts, sortingSetup).filter(key => posts[key].deleted !== true);
  }

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  return (
    <div>
      <div className="center">
        <h3 className="side-by-side">POSTS</h3>
        <SortListMenu entityName={ENTITY_NAME.POST} sortMenuOptions={POST_SORT_MENU}  />
      </div>
      <ul className="unordered-list">
        {getSortedPosts().map((id) => (
          <li key={id}>
            <PostItem id={id} flagFixedCategory={flagFixedCategory}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps ({ posts, common },{ postsFilter, flagFixedCategory=false }) {
  return {
    //control flag to force a Post's Category
    flagFixedCategory,
    //post data collection
    posts: postsFilter ? postsFilter : posts,
    //menu user sort selection
    sortingSetup: common[getSortedEntityId(ENTITY_NAME.POST)]
  }
}

/**
 * @description Define props' arguments' types
 */
PostList.propTypes = {
  postsFilter: PropTypes.object,
  flagFixedCategory: PropTypes.bool,
};

export default connect(mapStateToProps)(PostList)