import { connect } from 'react-redux'

import MainPage from '../pages/mainPage.js'
import { getBalanceDAI } from '../reducers/contractReducerDAI.js'
import { getBalanceGDAI } from '../reducers/contractReducerGDAI.js'
const mapStateToProps = (state) => ({
  details : {address: state.Web3Reducer.localAddress, fees: state.LocalUserReducer.fees, dai: state.LocalUserReducer.dai, gdai: state.LocalUserReducer.gdai, },
  web3Exists : state.Web3Reducer.web3,
  localAddress : state.Web3Reducer.localAddress
 })

 const mapDispatchToProps = (dispatch) => ({
   getBalanceDAI: (address) => {
     console.log(address)
    dispatch(getBalanceDAI(address))
  },
  getBalanceGDAI: (address) => {
    console.log(address)
   dispatch(getBalanceGDAI(address))
  }
 })

const MainPageContainer = connect(mapStateToProps, mapDispatchToProps)(MainPage)
export default MainPageContainer;
