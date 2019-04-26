// ------------------------------------
// Constants
// ------------------------------------
export const LOADING_DATA = 'LOADING_DATA'
export const UPDATE_LEADERBOARD = 'UPDATE_LEADERBOARD'

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

export function updateLeaderboard (rankedUsers) {
  return {
    type: UPDATE_LEADERBOARD,
    payload: {
      rankedUsers
    }
  }
}

export const actions = {
  setLoadingState,
  updateLeaderboard
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOADING_DATA]: (state, action) => {
    return action.payload
  },
  [UPDATE_LEADERBOARD]: (state, action) => {
    return action.payload
  },
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { rankedUsers: [], loadingData: false, error:null }
export default function LeaderboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
