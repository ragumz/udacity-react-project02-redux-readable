import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import * as commons from '../utils/commons';
import * as constants from '../utils/constants';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconHome from '@material-ui/icons/Home';
import IconAdd from '@material-ui/icons/Add';
import IconDelete from '@material-ui/icons/Delete';
import IconHelp from '@material-ui/icons/LiveHelp';

/**
 * @description Home page main Menu and contextual menu items React component.
 */
class Menu extends Component {

  /**
   * @description Select one Material-UI icon from an index name
   */
  chooseIconByIndex = (iconIndex) => {
    if (commons.isEmpty(iconIndex)) {
      return <IconHelp />;
    }
    switch (iconIndex) {
      case 'add':
        return <IconAdd />;
      case 'delete':
        return <IconDelete />;
      default:
        return <IconHelp />;
    }
  }

  /**
   * @description Find out the current category of the page to guarantee the New Post
   * behavior creation because Router match.params content was null on some contexts.
   */
  extractFixeCategoryName = () => {
    const { posts, location } = this.props;

    let currentCategory = constants.CATEGORY_UNSELECTED;
    //extract category from URL path name because match doest have any params
    if (location.pathname.length > 1 && !location.pathname.includes('/post/')) {
      let startIndex = location.pathname.indexOf('/');
      let pathCategory = location.pathname.substring(startIndex+1);
      if (pathCategory.length > 0) {
        return pathCategory;
      }
    }
    //extract post's category name from URL path name because match doest have any params
    const postLocation =  location.pathname;
    if (postLocation.endsWith('/true')) {
      let index = postLocation.indexOf('/edit/');
      if (index < 0) {
        index = postLocation.indexOf('/view/');
      }
      if (index > -1) {
        const currentPost = postLocation.substring(index+11, postLocation.length-5);
        if (!commons.isNull(currentPost)) {
          currentCategory = posts[currentPost].category;
        }
      }
    }
    return currentCategory;
  }

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  render () {
    const { common, location } = this.props;

    //get all contextual menu indexes to render respective buttons and links
    const contextMenuKeys = Object.keys(common).filter(key => key.startsWith(constants.MENU_ITEM_CONTEXT_PREFIX));
    //discover current category name from URL params
    const currentCategory = this.extractFixeCategoryName();

    return (
      <div>
        <Toolbar>
          <Typography className="appbar-title" variant="h6" color="inherit">
            Posts and Comments
          </Typography>
          <div className="divider" />
          <NavLink to="/" exact activeClassName="active">
            <Button className="button-menu-context">
              <IconHome />
              Home
            </Button>
          </NavLink>
          { !location.pathname.includes('/newPost/') &&
            <NavLink to={`/${currentCategory}/newPost/`} activeClassName="active">
              <Button className="button-menu-context">
                <IconAdd />
                New Post
              </Button>
            </NavLink>
          }

          { contextMenuKeys.length > 0 &&
            contextMenuKeys.map(key => {
              const menuItem = common[key];
              let dynamicIcon = this.chooseIconByIndex(menuItem.iconIndex);
              return <div key={`ctm_${key}`} color="inherit">
                { !commons.isNull(menuItem.urlLink) &&
                  <NavLink key={`nl_${key}`} to={menuItem.urlLink} activeClassName="active">
                    <Button key={`bt_${key}`} className="button-menu-context">
                      {menuItem.name}
                    </Button>
                  </NavLink>
                 }
                 { commons.isNull(menuItem.urlLink) && !commons.isNull(menuItem.handleClick) &&
                    <Button key={`bt_${key}`} className="button-menu-context"
                      onClick={menuItem.handleClick}>
                      <div>
                        {dynamicIcon}
                      </div>
                      {menuItem.name}
                    </Button>
                 }
              </div>
            })
          }
        </Toolbar>
      </div>
    );
  }
}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps({ posts, common }) {
  return {
    posts,
    common
  }
}

export default withRouter(connect(mapStateToProps)(Menu));