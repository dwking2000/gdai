import React from 'react';
import { Button, Input, Card, Avatar } from 'antd';
import { wrapDAIContractCall } from '../../reducers/contractReducerDAI.js'
import { ButtonStates } from '../../reducers/buttonsReducer.js'
import './styles.css'

const { Meta } = Card;

export class UnwrapDAI extends React.Component {

  componentDidMount() {
    this.setState({
      value: '1'
    })
  }

  handleChange = (e) => {
    console.log('change ', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

 render() {
   switch(this.props.buttonState) {
     case ButtonStates.default:
      return (
        <Card
          style={{ width: 'auto', marginTop: 16 }}
          actions={[<Input style={{marginLeft:'8px'}} {...this.props} defaultValue={1} onChange={this.handleChange} placeholder="Input a number" maxLength={25} />, <Button type="primary" onClick={() => this.props.unwrapDAI(this.state.value)}>{<span>GDAI <i style={{paddingLeft: 4, paddingRight: 4}} className="fas fa-arrow-right"></i> DAI</span>}</Button>]}
        >
          <Meta style={{height: 85}}
            title="Convert GDAI"
            description="Revert some of your GDAI back to DAI"
          />
        </Card>
      )
     case ButtonStates.waiting:
     return (
       <Card
         style={{ width: 'auto', marginTop: 16 }}
         actions={[<b style={{color:'#ff8533'}}>Please accept & confirm Transaction in Metamask</b>]}
       >
         <Meta
           title={<span style={{fontSize: 18}}><i style={{padding:'4px'}} className="fas fa-spinner fa-pulse"></i> waiting</span>}
           description="Please accept & confirm the transaction in Metamask"
         />
       </Card>
     )
   }
 }
}
