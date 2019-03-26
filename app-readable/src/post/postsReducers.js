import { POST_ACTIONS } from './postActions';
import { VOTE_OPTIONS } from '../utils/constants';

export default function posts(state = {}, action) {
  switch (action.type) {
    case POST_ACTIONS.RECEIVE:
      return {
        ...state,
        ...action.posts
      };

    case POST_ACTIONS.VOTE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.option === VOTE_OPTIONS.UP
            ? state[action.id].voteScore+1
            : state[action.id].voteScore-1
          }
      };

    case POST_ACTIONS.NEW:
      return {
        ...state,
        [action.post.id]: {
          ...action.post
        }
      };

    case POST_ACTIONS.UPDATE:
      return {
        ...state,
        [action.post.id]: {
          ...action.post
        }
      };


    case POST_ACTIONS.DELETE:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          deleted: true
        }
      };

    case POST_ACTIONS.DELETE_COMMENT:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          commentCount: state[action.postId].commentCount > 0 ? state[action.postId].commentCount-1 : 0
        }
      };

    default:
      return state;
  }
}
