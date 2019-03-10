export const AUTHED_ACTIONS = Object.freeze({
  SET: 'SET_AUTHED_USER'
})

export function setAuthedUser (id) {
  return {
    type: AUTHED_ACTIONS.SET,
    id,
  }
}