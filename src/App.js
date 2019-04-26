import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Row, Col } from 'antd';
import { Routes } from './routes'
import logo from './logo.svg';
import './App.css';
import {connect} from "react-redux";
import Navbar from './components/navbar/index.js'
import MetaMaskLoginButton from './components/react-metamask-login-button/src';
const NAVBAR_TITLE = "Carbon Offset Token"

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">

        <Navbar title={NAVBAR_TITLE} />
        <Row>
          <Col span={12} offset={6} className="pageContent">

            <Route exact path="/" component={Routes.MainPage} />
            <Route exact path="/LeaderboardPage" component={Routes.LeaderboardPage} />
            <MetaMaskLoginButton />
          </Col>
        </Row>
      </div>
      </Router>
      /*<Router>
        <div className="App">
          <Navbar title={NAVBAR_TITLE} />
          <div className="">
            <Route exact path="/" component={Routes.MainPage} />
            <Route exact path="/LeaderboardPage" component={Routes.LeaderboardPage} />
          </div>
        </div>
      </Router>*/
    );
  }
}

export default App;
