import React from 'react';
import LeaderboardContainer from '../containers/leaderboard.js';

export default class LeaderboardPage extends React.Component {
  render() {
    return (
      <div>
        <h1><b>Leaderboard</b></h1>
        <LeaderboardContainer />
      </div>
    )
  }
}
