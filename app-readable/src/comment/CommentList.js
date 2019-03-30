import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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

export const COMMENT_SORT_MENU = [
  { title: 'Author', fieldName: 'author' },
  { title: 'Creation Time', fieldName: 'timestamp' },
  { title: 'Vote Score', fieldName: 'voteScore' }
];

class CommentList extends Component {

  state = {
    isCreating: false,
  }

  handleNewComment = (event) => {
    event.preventDefault();
    /*const { parentPost, history } = this.props;
    history.push(`/comment/new/${parentPost.id}`)*/
    this.setState({isCreating: true});
  }

  handleFinishEdit = () => {
    this.setState({isCreating: false});
  }

  componentDidMount() {
    const { parentPost, comments, dispatch } = this.props;
    dispatch(addContextMenuItem({id: 'addComments', name: 'New Comment', handleClick: this.handleNewComment}));
    if ((!commons.isNull(comments)
          && comments.lenght > 0)
          || commons.isNull(parentPost)
          || commons.isEmpty(parentPost.id)) {
      return;
    }
    dispatch(handleLoadPostComments(parentPost.id));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(deleteContextMenuItem('addComments'));
  }

  render() {
    const { isCreating }  = this.state;
    const { parentPost, comments, sortingSetup } = this.props;

    let sortedComments = sortEntityMap(comments, sortingSetup)
                          .filter(key => comments[key].deleted !== true
                                              && comments[key].parentDeleted !== true
                                              && parentPost.deleted !== true);

    return (
      <div>
        <div className="center">
          <h3 className="side-by-side">The Post's Comments</h3>
          <SortListMenu entityName={ENTITY_NAME.COMMENT} sortMenuOptions={COMMENT_SORT_MENU} />
          <Fab color="primary" aria-label="Add New Comment" size="small" placeholder="Add New Comment" className="create-fab"
            onClick={this.handleNewComment}>
            <IconAdd placeholder="Add New Comment"/>
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

function mapStateToProps({ comments, common }, { commentsFilter, parentPost }) {
  return {
    parentPost,
    comments: commentsFilter ? commentsFilter : comments,
    sortingSetup: common[getSortedEntityId(ENTITY_NAME.COMMENT)]
  };
}

export default withRouter(connect(mapStateToProps)(CommentList));