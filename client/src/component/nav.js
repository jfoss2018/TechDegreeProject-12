import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavItems from './navItems.js';
import NavItemsLoggedIn from './navItemsLoggedIn';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    }
    this.handleOnChange = this.handleOnChange.bind(this);
  }



  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    let currentUser = this.props.currentUser;

    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-primary static-top">
          <div className="container">
            <span className="navbar-brand align-middle text-light font-italic"><h4>Point & Click Weather App</h4></span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              {currentUser ? (
                <NavItemsLoggedIn currentUser={this.props.currentUser} logOut={this.props.logOut} />
              ) : (
                <NavItems />
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }
};

Nav.proptypes = {
  loggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func,
  currentUser: PropTypes.string
};

export default Nav;
