import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as commons from '../utils/common';

class CommentEdit extends Component {

  render() {
    return (
      <div></div>
    )
  } 

}

function mapStateToProps({ posts, comments }, { match, id, comment, post, readOnly=false }) {
  if (!commons.isEmpty(match.params.id)) {
    id = match.params.id;
  }
  if (!commons.isEmpty(id) && commons.isNull(comment)) {
    //test to prevent refreshing on this page without loading app content
    if (!commons.isEmpty(comment) && comment.hasOwnProperty(id)) {
      //freezing the object to avoid its change
      comment = Object.freeze(comments[id]);
    }
  }
  return {
    readOnly,
    comment: comment ? comment : null,
    post,
  };
}

export default withRouter(connect(mapStateToProps)(CommentEdit));