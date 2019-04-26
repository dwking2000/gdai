import { connect } from 'react-redux'
import { getBalanceDAI } from '../reducers/contractReducerDAI.js'
import { getBalanceGDAI } from '../reducers/contractReducerGDAI.js'
import { getFeesByAddress, getRankByAddress } from '../reducers/localUserReducer.js'
import UserDetails from '../components/userDetails'

const mapStateToProp = (state) => ({
  dai : state.LocalUserReducer.dai,
  gdai : state.LocalUserReducer.gdai,
  fees : null,
  rank: state.LocalUserReducer.rank
 })

const mapDispatchToProps = dispatch => {
  return {
    getBalanceDAI: (address) => {
      console.log(address)
     dispatch(getBalanceDAI(address))
   },
   getBalanceGDAI: (address) => {
     console.log(address)
    dispatch(getBalanceGDAI(address))
   },
   getFees: (address) => {
     dispatch(getFeesByAddress(address))
   },
   getRank: (address) => {
     dispatch(getRankByAddress(address))
   }
  }
}
const UserDetailsContainer = connect(null, mapDispatchToProps)(UserDetails)
export default UserDetailsContainer;
