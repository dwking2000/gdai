import React, { Component } from 'react';
import {Button} from 'antd';
import Web3 from 'web3';


export default class isDesiredNetwork extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: '',
            clicked: true,
            description: ''
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({ clicked: !this.state.clicked })
        if (this.state.clicked) {
        }
        else {
            this.state.image = ''
            this.state.description = ''
        }


    }

    render() {
        return (
            <div>
                <Button onClick={(e) => this.handleClick(e)}> Connect To Ropsten Network</Button>
                <br />
                <br />
                {this.state.description}
            </div>

        )
    }
}
