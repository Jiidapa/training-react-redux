import React, { Component } from "react";
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {Navbar,Nav} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Login from "./Login";


library.add(fas)
class Navibar extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg" variant="light" style={{ borderBottom: '4px solid #F8C471' }}>
          <Navbar.Brand href="#home">สั่งซื้ออาหารออนไลน์ <FontAwesomeIcon icon={['fas','pizza-slice']}/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavLink className='nav-link' exact={true} to='/' >Home</NavLink>
              <NavLink className='nav-link' to='/about'>About</NavLink>
              <NavLink className='nav-link' to='/cart'>ตะกร้าสินค้า <span className="badge badge-warning">{this.props.total}</span></NavLink>
              <NavLink className='nav-link' to='/Register'>Register</NavLink>
            </Nav>
            <Login/>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
      total: state.cartReducer.total
  }
}

export default connect(mapStatetoProps)(Navibar)