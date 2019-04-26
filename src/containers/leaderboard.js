import { connect } from 'react-redux'
import Leaderboard from '../components/leaderboard'
import { updateLeaderboard } from '../reducers/leaderboardReducer.js'
// TODO: if middleware does not rank users before sending data, perform leaderboard ranking of users in client

const mapStateToProps = state => ({
  rankedUsers: state.LeaderboardReducer.rankedUsers, // <--- TODO: this is where the ranking function call goes, the function should be defined in this file
  loadingData: state.LeaderboardReducer.loadingData,
  error: state.LeaderboardReducer.error
})

const mapDispatchToProps = dispatch => ({
  updateLeaderboard: id => dispatch(updateLeaderboard(id))
})

const LeaderboardContainer = connect(mapStateToProps)(Leaderboard)
export default LeaderboardContainer;
