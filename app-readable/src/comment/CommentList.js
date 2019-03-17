import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentItem from './CommentItem';
import SortListMenu from '../common/SortListMenu';
import { ENTITY_NAME } from '../utils/constants';
import { getSortedEntityId, sortEntityMap } from '../common/commonOperations';

export const COMMENT_SORT_MENU = [
  { title: 'Author', fieldName: 'author' },
  { title: 'Creation Time', fieldName: 'timestamp' },
  { title: 'Vote Score', fieldName: 'voteScore' }
];

class CommentList extends Component {
  render() {
    const { posts: comments, sortingSetup } = this.props;

    let sortedComments = sortEntityMap(comments, sortingSetup);

    return (
      <div>
        <div className="center">
          <h3 className="side-by-side">COMMENTS</h3>
          <SortListMenu entityName={ENTITY_NAME.COMMENT} sortMenuOptions={COMMENT_SORT_MENU} />
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

function mapStateToProps({ comments, common }, { commentsFilter }) {
  return {
    comments: commentsFilter ? commentsFilter : comments,
    sortingSetup: common[getSortedEntityId(ENTITY_NAME.COMMENT)]
  };
}

export default connect(mapStateToProps)(CommentList);
