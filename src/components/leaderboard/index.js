import React from 'react'
import PropTypes from 'prop-types'
import UserDetailsContainer from '../../containers/userDetailsContainer.js'
import { List, Icon } from 'antd';


const EMPTY_MESSAGE = 'Oops, no content'


const RankDescription = (rankNumber, isLocalUser) => {
  return (isLocalUser)
  ? <p>Congrats! You have achieved the rank of {rankNumber + 1}.</p>
  : <p>Rank {rankNumber + 1}</p>
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const rankInfoText = 'rankings are based on x, y and z factors.'
const genericAvatar = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
//  details
// - display list of users ranked by number of carbon offsets
// - how many transactions
// - how many DAI
// - how many tonnes of carbon sequestered
export default class Leaderboard extends React.Component {

  render() {
    return (this.props.rankedUsers.length > 0)
    ?   <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 4,
          }}
          dataSource={this.props.rankedUsers}
          footer={<div><b>Rankings</b> are based on total carbon offset fees paid by users</div>} // <--- TODO: build footer notes for leaderboard page. Include info about how the leaderboard is calculated?
          renderItem={(item, index) => (
            <UserDetailsContainer rank={++index} {...item} />
          )}
        />
    : <p>{EMPTY_MESSAGE}</p>
  }
}
