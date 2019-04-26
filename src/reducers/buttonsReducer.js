
// ------------------------------------
// Constants
// ------------------------------------
export const SET_BUTTON_STATE = 'SET_BUTTON_STATE'
export const INPUT_VALUE_CHANGE = 'INPUT_VALUE_CHANGE'
export const Buttons = {
  wrapDAI: 'wrapDAI',
  unwrapDAI: 'unwrapDAI'
}
export const ButtonStates = {
  default: 0,
  waiting: 1
}
// ------------------------------------
// Actions
// ------------------------------------
export function setButtonState (button, newState) {
  switch(button) {
    case Buttons.wrapDAI:
    return {
      type: SET_BUTTON_STATE,
      buttonType: button,
      payload: {
        wrapDAI: newState
      }
    }
    case Buttons.unwrapDAI:
    return {
      type: SET_BUTTON_STATE,
      buttonType: button,
      payload: {
        unwrapDAI: newState
      },
    }
  }
}

export function handleInputValueChange ( button, newVal ) {
  return {
    type: INPUT_VALUE_CHANGE,
    payload: {
      uwnrapDAIValue: newVal
    }
  }
}

export const actions = {
  setButtonState,
  handleInputValueChange
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_BUTTON_STATE]: (state, action) => {
    switch(action.buttonType) {
      case Buttons.wrapDAI:
      return {
        ...state,
      wrapDAI : action.payload.wrapDAI
      }
      case Buttons.unwrapDAI:
      return {
        ...state,
      unwrapDAI : action.payload.unwrapDAI
      }
    }

  },
  [INPUT_VALUE_CHANGE]: (state, action) => {
    switch(action.buttonType) {
      case Buttons.wrapDAI:
        return {
          ...state,
          wrapDAIValue: action.payload.wrapDAIValue
        }
      case Buttons.unwrapDAI:
        return {
          ...state,
          uwnrapDAIValue: action.payload.unwrapDAIValue
        }
    }

  }
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { wrapDAI: ButtonStates.default, wrapDAIValue: null, unwrapDAI: ButtonStates.default, wrapDAIValue: null }
export default function ButtonsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
