import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App.js';
import AccountContainer from './containers/accountContainer.js';
import * as serviceWorker from './serviceWorker';
import configureStore from './configureStore.js'
import { web3Connect } from './reducers/web3Reducer.js'
import { loadContractDAI } from './reducers/contractReducerDAI.js'
import { loadContractGDAI } from './reducers/contractReducerGDAI.js'
import { listenForEvents } from './reducers/eventsReducer.js'
import { updateLeaderboard } from './reducers/leaderboardReducer.js'
import 'antd/dist/antd.css'
import './index.css';
import io from 'socket.io-client'

let socket = io.connect('http://localhost:2500/')
const store = configureStore()
/*
const initialize = () => {
  return function (dispatch) => {
    return dispatch(
      web3Connect()
    ).then(() => {
      dispatch(loadContract())
    })
  }
}
*/
store.dispatch(web3Connect())
store.dispatch(loadContractDAI())
store.dispatch(loadContractGDAI())
store.dispatch(listenForEvents())

socket = io.connect('http://localhost:2500/');
console.log(socket)
socket.on('connect', function () {
  console.log('socket connected!')
  socket.on('leaderboard', function(data){
    console.log(data);
    store.dispatch(updateLeaderboard(data.leaderboard));
  }); // TODO: replace callback inner with this.props.updateLeaderboard
});

setTimeout(() => {


}, 2000)
ReactDOM.render(
  <Provider store={store}>
  <AccountContainer />
      <App />
  </Provider>,
   document.getElementById('root')
 );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// report on user stats/usage

// leaderboard - click on anyone to click on leaderboard view stats

//  if own own user stats page has - wrap/unwrap - turn DAI into gDAI

// link to maker's DAI purchase page & Coinbase DAI Exchange (maybe etherswap - to be determined)

//  send & receive page - will display how much is being sent / received (sender centric or receiver centric?)
// - figure out the dynamic

// anyone receiving gDAI should know there will be a 1 or 2 % fee
