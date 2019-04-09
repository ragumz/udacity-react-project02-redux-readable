import React from 'react';
import PropTypes from 'prop-types';
import * as commons from '../utils/commons';
import { FaTrashAlt, FaRegEdit, FaComments } from 'react-icons/fa';
import Button from '@material-ui/core/Button';

/**
 * @description React component to standardize Post and Comment common action buttons
 */
const EntityButtons = ({ entityName, handleView, handleEdit, handleDelete, maxWidth }) => {

  /**
   * @description Calculate the With of the buttons parent div element
   */
  const calcWidth = () => {
    let width = '200px';
    if (!commons.isEmpty(maxWidth)) {
      width = maxWidth;
    }
    return width.concat(' !important');
  }

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  return (
    <div style={{width: calcWidth(), display: 'inline'}}>
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
      {handleDelete &&
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

/**
 * @description Define props' arguments' types
 */
EntityButtons.propTypes = {
  entityName: PropTypes.string.isRequired,
  handleView: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  maxWidth: PropTypes.string,
};

export default EntityButtons;
