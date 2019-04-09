import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch,  Route } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import * as commonActions from '../common/commonActions';
import * as commonOperations from '../common/commonOperations';
import NoRouteFound from '../common/NoRouteFound';
import CategoryItem from '../category/CategoyItem';
import MessageDialog from '../common/MessageDialog';
import PostEdit from '../post/PostEdit';
import { ENTITY_NAME, SORT_ORDER } from '../utils/constants';
import Home from './Home';
import Menu from './Menu';
import AppBar from '@material-ui/core/AppBar';

/**
 * @description Main web application React components and routes setup.
 */
class App extends Component {
  /**
   * @description Componente handle function to clear the text message of the modal dialog.
   */
  handleClearMessage = () => {
    this.props.dispatch(commonActions.hideMessage());
  };

  /**
   * @description Lifecycle function to initialize application state
   */
  componentDidMount() {
    //setup default sorting behavior
    this.props.dispatch(commonActions.sortedListData(ENTITY_NAME.CATEGORY, 'name', SORT_ORDER.ASCENDING))
    this.props.dispatch(commonActions.sortedListData(ENTITY_NAME.POST, 'voteScore', SORT_ORDER.DESCENDING))
    this.props.dispatch(commonActions.sortedListData(ENTITY_NAME.COMMENT, 'voteScore', SORT_ORDER.DESCENDING))
    //load data from backend REST web service
    this.props.dispatch(commonOperations.handleInitialData());
  }

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  render() {
    const { userMessage } = this.props;

    return (
      <Router>
        <Fragment>
          <AppBar position="sticky">
            <Menu />
          </AppBar>
          <LoadingBar />
          <div className="container">
            {this.props.loading === true ? null : (
              <div>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path='/:category' exact component={CategoryItem} />
                  <Route path='/:category/:post_id' exact component={PostEdit} />
                  <Route component={NoRouteFound} />
                </Switch>
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

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps({ common }) {
  return {
    //global redux user message
    userMessage: common.userMessage
  };
}

export default connect(mapStateToProps)(App);
