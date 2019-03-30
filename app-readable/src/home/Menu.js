import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import * as commons from '../utils/commons';
import * as constants from '../utils/constants';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Menu extends Component {
  render () {
    const { common, location } = this.props;

    const contextMenuKeys = Object.keys(common).filter(key => key.startsWith(constants.MENU_ITEM_CONTEXT_PREFIX));

    let currentCategory = '_';
    const index = location.pathname.indexOf('/category/');
    if (index > -1) { //TODO: match.params.id do not contains any ':id' value to use
      currentCategory = location.pathname.substring(index+10);
    }

    return (
      <div>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
              Post and Comments with Reac+Redux
          </Typography>
          <NavLink to="/" exact activeClassName="active">
            <Button color="inherit">Home</Button>
          </NavLink>
          { !location.pathname.includes('/post/new/') &&
            <NavLink to={`/post/new/${currentCategory}`} activeClassName="active">
              <Button color="inherit">New Post</Button>
            </NavLink>
          }
          { contextMenuKeys.length > 0 &&
            contextMenuKeys.map(key => {
              const menuItem = common[key];
              return <div key={`ctm_${key}`} color="inherit">
                { !commons.isNull(menuItem.urlLink) &&
                  <NavLink key={`nl_${key}`} to={menuItem.urlLink} activeClassName="active">
                    <Button key={`bt_${key}`} color="inherit">{menuItem.name}</Button>
                  </NavLink>
                 }
                 { commons.isNull(menuItem.urlLink) && !commons.isNull(menuItem.handleClick) &&
                    <Button key={`bt_${key}`} color="inherit" onClick={menuItem.handleClick}>
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

function mapStateToProps({ common }) {
  return {
    common
  }
}

export default withRouter(connect(mapStateToProps)(Menu));