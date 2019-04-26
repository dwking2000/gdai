
// ------------------------------------
// Constants
// ------------------------------------
export const LOADING_DATA = 'LOADING_DATA'

// ------------------------------------
// Actions
// ------------------------------------
export function setLoadingState (state) {
  return {
    type: LOADING_DATA,
    payload: {
      state
    }
  }
}

export const actions = {
  setLoadingState,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOADING_DATA]: (state, action) => {
    return action.payload
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { users: [], localUser:null, viewingUser:null, loadingData: false, error:null }
export default function UsersReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
