import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as commons from '../utils/common';
import CommentItem from './CommentItem';
import SortListMenu from '../common/SortListMenu';
import { ENTITY_NAME } from '../utils/constants';
import { getSortedEntityId, sortEntityMap } from '../common/commonOperations';
import { handleLoadPostComments } from '../post/postOperations';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export const COMMENT_SORT_MENU = [
  { title: 'Author', fieldName: 'author' },
  { title: 'Creation Time', fieldName: 'timestamp' },
  { title: 'Vote Score', fieldName: 'voteScore' }
];

class CommentList extends Component {

  componentDidMount() {
    const { parentPost, comments, dispatch } = this.props;
    if ((!commons.isNull(comments)
          && comments.lenght > 0)
          || commons.isNull(parentPost)
          || commons.isEmpty(parentPost.id)) {
      return;
    }
    dispatch(handleLoadPostComments(parentPost.id));
  }

  render() {
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
          <Fab color="primary" aria-label="Add New Comment" size="small" placeholder="Add New Comment" className="create-fab">
            <AddIcon placeholder="Add New Comment"/>
          </Fab>
        </div>

        <ul className="dashboard-list">
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

export default connect(mapStateToProps)(CommentList);