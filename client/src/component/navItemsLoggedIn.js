import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavItemsLoggedIn = (props) => {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item mx-lg-3">
        <Link onClick={props.toggle} className="nav-link text-light font-weight-bold" to="/">Home</Link>
      </li>
      <li className="nav-item mx-lg-3">
        <Link onClick={props.toggle} className="nav-link text-light font-weight-bold" to="/about">About</Link>
      </li>
      <li className="nav-item dropdown mx-lg-3">
        <Link className="nav-link text-light font-weight-bold dropdown-toggle" id="navbarDropdown" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {props.currentUser}
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link onClick={props.toggle} className="dropdown-item" to="/profile">Profile</Link>
          <Link onClick={props.toggle} className="dropdown-item" to="/dashboard">Dashboard</Link>
          <div className="dropdown-divider"></div>
          <Link onClick={props.toggle} className="dropdown-item" to="/" onClick={props.logOut}>Log Out</Link>
        </div>
      </li>
    </ul>
  );
}

NavItemsLoggedIn.proptypes = {
  currentUser: PropTypes.string,
  logOut: PropTypes.func,
  toggle: PropTypes.func
}

export default NavItemsLoggedIn;
