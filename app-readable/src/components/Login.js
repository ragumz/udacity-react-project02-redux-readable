import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { setAuthedUser } from '../actions/authedUser'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';


/**
 * @description User identification page
 */
class Login extends Component {

  state = {
    /**
     * @description Text to input the user identification
     */
    userId: '',
    /**
     * @description Login button availability
     */
    flagBtnDisable: true
  };

  /**
   * @description Handle the user identification text from DOM input
   *
   * @param {object} event The event object of the DOM UI component
   */
  handleInput = event => {
    //get the text value from input
    const userId = event.target.value;
    this.setState({
      userId,
      flagBtnDisable: userId.trim() === ''
    });
  };

  /**
   * @description Handle the login button action from DOM input
   *
   * @param {object} event The event object of the DOM UI component
   */
  handleLogin = event => {
    event.preventDefault();
    this.props.dispatch(setAuthedUser(this.state.userId));
    this.props.history.push(`/`);
  };

  /**
   * @description React callback invoked when new props are to be received
   *
   * @param {object} nextProps The new props that will replace this.props
   */
  componentWillReceiveProps(nextProps) {
    //set last authenticated user identification into input state
    this.setState({userId: nextProps.authedUser});
  }

  render() {
    const { userId, flagBtnDisable } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            autoFocus
            id="userId"
            key="userId"
            label="Type your username"
            value={userId}
            onChange={event => this.handleInput(event)}
          />
          <Button
            onClick={this.handleLogin}
            color="primary"
            disabled={flagBtnDisable}
          >
            Change User
          </Button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
