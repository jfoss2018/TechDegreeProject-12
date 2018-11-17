import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      redirectTo: null
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    axios.post('/api/v1/users', {
      username: this.state.userName,
      password: this.state.password
    })
    .then(function(response) {

    })
  }

  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-primary static-top">
          <div className="container">
            <span className="navbar-brand align-middle text-light font-italic"><h4>Point & Click Weather App</h4></span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item mx-lg-3">
                  <Link className="nav-link text-light font-weight-bold" to="/">Home</Link>
                </li>
                <li className="nav-item mx-lg-3">
                  <Link className="nav-link text-light font-weight-bold" to="/about">About</Link>
                </li>
                <li className="nav-item mx-lg-3">
                  <Link className="nav-link text-light font-weight-bold" to="/register">Register</Link>
                </li>
                <li className="nav-item mx-lg-3">
                  <button className="fixme" data-toggle="modal" data-target="#exampleModal">Sign In</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Sign In</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="userName">Username</label>
                    <input type="text" required className="form-control" id="userName" aria-describedby="emailHelp" name="userName" placeholder="Enter Username" onChange={this.handleOnChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" id="password" placeholder="Enter Password" onChange={this.handleOnChange} />
                  </div>
                  <br />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                </div>
                <small>Not registered with this app? Click <Link to="/register">here</Link> to sign up.</small>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

Nav.proptypes = {
  loggedIn: PropTypes.bool.isRequired
};

export default Nav;
