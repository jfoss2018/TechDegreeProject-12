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
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary static-top">
          <div className="container">
            <span className="span-1 navbar-brand align-middle text-light font-italic"><h4>Point & Click Weather App</h4></span>
            <button className="navbar-toggler" type="button" id="btn-collapse" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse text-right" id="navbarResponsive">
              {currentUser ? (
                <NavItemsLoggedIn toggle={this.props.toggle} currentUser={this.props.currentUser} logOut={this.props.logOut} />
              ) : (
                <NavItems toggle={this.props.toggle} />
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
  currentUser: PropTypes.string,
  toggle: PropTypes.func
};

export default Nav;
