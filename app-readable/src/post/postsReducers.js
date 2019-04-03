import { POST_ACTIONS } from './postActions';
import { VOTE_OPTIONS } from '../utils/constants';

/**
 * @description Post's reducer implementation to manage all Post thunk actions.
 * @param {Object} state Current reducer state object
 * @param {Object} action Current reducer thunk action object
 */
export default function posts(state = {}, action) {
  switch (action.type) {
    //add all backend server loaded Posts into state
    case POST_ACTIONS.RECEIVE:
      return {
        ...state,
        ...action.posts
      };

    //update a Post vote score action into state
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

    //add a new Post object into state
    case POST_ACTIONS.NEW:
      return {
        ...state,
        [action.post.id]: {
          ...action.post
        }
      };

    //update an existing Post object into state
    case POST_ACTIONS.UPDATE:
      return {
        ...state,
        [action.post.id]: {
          ...action.post
        }
      };

    //delete an existing Post object from state through delete flag field
    case POST_ACTIONS.DELETE:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          deleted: true
        }
      };

    //update a Post's commentCount field when one of its Comments is deleted
    case POST_ACTIONS.DELETE_COMMENT:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          commentCount: state[action.postId].commentCount > 0 ? state[action.postId].commentCount-1 : 0
        }
      };

    //update a Post's commentCount field when one new Comment is created
    case POST_ACTIONS.ADD_COMMENT:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          commentCount: state[action.postId].commentCount+1
        }
      };

    default:
      return state;
  }
}
