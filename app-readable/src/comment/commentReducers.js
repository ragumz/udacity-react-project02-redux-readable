import { COMMENT_ACTIONS } from './commentActions';
import { VOTE_OPTIONS } from '../utils/constants';

export default function comments(state = {}, action) {
  switch (action.type) {
    case COMMENT_ACTIONS.RECEIVE:
      return {
        ...state,
        ...action.comments
      };

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

    case COMMENT_ACTIONS.DELETE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deleted: true
        }
      }

    case COMMENT_ACTIONS.DELETED_PARENT:
      let comments = {...state};
      Object.values(comments)
              .filter(comment => comment.parentId === action.parentId)
              .forEach(comment => comment.parentDeleted = true);
      return comments;

    case COMMENT_ACTIONS.NEW:
      return {
        ...state,
        [action.comment.id]: {
          ...action.comment
        } 
      };

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
