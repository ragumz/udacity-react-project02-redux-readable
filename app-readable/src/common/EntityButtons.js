import React, { Component } from 'react';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

class EntityButtons extends Component {
  /**
   * @description Define props' arguments' types
   */
  static propTypes = {
    entityName: PropTypes.string.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  };

  render() {
    const { entityName, handleEdit, handleDelete } = this.props;

    return (
      <div>
        <Button
          variant="text"
          mini={true}
          title={`Edit ${entityName}`}
          onClick={event => handleEdit(event)}>
          <FaRegEdit />
        </Button>
        <Button
          variant="text"
          mini={true}
          title={`Remove ${entityName}`}
          onClick={event => handleDelete(event)}>
          <FaTrashAlt />
        </Button>
      </div>
    );
  }
}

export default EntityButtons;
