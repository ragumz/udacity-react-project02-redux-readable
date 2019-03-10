import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router /*, Route*/ } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import Menu from './Menu';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/common';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Menu />
            {this.props.loading === true ? null : (
              <div>
                <span>Under Construction...</span>
                {/*<Route path='/' exact component={Dashboard} />
                <Route path='/tweet/:id' component={TweetPage} />
                <Route path='/new' component={NewTweet} />*/}
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
