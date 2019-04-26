import React from 'react';
import { Link } from "react-router-dom";
import { Menu, Icon } from 'antd';
import './styles.css'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Item = Menu.Item;
export default class Navbar extends React.Component {
  state = {
    current: 'home',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        className="customNavbar"
      >
        <Item key="home">
          <Link to="/"><Icon type="home" /> Main Page</Link>
        </Item>
        <Item key="leaderboard">
          <Link to="/LeaderboardPage"><Icon type="gold" /> Leaderboard</Link>
        </Item>
      </Menu>
    )
  }
}
