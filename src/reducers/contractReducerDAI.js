// ------------------------------------
// Imports
// ------------------------------------
import { contractAddress, contractABI } from '../contractInfoDAI.js'
import { contractAddress as guy }  from '../contractInfoGDAI.js'
import { Buttons, ButtonStates, setButtonState } from './buttonsReducer.js'
import { updateDAI } from './localUserReducer.js'
import * as Utils from 'web3-utils'
import bignumber from 'bignumber.js'
// ------------------------------------
// Constants
// ------------------------------------
export const CONTRACT_LOADING = 'CONTRACT_LOADING'
export const CONTRACT_LOADED = 'CONTRACT_LOADED'
export const CONTRACT_ERRORED = 'CONTRACT_ERRORED'


// ------------------------------------
// Actions
// ------------------------------------
export const loadContractDAI = () => {
  return (dispatch, getState) => {
    dispatch({type: CONTRACT_LOADING, payload: {loading: true} });
    if (!getState().Web3Reducer.web3)
    return dispatch({type: CONTRACT_ERRORED, payload: {error: 'could not find web3'}})
    let deployedContract = getState().Web3Reducer.web3.eth.Contract(contractABI, '0xC4375B7De8af5a38a93548eb8453a498222C4fF2');
    (!deployedContract)
    ? dispatch({type: CONTRACT_ERRORED, payload: {error: 'could not load contracts'}})
    : dispatch({type: CONTRACT_LOADED, payload: {deployedContract: deployedContract, loaded: true, loading: false}})
  }
}

export const wrapDAIContractCall = (amount) => {
  return (dispatch, getState) => {

    // guy = contractInfo.gdai address
    // wad = amount allowed
    let amountInWei = getState().Web3Reducer.web3.utils.toWei(amount)
    dispatch(setButtonState(Buttons.wrapDAI, ButtonStates.waiting))
    getState().Web3Reducer.web3.eth.Contract(contractABI, '0xC4375B7De8af5a38a93548eb8453a498222C4fF2').methods.approve(guy, amountInWei).send({from:getState().Web3Reducer.localAddress}, (error, result) => {
      if (!error) {
        getState().Web3Reducer.web3.eth.Contract(contractABI, '0xC4375B7De8af5a38a93548eb8453a498222C4fF2').once('Approval', {
            filter: {src:getState().Web3Reducer.localAddress}, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0
        }, (error, event) => {
          if (!error) {
            getState().ContractReducerGDAI.deployedContract.methods.wrap(amountInWei).send({from:getState().Web3Reducer.localAddress}, (error, result) => {
              if (!error) {
                // TODO: - dispatch action to update local user dai balance
                dispatch(setButtonState(Buttons.wrapDAI, ButtonStates.default))
              } else {
                // dispatch to reset button state
                dispatch(setButtonState(Buttons.wrapDAI, ButtonStates.default))
              }
            })
          }
         });

      }
    })
  }
}

export const unwrapDAIContractCall = (amount) => {
  return (dispatch, getState) => {
    let amountInWei = getState().Web3Reducer.web3.utils.toWei(amount)

    dispatch(setButtonState(Buttons.unwrapDAI, ButtonStates.waiting))
    console.log(getState().ContractReducerGDAI)
    getState().ContractReducerGDAI.deployedContract.methods.unwrap(amountInWei).send({from:getState().Web3Reducer.localAddress}, (error, result) => {
      if (!error) {
        console.log(result);
        dispatch(setButtonState(Buttons.unwrapDAI, ButtonStates.default))
      } else {
        // dispatch to reset button state
        dispatch(setButtonState(Buttons.unwrapDAI, ButtonStates.default))
      }

    })
  }
}

export const getBalanceDAI = (address) => {
  let rtn = null;
  return (dispatch, getState) => {
    getState().Web3Reducer.web3.eth.Contract(contractABI, '0xC4375B7De8af5a38a93548eb8453a498222C4fF2').methods.balanceOf(address).call({from:getState().Web3Reducer.localAddress}, (error, result) => {
      if (!error) {
        console.log(getState().Web3Reducer.web3.utils.fromWei(result.toString()))
        dispatch(updateDAI(getState().Web3Reducer.web3.utils.fromWei(result.toString())))
      } else {
      console.log(error)
      }
    })
  }
}

export function contractLoading ({ loading }) {
  return {
    type: CONTRACT_LOADING,
    payload: {
      loading
    }
  }
}

export function contractLoaded ({ deployedContract, loaded, loading }) {
  return {
    type: CONTRACT_LOADED,
    payload: {
      deployedContract,
      loaded,
      loading
    }
  }
}

export function contractErrored ({ error }) {
  return {
    type: CONTRACT_ERRORED,
    payload: {
      error
    }
  }
}


export const actions = {
  loadContractDAI,
  contractLoading,
  contractLoaded,
  contractErrored
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CONTRACT_LOADING]: (state, action) => {
    return {
      ...state,
      loading: action.payload
    }
  },
  [CONTRACT_LOADED]: (state, action) => {
    return {
      ...state,
      deployedContract: action.payload.deployedContract,
      loaded: action.payload.loaded,
      loading: action.payload.loading
    }
  },
  [CONTRACT_ERRORED]: (state, action) => {
    return action.payload
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { loaded: false, loading: false, error: null }
export default function ContractReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
