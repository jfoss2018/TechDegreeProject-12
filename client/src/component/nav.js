import React from 'react';

const Nav = () => {
  return (
    <div className="container-fluid bg-info">
      <nav role="navigation">
        <ul className="nav nav-pills ml-auto">
          <li>Home</li>
          <li>About</li>
          <li>Login</li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
