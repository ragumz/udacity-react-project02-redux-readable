import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowUpIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownIcon from '@material-ui/icons/ArrowDownward';
import PropTypes from "prop-types";
import { getSortedEntityId } from '../common/commonOperations'
import { SORT_ORDER } from '../utils/constants'
import { connect } from 'react-redux'
import * as common from '../utils/common'
import ListItemText from "@material-ui/core/ListItemText";
import { sortedListData } from '../common/commonActions'

class SortListMenu extends Component {

  /**
  * @description Define props' arguments' types
  */
  static propTypes = {
    entityName: PropTypes.string.isRequired,
    sortMenuOptions: PropTypes.array.isRequired,
  };

  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (event, fieldName, order) => {
    console.log(fieldName, order);
    this.props.dispatch(sortedListData(this.props.entityName, fieldName, order))
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    let { sortMenuOptions, sortingSetup } = this.props
    const open = Boolean(anchorEl);

    if (common.isNull(sortingSetup)) {
      sortingSetup = {fieldName: sortMenuOptions[0].fieldName, order: sortMenuOptions[0].order};
    }

    return (
      <div className="side-by-side">
        <IconButton
          aria-label="Sort"
          title="Sort Field"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: 280,
            },
          }}
        >
          {sortMenuOptions.map(option => (
            <MenuItem key={option.fieldName} selected={option.fieldName === sortingSetup.fieldName}>
              <IconButton title="Descending" onClick={(event) => this.handleClose(event, option.fieldName, SORT_ORDER.DESCENDING)}>
                <ArrowUpIcon />
              </IconButton>
              <IconButton title="Ascending" onClick={(event) => this.handleClose(event, option.fieldName, SORT_ORDER.ASCENDING)}>
                  <ArrowDownIcon />
              </IconButton>
              <ListItemText>
                {option.title}
              </ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

function mapStateToProps ({ common },{ entityName, sortMenuOptions }) {
  return {
    entityName,
    sortMenuOptions,
    sortingSetup: common[getSortedEntityId(entityName)],
  }
}

export default connect(mapStateToProps)(SortListMenu)