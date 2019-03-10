import { AUTHED_ACTIONS } from '../actions/authedUser';

export default function authedUser(state = null, action) {
  switch (action.type) {
    case AUTHED_ACTIONS.SET:
      return action.id;
    default:
      return state;
  }
}
