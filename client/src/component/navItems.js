import React from 'react';
import { Link } from 'react-router-dom';

const NavItems = () => {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item mx-lg-3">
        <Link className="nav-link text-light font-weight-bold" to="/">Home</Link>
      </li>
      <li className="nav-item mx-lg-3">
        <Link className="nav-link text-light font-weight-bold" to="/about">About</Link>
      </li>
      <li className="nav-item mx-lg-3">
        <Link className="nav-link text-light font-weight-bold" to="/login">Login</Link>
      </li>
    </ul>
  );
}

export default NavItems;
