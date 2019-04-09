import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import * as commons from '../utils/commons';
import * as constants from '../utils/constants';
import NoRouteFound from '../common/NoRouteFound';
import PostList from '../post/PostList';
import Fab from '@material-ui/core/Fab';
import IconAdd from '@material-ui/icons/Add';
import IconExit from '@material-ui/icons/ExitToApp';

/**
 * @description React component to show Category's details.
 */
const CategoryItem = ({name, category, posts, history}) => {

  /**
   * @description Component handle function to navigate to new Post Edit route
   */
  const handleNewPost = (event) => {
    event.preventDefault();
    history.push(`/${name}/${constants.NEW_POST_PATH}`)
  }

  /**
   * @description Component handle function to return to main page
   */
  const handleClickExit = () => {
    history.push('/');
  }

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  return (
    <div>
      {!commons.isNull(category) &&
      <div>
        <div className="center">
          <h2 className="side-by-side">{name.toUpperCase()} CATEGORY</h2>
          <Fab color="primary" title="Add New Post" size="small" className="create-fab"
            onClick={handleNewPost}>
              <IconAdd />
          </Fab>
          <Fab color="secondary" title="Go Back to Home" size="small" className="create-fab"
            type="button" onClick={handleClickExit}>
            <IconExit />
          </Fab>
        </div>
        <PostList postsFilter={posts} />
      </div>
      }
      {commons.isNull(category) &&
        <NoRouteFound />
      }
    </div>
  );
}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps({ categories, posts, common }, { match }) {
  let { category } = match.params;
  let postsFilter = null, categoryObj = null;
  if (!commons.isEmpty(category)) {
    categoryObj = categories[category];
    if (!commons.isNull(categoryObj)) {
      postsFilter = Object.values(posts)
                          .filter(post => post.category === category)
                          .reduce((obj, post) => {
                            obj[post.id] = post;
                            return obj;
                          }, {});
    }
  }
  return {
    name: category,
    category: categoryObj,
    posts: postsFilter,
    common
  };
}

export default withRouter(connect(mapStateToProps)(CategoryItem));
