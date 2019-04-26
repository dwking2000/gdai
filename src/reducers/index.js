import { combineReducers } from 'redux'
import ButtonsReducer from './buttonsReducer.js'
import EventsReducer from './eventsReducer.js'
import LocalUserReducer from './localUserReducer.js'
import LeaderboardReducer from './leaderboardReducer.js'
import Web3Reducer from './web3Reducer.js'
import ContractReducerDAI from './contractReducerDAI.js'
import ContractReducerGDAI from './contractReducerGDAI.js'
export default combineReducers({
  ButtonsReducer,
  EventsReducer,
  LocalUserReducer,
  LeaderboardReducer,
  Web3Reducer,
  ContractReducerDAI,
  ContractReducerGDAI,

})
