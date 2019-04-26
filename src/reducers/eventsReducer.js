// listen for the following events:
// act on capture
// update user states for any of the following captured events
// transfer
  // data:
    // - from
    // - to
    // - value
    // - fee

// wrapped
  // - by
  // - value
  // - fee

// unwrapped
  // - by
  // - value
  // - fee

// approval
  // src - person it's from
  // guy - authorized sender
  // wad - authorized amount to send

// can get 3 variables by cvalling functions "wrapFee", "unwrapFee", "transferFee"
// - used to display to user related fees
import { Buttons, ButtonStates, setButtonState } from './buttonsReducer.js'
import { updateDAI, updateGDAI } from './localUserReducer.js'
import { getBalanceDAI } from './contractReducerDAI.js'
import { getBalanceGDAI } from './contractReducerGDAI.js'
// ------------------------------------
// Constants
// ------------------------------------
export const LOADING_DATA = 'LOADING_DATA'
export const EVENTS = {
  transfer: 'TRANSFER',
  wrapped: 'WRAPPED',
  unwrapped: 'UNWRAPPED',
  approval: 'APPROVAL'
}
// ------------------------------------
// Actions
// ------------------------------------
export const listenForEvents = () => {
  return (dispatch, getState) => {
    if (!getState().Web3Reducer.web3)
    return

    let deployedContract = getState().ContractReducerDAI.deployedContract;
    console.log(deployedContract)

    deployedContract.getPastEvents('allEvents', { fromBlock: 0}).then(events => console.log(events));


    deployedContract.events.Transfer({
        filter: {address: getState().Web3Reducer.localAddress}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0,
    }, (error, event) => {
      if (!error) {
        dispatch(captureEvent(EVENTS.transfer, event))

      }
    })

    deployedContract.events.Wrap({
        filter: {address: getState().Web3Reducer.localAddress}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0,
    }, (error, event) => {
      if (!error)
      dispatch(captureEvent(EVENTS.wrapped, event))
      dispatch(setButtonState(Buttons.wrapDAI, ButtonStates.default))
      dispatch(updateDAI(getState().LocalUserReducer.dai - getState().Web3Reducer.web3.utils.fromWei(event.returnValues.value.toString())))
      dispatch(getBalanceGDAI(event.returnValues.by))
      //dispatch(updateDAI(event.returnValues.value))
    })

    deployedContract.events.Unwrap({
        filter: {address: getState().Web3Reducer.localAddress}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0,
    }, (error, event) => {
      if (!error){
      dispatch(captureEvent(EVENTS.unwrapped, event))
      dispatch(setButtonState(Buttons.unwrapDAI, ButtonStates.default))
      dispatch(updateGDAI(getState().LocalUserReducer.gdai - getState().Web3Reducer.web3.utils.fromWei(event.returnValues.value.toString())))
      dispatch(getBalanceDAI(event.returnValues.by))
      }
    })

    deployedContract.events.Approval({
        //filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0,
    }, (error, event) => {
      if (!error)
      if (event.returnValues[0].toLowerCase() === getState().Web3Reducer.localAddress.toLowerCase()) {
        dispatch(setButtonState(Buttons.wrapDAI, ButtonStates.default))
        dispatch(setButtonState(Buttons.unwrapDAI, ButtonStates.default))
      }

      dispatch(captureEvent(EVENTS.approval, event))
    })
  }
}

export const captureEvent = (eventType, data) => {
  return (dispatch, getState) => {
    switch(eventType) {
      case EVENTS.transfer:
      dispatch({ type: EVENTS.transfer, payload:data })
      break;
      case EVENTS.wrapped:
      dispatch({ type: EVENTS.wrapped, payload:data })
      break;
      case EVENTS.unwrapped:
      dispatch({ type: EVENTS.unwrapped, payload:data })
      break;
      case EVENTS.approval:
      dispatch({ type: EVENTS.approval, payload:data })
      break;
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
  [EVENTS.transfer]: (state, action) => {
    return {
      ...state,
      lastTransferEvent: action.payload
    }
  },
  [EVENTS.wrapped]: (state, action) => {
    return {
      ...state,
      lastWrappedEvent: action.payload
    }
  },
  [EVENTS.unwrapped]: (state, action) => {
    return {
      ...state,
      lastUnwrappedEvent: action.payload
    }
  },
  [EVENTS.approval]: (state, action) => {
    return {
      ...state,
      lastApprovalEvent: action.payload
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { lastTransferEvent: null, lastWrappedEvent:null, lastUnwrappedEvent: null, lastApprovalEvent: null, error:null }
export default function EventsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
// listen for the following events:
// act on capture
// update user states for any of the following captured events
// transfer
  // data:
    // - from
    // - to
    // - value
    // - fee

// wrapped
  // - by
  // - value
  // - fee

// unwrapped
  // - by
  // - value
  // - fee

// approval
  // src - person it's from
  // guy - authorized sender
  // wad - authorized amount to send

// can get 3 variables by cvalling functions "wrapFee", "unwrapFee", "transferFee"
// - used to display to user related fees
