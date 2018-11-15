import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Nav = (props) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary static-top">
      <div className="container">
        <span className="navbar-brand align-middle text-light font-italic"><h4>Point & Click Weather App</h4></span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Sign In</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Nav.proptypes = {
  loggedIn: PropTypes.bool.isRequired
};

export default Nav;
