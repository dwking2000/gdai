
// ------------------------------------
// Constants
// ------------------------------------
export const LOADING_DATA = 'LOADING_DATA'
export const UPDATE_DAI = 'UPDATE_DAI'
export const UPDATE_GDAI = 'UPDATE_GDAI'
export const UPDATE_FEES = 'UPDATE_FEES'
const TestUser = {address:'0xabc123def456hij789', daiSpentOnOffsets: 12, dai: null, gdai: null}
// ------------------------------------
// Actions
// ------------------------------------
export const getFeesByAddress = (address) => {
  return (dispatch, getState) => {
    let leaderboard = getState().LeaderboardReducer.rankedUsers;
    leaderboard.forEach((item, index) => {
      if (item.address.toLowerCase() == address) {
        dispatch(updateFees(item.fees));
      }
    })
  }
}

export function updateFees (fees) {
  return {
    type: UPDATE_FEES,
    payload: {
      fees
    }
  }
}

export function setLoadingState (state) {
  return {
    type: LOADING_DATA,
    payload: {
      state
    }
  }
}

export function updateDAI (dai) {
  return {
    type: UPDATE_DAI,
    payload: {
      dai
    }
  }
}

export function updateGDAI (gdai) {
  return {
    type: UPDATE_GDAI,
    payload: {
      gdai
    }
  }
}

export const actions = {
  setLoadingState,
  updateDAI,
  updateGDAI,
  updateFees
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOADING_DATA]: (state, action) => {
    return action.payload
  },
  [UPDATE_DAI]: (state, action) => {
    return  {
      ...state,
      dai: action.payload.dai
    }
  },
  [UPDATE_GDAI]: (state, action) => {
    return  {
      ...state,
      gdai: action.payload.gdai
    }
  },
  [UPDATE_FEES]: (state, action) => {
    return  {
      ...state,
      fees: action.payload.fees
    }
  },
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { loadingData: false, error:null, address:'0xabc123def456hij789', fees: {_hex:0x63}, dai: null, gdai: null }
export default function LocalUserReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
