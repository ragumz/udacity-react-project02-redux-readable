import React, { Component } from 'react';
import { FaTrashAlt, FaRegEdit, FaComments } from 'react-icons/fa';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

class EntityButtons extends Component {
  /**
   * @description Define props' arguments' types
   */
  static propTypes = {
    entityName: PropTypes.string.isRequired,
    handleView: PropTypes.func,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func
  };

  render() {
    const { entityName, handleView, handleEdit, handleDelete } = this.props;

    return (
      <div>
        {handleView &&
          <Button
            variant="text"
            mini={true}
            title={`${entityName}'s Comments`}
            onClick={event => handleView(event)}>
            <FaComments />
          </Button>
        }
        {handleEdit &&
          <Button
            variant="text"
            mini={true}
            title={`Edit ${entityName}`}
            onClick={event => handleEdit(event)}>
            <FaRegEdit />
          </Button>
        }
        { handleDelete &&
          <Button
            variant="text"
            mini={true}
            title={`Remove ${entityName}`}
            onClick={event => handleDelete(event)}>
            <FaTrashAlt />
          </Button>
        }
      </div>
    );
  }
}

export default EntityButtons;
