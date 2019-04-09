import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import * as commons from '../utils/commons';
import * as constants from '../utils/constants';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
  extractNewPostPath = () => {
    const { location } = this.props;

    let currentCategory = constants.UNSELECTED_CATEGORY_PATH;
    const currLocation =  location.pathname;
    //extract category from URL path name because match doest have any params
    if (currLocation.length > 1) {
      const startIndex = currLocation.indexOf('/')+1;
        if (startIndex > 0) {
          const endIndex = currLocation.indexOf('/', startIndex);
          if (endIndex > -1) {
            currentCategory = currLocation.substring(startIndex, endIndex);
          } else {
            currentCategory = currLocation.substring(startIndex);
          }
        }
    }
    return `/${currentCategory}/${constants.NEW_POST_PATH}`;
  }

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  render () {
    const { common, location } = this.props;

    //get all contextual menu indexes to render respective buttons and links
    const contextMenuKeys = Object.keys(common).filter(key => key.startsWith(constants.MENU_ITEM_CONTEXT_PREFIX));
    //discover current category name from URL params
    const newPostPath = this.extractNewPostPath();

    return (
      <div>
        <Toolbar>
          <NavLink to="/" exact activeClassName="active">
            <Typography className="appbar-title" variant="h6" style={{color: 'white'}}>
              Posts and Comments
            </Typography>
          </NavLink>
          <div className="divider" />
          { !location.pathname.includes(`/${constants.NEW_POST_PATH}`) &&
            <NavLink to={`${newPostPath}`} exact activeClassName="active">
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