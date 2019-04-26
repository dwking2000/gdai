import { connect } from 'react-redux'
import { accountLogin } from '../reducers/web3Reducer.js'
import Account from '../components/account.js'

const mapDispatchToProps = dispatch => {
  return {
    checkAccount: () => {
      setInterval(function() {
        // every x seconds, check local address provided by metamask,
        // update accordingly.
        dispatch(accountLogin())
      }, 1000)
    }
  }
}
/*
const mapDispatchToProps = (dispatch) => ({
  checkAccount: () => {
    setInterval(function() {
      // every x seconds, check local address provided by metamask,
      // update accordingly.
      accountLogin()
    }, 1000)

  }
})
*/
const AccountContainer = connect(null, mapDispatchToProps)(Account)
export default AccountContainer;
