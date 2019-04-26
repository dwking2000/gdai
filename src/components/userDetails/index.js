import React from 'react';
import { List, Avatar, Icon } from 'antd';
import FontAwesome from 'react-fontawesome'
import Blockie from '../blockie'
import * as Utils from 'web3-utils'
import { convertBigNumToNum } from '../../reducers/web3Reducer.js'
//  details
// - display list of users ranked by number of carbon offsets
// - how many transactions
// - how many DAI
// - how many tonnes of carbon sequestered

const IconText = ({ type, text }) => (
  <span>
    <i className={type} style={{marginRight: 8}}></i>
    {text}
  </span>
);

const RankDescription = (rankNumber, isLocalUser) => {
  return (isLocalUser)
  ? <p>Congrats! You have achieved the rank of {rankNumber}.</p>
  : <p>Rank {rankNumber}</p>
}

const rankInfoText = 'rankings are based on x, y and z factors.'
const genericAvatar = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'

let daiBal = null
let gdaiBal = null
export default class UserDetails extends React.Component {
  componentDidMount() {
    if (this.props.local) {
      this.props.getBalanceDAI(this.props.address)
      this.props.getBalanceGDAI(this.props.address)
      this.props.getFees(this.props.address)
      this.props.getRank(this.props.address)
    }
  }
  render() {
    let fees = 0
    let dai = null
    let gdai = null
      if (!this.props.local) {
        fees = Utils.fromWei(this.props.fees._hex)
      }
      const actions = [<IconText type="fas fa-piggy-bank" text={Utils.fromWei(this.props.fees._hex.toString())} />]
    if (this.props.local){
      actions.push(<IconText type="fas fa-coins" text={<span><b>DAI </b>{this.props.dai}</span>} />)
      actions.push(<IconText type="fas fa-coins" text={<span><b>GDAI </b>{this.props.gdai}</span>} />)
    }
    return (
      <List.Item
      style={{textAlign:'left'}}
        key={this.props.address}
        actions={actions}
        //actions={[<IconText type="fas fa-leaf" text={1000} />, <IconText type="fas fa-coins" text={29} />, <IconText type="fas fa-funnel-dollar" text={this.props.carbonSequestered} />]}
        extra={<h1>{this.props.rank}</h1>} // < --  TODO: item index will be rank, displayed here
      >
        <List.Item.Meta
          avatar={<span style={{fontSize: '36px', color: 'Dodgerblue'}}>
                    <Blockie size="48" address={this.props.address} />
                  </span>}
          title={<a href={this.props.href}>{this.props.address}</a>}
          description={RankDescription(this.props.rank, false)} // <---- TODO: replace secibd parameter with isLocalUser() function which should be declared in reducers/localUserReducer.js - OR - reducers/web3Recuder.js. Don't forget to import the function at the top of this file
        />
      </List.Item>
    )
  }
}
