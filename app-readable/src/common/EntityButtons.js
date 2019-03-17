import React, { Component } from 'react';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import Button from '@material-ui/core/Button';

class EntityButtons extends Component {
  render() {
    return (
      <div>
        <Button variant="text" mini={true} title="Edit Post">
          <FaRegEdit />
        </Button>
        <Button variant="text" mini={true} title="Remove Post">
          <FaTrashAlt />
        </Button>
      </div>
    );
  }
}

export default EntityButtons