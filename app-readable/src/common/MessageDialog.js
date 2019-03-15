import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import * as common from '../utils/common';

/**
 * @description An utility class to display modal dialogs with messages and buttons.
 */
class MessageDialog extends Component {
  /**
   * @description Define props' arguments' types
   */
  static propTypes = {
    userMessage: PropTypes.shape({
      title: PropTypes.string.isRequired,
      message: PropTypes.string,
      error: PropTypes.any
    }),
    buttons: PropTypes.array,
  };

  /**
   * @description Initializes component states
   */
  state = {
    open: false
  };

  /**
   * @description Set the dialog to show
   */
  handleOpen = () => {
    this.setState({ open: true });
  };

  /**
   *  @description Set the dialog to hide
   */
  handleClose = () => {
    this.setState({ open: false });
  };

  /**
   * @description Callback function to handle custom buttons' clicks.
   */
  handleCustom = (handleClick) => {
    if (handleClick)
      handleClick();
    this.handleClose();
  };

  /**
   * @description React callback invoked when new props are to be received
   *
   * @param {object} nextProps The new props that will replace this.props
   */
  componentWillReceiveProps(nextProps) {
    //shows the dialog if there is any message text.
    if (!common.isEmpty(nextProps.userMessage)
        && nextProps.userMessage !== this.props.userMessage) {
      this.handleOpen();
    }
  };

  /**
   * @description Creates the component UI
   */
  render() {
    if (common.isNull(this.props.userMessage)) {
      return <div></div>;
    }

    const { title, message, error, buttons } = this.props.userMessage

    if (this.state.open && error) {
      console.error(message, error);
    }

    return (
      <div>
        <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            scroll="paper"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {message}
              </DialogContentText>
              { error &&
                <Typography id="alert-dialog-description-error" className="dialog-error-text" gutterBottom>
                  {error.stack}
                </Typography>
              }
            </DialogContent>
            <DialogActions>
              {//if no custom array buttons are received, show the default OK one
                (!buttons || buttons.length === 0) && (
                <Button
                  autoFocus
                  onClick={this.handleClose}
                  color="primary">
                  OK
                </Button>
              )}
              {//if custom array buttons are received, mount all of them
                buttons &&
                buttons.length > 0 &&
                buttons.map(button => {
                  return (
                    <Button
                      key={button.text}
                      onClick={this.handleCustom.bind(this, button.handleClick)}
                      color={button.color ? button.color : "primary"}
                    >
                      {button.text}
                    </Button>
                  );
                })}
            </DialogActions>
          </Dialog>
      </div>
    );
  }
}

export default MessageDialog;