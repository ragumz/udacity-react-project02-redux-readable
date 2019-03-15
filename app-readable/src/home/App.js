import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import Menu from './Menu';
import Home from './Home';
import CategoryItem from '../category/CategoyItem';
import { connect } from 'react-redux';
import * as commonActions from '../common/commonActions';
import * as commonOperations from '../common/commonOperations';
import MessageDialog from '../common/MessageDialog';

class App extends Component {
  /**
   * @description Clear the text message of the modal dialog.
   */
  handleClearMessage = () => {
    this.props.dispatch(commonActions.hideMessage());
  };

  componentDidMount() {
    this.props.dispatch(commonOperations.handleInitialData());
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
                <Route path="/" exact component={Home} />
                <Route path='/category/:id' component={CategoryItem} />
                {/*<Route path='/tweet/:id' component={TweetPage} />
                <Route path='/new' component={NewTweet} />*/}
              </div>
            )}
          </div>
          <MessageDialog
            userMessage={userMessage}
            buttons={[{ text: 'OK', handleClick: this.handleClearMessage }]}
          />
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
