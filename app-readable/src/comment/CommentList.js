import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as commons from '../utils/commons';
import CommentEdit from './CommentEdit';
import CommentItem from './CommentItem';
import SortListMenu from '../common/SortListMenu';
import { ENTITY_NAME } from '../utils/constants';
import {
  getSortedEntityId,
  sortEntityMap,
} from '../common/commonOperations';
import {
  addContextMenuItem,
  deleteContextMenuItem
} from '../common/commonActions';
import { handleLoadPostComments } from '../post/postOperations';
import Fab from '@material-ui/core/Fab';
import IconAdd from '@material-ui/icons/Add';

/**
 * @description Object with global Comment sort menu options.
 */
export const COMMENT_SORT_MENU = [
  { title: 'Author', fieldName: 'author' },
  { title: 'Creation Time', fieldName: 'timestamp' },
  { title: 'Vote Score', fieldName: 'voteScore' }
];

/**
 * @description React component to enlist all Comment's from one active Post.
 */
class CommentList extends Component {
  /**
   * @description Define props' arguments' types
   */
  static propTypes = {
    commentsFilter: PropTypes.object,
    parentPost: PropTypes.object,
  };

  state = {
    /** @description Control flag to manage inline Comment creation */
    isCreating: false,
  };

  /**
   * @description Component handle function to manage list inline comment Creation
   */
  handleNewComment = (event) => {
    event.preventDefault();
    this.setState({isCreating: true});
  }

  /**
   * @description Component handle function to manage list inline comment Editing
   */
  handleFinishEdit = () => {
    this.setState({isCreating: false});
  }

  /**
   * @description Lifecycle function to initialize component inner state controls
   */
  componentDidMount() {
    const { parentPost, comments, dispatch } = this.props;
    dispatch(addContextMenuItem({id: 'addComments', name: 'New Comment', handleClick: this.handleNewComment, iconIndex: 'add'}));
    if ((!commons.isNull(comments)
          && comments.lenght > 0)
          || commons.isNull(parentPost)
          || commons.isEmpty(parentPost.id)) {
      return;
    }
    dispatch(handleLoadPostComments(parentPost.id));
  }

  /**
   * @description Lifecycle function to finalize component inner state controls
   */
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(deleteContextMenuItem('addComments'));
  }

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  render() {
    const { isCreating }  = this.state;
    const { parentPost, comments, sortingSetup } = this.props;
    //execute sort method over Comment collection from menu user sorting selection
    let sortedComments = sortEntityMap(comments, sortingSetup)
                          .filter(key => comments[key].deleted !== true
                                              && comments[key].parentDeleted !== true
                                              && parentPost.deleted !== true);

    return (
      <div>
        <div className="center">
          <h3 className="side-by-side">The Post's Comments</h3>
          <SortListMenu entityName={ENTITY_NAME.COMMENT} sortMenuOptions={COMMENT_SORT_MENU} />
          <Fab color="primary" title="Add New Comment" size="small" className="create-fab"
            onClick={this.handleNewComment}>
            <IconAdd />
          </Fab>
        </div>

        <ul className="dashboard-list">
          { isCreating &&
            <li key={"newComment"}>
              <CommentEdit parentId={parentPost.id} handleFinishEdit={this.handleFinishEdit} />
            </li>
          }
          {sortedComments.map(id => (
            <li key={id}>
              <CommentItem id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps({ comments, common }, { commentsFilter, parentPost }) {
  return {
    parentPost,
    comments: commentsFilter ? commentsFilter : comments,
    sortingSetup: common[getSortedEntityId(ENTITY_NAME.COMMENT)]
  };
}

export default withRouter(connect(mapStateToProps)(CommentList));