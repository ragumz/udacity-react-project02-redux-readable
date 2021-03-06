import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { getSortedEntityId } from '../common/commonOperations';
import { SORT_ORDER } from '../utils/constants';
import { connect } from 'react-redux';
import * as common from '../utils/commons';
import ListItemText from '@material-ui/core/ListItemText';
import { sortedListData } from '../common/commonActions';
import { FaSortAlphaUp, FaSortAlphaDown } from 'react-icons/fa';

/**
 * @description Vote score React Component to simplify user selection of list sorting over an entity fiel.
 */
class SortListMenu extends Component {
  /**
   * @description Define props' arguments' types
   */
  static propTypes = {
    entityName: PropTypes.string.isRequired,
    sortMenuOptions: PropTypes.array.isRequired
  };

  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (event, fieldName, order) => {
    const { sortingSetup } = this.props;
    if (!common.isEmpty(order)
      && (common.isNull(sortingSetup)
      || fieldName !== sortingSetup.fieldName
      || order !== sortingSetup.order)) {
      this.props.dispatch(
        sortedListData(this.props.entityName, fieldName, order)
      );
    }
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    let { sortMenuOptions, sortingSetup } = this.props;
    const open = Boolean(anchorEl);

    if (common.isNull(sortingSetup)) {
      sortingSetup = {
        fieldName: sortMenuOptions[0].fieldName,
        order: SORT_ORDER.ASCENDING
      };
    }

    return (
      <div className="side-by-side">
        <IconButton
          aria-label="Sort"
          title="Sort By"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: 65 * 4.5,
              width: 280
            }
          }}>
          {sortMenuOptions.map(option => (
            <MenuItem
              key={option.fieldName}
              selected={option.fieldName === sortingSetup.fieldName}>
              <IconButton
                title={SORT_ORDER.ASCENDING}
                onClick={event =>
                  this.handleClose(
                    event,
                    option.fieldName,
                    SORT_ORDER.ASCENDING
                  )
                }>
                <FaSortAlphaDown
                  className={
                    sortingSetup.order === SORT_ORDER.ASCENDING &&
                    option.fieldName === sortingSetup.fieldName
                      ? 'sort-icon'
                      : 'sort-icon-unselected'
                  }/>
              </IconButton>
              <IconButton
                title={SORT_ORDER.DESCENDING}
                onClick={event =>
                  this.handleClose(
                    event,
                    option.fieldName,
                    SORT_ORDER.DESCENDING
                  )
                }>
                <FaSortAlphaUp
                  className={
                    sortingSetup.order === SORT_ORDER.DESCENDING &&
                    option.fieldName === sortingSetup.fieldName
                      ? 'sort-icon'
                      : 'sort-icon-unselected'
                  }/>
              </IconButton>
              <ListItemText>{option.title}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

function mapStateToProps({ common }, { entityName, sortMenuOptions }) {
  return {
    entityName,
    sortMenuOptions,
    sortingSetup: common[getSortedEntityId(entityName)]
  };
}

export default connect(mapStateToProps)(SortListMenu);
