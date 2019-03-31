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


class Menu extends Component {

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

  extractFixeCategoryName = () => {
    const { posts, location } = this.props;

    let currentCategory = '_';
    //extract category from URL path name because match doest have any params
    let index = location.pathname.indexOf('/category/');
    if (index > -1) {
      return location.pathname.substring(index+10);
    }
    //extract post's category name from URL path name because match doest have any params
    const postLocation =  location.pathname;
    if (postLocation.endsWith('/true')) {
      index = postLocation.indexOf('/post/');
      if (index > -1) {
        const currentPost = postLocation.substring(index+11, postLocation.length-5);
        if (!commons.isNull(currentPost)) {
          currentCategory = posts[currentPost].category;
        }
      }
    }
    return currentCategory;
  }

  render () {
    const { common, location } = this.props;

    const contextMenuKeys = Object.keys(common).filter(key => key.startsWith(constants.MENU_ITEM_CONTEXT_PREFIX));

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
          { !location.pathname.includes('/post/new/') &&
            <NavLink to={`/post/new/${currentCategory}`} activeClassName="active">
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

function mapStateToProps({ posts, common }) {
  return {
    posts,
    common
  }
}

export default withRouter(connect(mapStateToProps)(Menu));