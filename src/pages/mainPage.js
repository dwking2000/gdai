import React from 'react';
import UserDetailsContainer from '../containers/userDetailsContainer.js'
import UserOptionsBar from '../components/userOptionsBar'
import { Row, Col, Alert, List } from 'antd';


const noWeb3 = () => {
  return (
    <Row style={{marginTop:'10em'}}>
      <Col>
        <Alert
          message="Cannot Find Web3"
          description="Please make sure you have Metamask isntalled."
          type="error"
        />
      </Col>
    </Row>
  )
}

const noLocalAddress = () => {
  return (
    <Row style={{marginTop:'10em'}}>
      <Col>
        <Alert
          message="Cannot find your local address"
          description="Please make sure you are logged in to Metamask."
          type="error"
        />
      </Col>
    </Row>
  )
}

const main = (details) => {
    return (details)
    ? <div>
    <h1><b>Home</b></h1>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={[{...details}]}
          footer={<div></div>} // <--- TODO: build footer notes for leaderboard page. Include info about how the leaderboard is calculated?
          renderItem={item => (
            <UserDetailsContainer {...item} local={true} />
          )}
        />
        <UserOptionsBar />
      </div>
    : <p>Oops, no content</p>
}

export default class MainPage extends React.Component {
  render() {
    if (!this.props.web3Exists)
    return noWeb3();

    if (!this.props.localAddress)
    return noLocalAddress();

console.log(this.props.localAddress)
    //return main({...this.props.details, balance: {DAI: this.props.getBalance('dai', this.props.localAddress), GDAI: this.props.getBalance('gdai', this.props.localAddress)}});
    //return main({...this.props.details, balance: {DAI: this.props.getBalance('dai', this.props.localAddress), GDAI: this.props.getBalance('gdai', this.props.localAddress)}});
    return main({...this.props.details, local:true});
  }
}
