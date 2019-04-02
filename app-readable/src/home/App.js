import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import * as commonActions from '../common/commonActions';
import * as commonOperations from '../common/commonOperations';
import CategoryItem from '../category/CategoyItem';
import MessageDialog from '../common/MessageDialog';
import PostEdit from '../post/PostEdit';
import CommentEdit from '../comment/CommentEdit';
import { ENTITY_NAME, SORT_ORDER } from '../utils/constants';
import Home from './Home';
import Menu from './Menu';
import AppBar from '@material-ui/core/AppBar';

/**
 * @description Main web application React components and routes setup.
 */
class App extends Component {
  /**
   * @description Clear the text message of the modal dialog.
   */
  handleClearMessage = () => {
    this.props.dispatch(commonActions.hideMessage());
  };

  componentDidMount() {
    //setup default sorting behavior
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
          <AppBar position="static">
            <Menu />
          </AppBar>
          <LoadingBar />
          <div className="container">
            {this.props.loading === true ? null : (
              <div>
                <Route path="/" exact component={Home} />
                <Route path='/category/:id' component={CategoryItem} />
                <Route path='/post/new/:category' component={PostEdit} />
                <Route path='/post/edit/:id/:fixedCategory' component={PostEdit} />
                <Route path='/post/view/:id/:fixedCategory' component={PostEdit} />
                <Route path='/comment/new/:parentId' component={CommentEdit} />
                <Route path='/comment/edit/:id' component={CommentEdit} />
              </div>
            )}
          </div>
          {/* Centralized Web Application Messages from SHOW_MESSAGE and HIDE_MESSAGE of COMMON_ACTIONS */}
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
