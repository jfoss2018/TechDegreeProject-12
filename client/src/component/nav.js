import React from 'react';
import PropTypes from 'prop-types';
import NavItems from './navItems.js';
import NavItemsLoggedIn from './navItemsLoggedIn';

// The Nav component is always displayed and contains buttons that navigate to each route.
const Nav = (props) => {

  let currentUser = props.currentUser;

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
              /*If there is a current user in App.js state, the NavItemsLoggedIn component is returned.*/
              <NavItemsLoggedIn toggle={props.toggle} currentUser={props.currentUser} logOut={props.logOut} />
            ) : (
              /*If there is no current user in App.js state, the NavItems component is returned.*/
              <NavItems toggle={props.toggle} />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

Nav.proptypes = {
  loggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func,
  currentUser: PropTypes.string,
  toggle: PropTypes.func
};

export default Nav;
