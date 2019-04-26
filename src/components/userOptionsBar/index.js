import React from 'react';
import { Row, Col } from 'antd'
import { WrapDAIContainer, UnwrapDAIContainer } from '../../containers/buttonsContainer.js'
import './styles.css'
export default class UserOptionsBar extends React.Component {
  render() {
    return (
      <Row>
        <Col span={11} >
          <WrapDAIContainer />
        </Col>

        <Col span={2} >
        </Col>

        <Col span={11} >
        <UnwrapDAIContainer />
        </Col>
      </Row>
    )
  }
}
