import { COMMENT_ACTIONS } from './commentActions';
import { VOTE_OPTIONS } from '../utils/constants';

export default function comments(state = {}, action) {
  switch (action.type) {
    //add all backend server loaded Comments into state
    case COMMENT_ACTIONS.RECEIVE:
      return {
        ...state,
        ...action.comments
      };

    //update a Comment vote score action into state
    case COMMENT_ACTIONS.VOTE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.option === VOTE_OPTIONS.UP
            ? state[action.id].voteScore+1
            : state[action.id].voteScore-1
          }
      };

    //delete an existing Comment object from state through delete flag field
    case COMMENT_ACTIONS.DELETE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deleted: true
        }
      }

    //mark an existing Comment object from state when its parent Post is deleted
    case COMMENT_ACTIONS.DELETED_PARENT:
      let comments = {...state};
      Object.keys(comments)
              .filter(id => comments[id].parentId === action.parentId)
              .forEach(id => comments[id].parentDeleted = true);
      return comments;

    //add a new Comment object into state
    case COMMENT_ACTIONS.NEW:
      return {
        ...state,
        [action.comment.id]: {
          ...action.comment
        }
      };

    //update an existing Comment object into state
    case COMMENT_ACTIONS.UPDATE:
      return {
        ...state,
        [action.comment.id]: {
          ...state[action.comment.id],
          ...action.comment
        }
      };

    default:
      return state;
  }
}
