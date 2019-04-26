import Web3 from 'web3'
//import truffleConfig from '../../truffle.js'

// ------------------------------------
// Constants
// ------------------------------------
export const WEB3_CONNECTED = 'WEB3_CONNECTED'
export const WEB3_DISCONNECTED = 'WEB3_DISCONNECTED'
export const ACCOUNT_CONNECTED = 'ACCOUNT_CONNECTED'
export const ACCOUNT_CONNECT_ERROR = 'ACCOUNT_CONNECT_ERROR'
// ------------------------------------
// Actions
// ------------------------------------
export const web3Connect = () => {
  return (dispatch, getState) => {
    /*eslint-disable */
    //let web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`

    let output = (typeof web3 !== 'undefined') // web3 given by metamask
                  ? { type: WEB3_CONNECTED, payload: { web3: new Web3(web3.currentProvider), isConnected: true } }
                  : { type: WEB3_DISCONNECTED, payload: { web3: null, isConnected: false } }  // comment out for optional section
                  // : { type: WEB3_CONNECTED, payload: { web3: new Web3(new Web3.providers.HttpProvider(web3Location)), isConnected: true } }  // comment in for optional section
    /*eslint-enable */
    dispatch(output);

  }
}

export const accountLogin = () => {
  return (dispatch, getState) => {
    if (!getState().Web3Reducer.web3)
    return

    let localAddress = getState().Web3Reducer.localAddress;
    let shouldRequestAccountType = false
    const network = getState().Web3Reducer.web3.currentProvider.connection.networkVersion;
    getState().Web3Reducer.web3.eth.getAccounts((e, r) => {
      if (!e && r[0] !== undefined)
        {
          if (localAddress !== r[0].toLowerCase() || localAddress === null)
            dispatch({type: ACCOUNT_CONNECTED, payload: {accountConnected: true, localAddress: r[0].toLowerCase(), allAddresses: r, accountType: null, network: network}})
            localAddress = getState().Web3Reducer.web3.currentProvider.connection.selectedAddress;
        } else {
          dispatch({type: ACCOUNT_CONNECT_ERROR, payload:  { error: 'local address not found', localAddress: null } })
        }
    })
  }
}

export const convertBigNumToNum = (bn) => {
  let rtn = ''
  return (dispatch, getState) => {
    rtn = getState().Web3Reducer.web3.utils.fromWei(bn.toString());
  }
  return rtn;
}


export function web3Connected ({ web3, isConnected }) {
  return {
    type: WEB3_CONNECTED,
    payload: {
      web3: web3,
      isConnected: isConnected
    }
  }
}

export function web3Disconnected () {
  return {
    type: WEB3_DISCONNECTED,
    payload: {
      web3: null,
      web3Connected: false
    }
  }
}

export function accountConnected ({ data }) {
  return {
    type: ACCOUNT_CONNECTED,
    payload: data
  }
}

export function accountConnectError ({ error, localAddress }) {
  return {
    type: ACCOUNT_CONNECT_ERROR,
    payload: {
      error: error,
      localAddress: localAddress
    }
  }
}

export const actions = {
  web3Connect,
  web3Connected,
  web3Disconnected
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [WEB3_CONNECTED]: (state, action) => {
    return {
      ...state,
      web3: action.payload.web3,
      web3Connected : action.payload.web3Connected
    }
  },

  [WEB3_DISCONNECTED]: (state, action) => {
    return {
      ...state,
      web3: action.payload.web3,
      web3Connected : action.payload.web3Connected
    }
  },

  [ACCOUNT_CONNECTED]: (state, action) => {
    return {
      ...state,
      accountConnected : action.payload.accountConnected,
      localAddress: action.payload.localAddress,
      allAddresses: action.payload.allAddresses,
      accountType: action.payload.accountType,
      network: action.payload.network
    }
  },

  [ACCOUNT_CONNECT_ERROR]: (state, action) => {
    return {
      ...state,
      error : action.payload.error,
      localAddress: action.payload.localAddress
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { web3: null, web3Conneted: false, accountConnected: false, localAddress: null }
export default function Web3Reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
