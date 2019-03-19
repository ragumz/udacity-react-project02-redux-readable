import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CategoryItem from '../category/CategoyItem';
import * as commonActions from '../common/commonActions';
import * as commonOperations from '../common/commonOperations';
import MessageDialog from '../common/MessageDialog';
import PostEdit from '../post/PostEdit';
import { ENTITY_NAME, SORT_ORDER } from '../utils/constants';
import Home from './Home';
import Menu from './Menu';

class App extends Component {
  /**
   * @description Clear the text message of the modal dialog.
   */
  handleClearMessage = () => {
    this.props.dispatch(commonActions.hideMessage());
  };

  componentDidMount() {
    //setup default sorting
    this.props.dispatch(commonActions.sortedListData(ENTITY_NAME.CATEGORY, 'name', SORT_ORDER.ASCENDING))
    this.props.dispatch(commonActions.sortedListData(ENTITY_NAME.POST, 'voteScore', SORT_ORDER.DESCENDING))
    this.props.dispatch(commonActions.sortedListData(ENTITY_NAME.COMMENT, 'voteScore', SORT_ORDER.DESCENDING))
    //load data from backend REST web service
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
                <Route path='/post/new/' component={PostEdit} />
                <Route path='/post/edit/:id' component={PostEdit} />
                {/*<Route path='/tweet/:id' component={TweetPage} />*/}
              </div>
            )}
          </div>
          <MessageDialog
            userMessage={userMessage}
            buttons={[{ text: 'OK', handleClick: this.handleClearMessage }]}/>
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
