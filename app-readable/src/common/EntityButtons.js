import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaTrashAlt, FaRegEdit, FaComments } from 'react-icons/fa';
import Button from '@material-ui/core/Button';

/**
 * @description React component to standardize Post and Comment common action buttons
 */
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

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  render() {
    const { entityName, handleView, handleEdit, handleDelete } = this.props;

    return (
      <div style={{width: '200px'}}>
        {handleView &&
          <Button
            variant="text"
            mini={false}
            title={`View ${entityName}`}
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
            title={`Delete ${entityName}`}
            onClick={event => handleDelete(event)}>
            <FaTrashAlt />
          </Button>
        }
      </div>
    );
  }
}

export default EntityButtons;
