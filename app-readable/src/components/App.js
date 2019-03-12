import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router/*, Route */ } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import Menu from './Menu';
import { connect } from 'react-redux';
import * as CommonActions from '../actions/common';
import MessageDialog from './utils/MessageDialog';

class App extends Component {
  /**
   * @description Clear the text message of the modal dialog.
   */
  handleClearMessage = () => {
    this.props.dispatch(CommonActions.hideMessage());
  };

  componentDidMount() {
    this.props.dispatch(CommonActions.handleInitialData());
  }

  render() {
    const { userMessage } = this.props;

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Menu />
            {this.props.loading === true ? null : (
              <div>
                {/*<Route path='/' exact component={Dashboard} />
                <Route path='/tweet/:id' component={TweetPage} />
                <Route path='/new' component={NewTweet} />*/}
              </div>
            )}
          </div>
          {userMessage && (
            <MessageDialog
              title={userMessage.title}
              message={userMessage.message}
              error={userMessage.error}
              buttons={[{ text: 'OK', handleClick: this.handleClearMessage }]}
            />
          )}
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ common }) {
  return {
    userMessage: common.userMessage
  };
}

export default connect(mapStateToProps)(App);
