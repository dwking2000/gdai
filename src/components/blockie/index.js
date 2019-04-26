import React, { Component } from 'react';
import makeBlockie from 'ethereum-blockies-base64';
import './blockie.css';
export default class Blockie extends Component {
  constructor(props) {
    super(props);
  }
  getSize() {
    switch(this.props.size) {
      case '32':
      return 'blockie s-32';
      case '48':
      return 'blockie s-48';
      case '64':
      return 'blockie s-64';

    }
  }
  render() {
    return <img className={this.getSize()} src={makeBlockie(this.props.address)}/>
  }
}
