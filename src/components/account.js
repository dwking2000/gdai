import React from 'react'

export default class Account extends React.Component {
  componentDidMount() {
    this.props.checkAccount()
  }
  componentWillUnmount() {
    clearTimeout(this.props.checkAccount())
  }
  render() {
    return null
  }
}
