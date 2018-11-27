import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import history from './history.js';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userNameLogin: '',
      email: '',
      password: '',
      passwordLogin: '',
      confirmPassword: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.registerSubmit = this.registerSubmit.bind(this);
    this.loginUserField = React.createRef();
    this.loginPasswordField = React.createRef();
    this.registerUserField = React.createRef();
    this.registerEmailField = React.createRef();
    this.registerPasswordField = React.createRef();
    this.registerCPasswordField = React.createRef();
  }

  loginSubmit() {
    axios({
      method: 'post',
      url: '/api/v1/users/login',
      proxy: {
        host: '127.0.0.1',
        port: 3001
      },
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        userName: this.state.userNameLogin,
        password: this.state.passwordLogin
      }
    })
    .then(response => {
      if (response.status === 200) {
        this.loginUserField.current.value = '';
        this.loginPasswordField.current.value = '';
        this.props.updateUser({
          loggedIn: true,
          currentUser: response.data.username,
          id: response.data.id,
          userImage: response.data.userImageURL || 'uploads/default.png',
          userEmail: response.data.userEmail || 'james@yahoo.com',
          userLat: response.data.userCoodinatesLat || 40.75,
          userLng: response.data.userCoodinatesLng || -74.02,
          userZoom: response.data.userZoom || 12
        });
        history.push('/dashboard');
      }
    }).catch(function(err) {
      console.log(err);
    });
  }

  registerSubmit() {
    axios({
      method: 'post',
      url: '/api/v1/users',
      proxy: {
        host: '127.0.0.1',
        port: 3001
      },
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        userName: this.state.userName,
        password: this.state.password,
        email: this.state.email
      }
    })
    .then(response => {
      if (response.status === 200) {
        this.registerUserField.current.value = '';
        this.registerPasswordField.current.value = '';
        this.registerEmailField.current.value = '';
        this.registerCPasswordField.current.value = '';
        this.props.updateUser({
          loggedIn: false,
          currentUser: '',
          id: '',
          userImage: '',
          userEmail: '',
          userLat: null,
          userLng: null,
          userZoom: null
        });
      }
    }).catch(function(err) {
      console.log(err);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (e.target.name === 'login') {
      this.loginSubmit();
    } else {
      this.registerSubmit();
    }
  }

  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-around my-3">
          <div className="col-5">
            <h2>Register</h2>
          </div>
          <div className="col-3">
            <h2>Login</h2>
          </div>
        </div>
        <div className="row justify-content-around">
          <div className="col-5 border border-dark rounded">
            <form className="my-3">
              <div className="form-group">
                <label htmlFor="userName">Username</label>
                <input type="text" required className="form-control" ref={this.registerUserField} id="userName" name="userName" placeholder="Enter Username" onChange={this.handleOnChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" required className="form-control" id="email" ref={this.registerEmailField} aria-describedby="emailHelp" name="email" placeholder="Enter Email" onChange={this.handleOnChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" required className="form-control" name="password" ref={this.registerPasswordField} id="password" placeholder="Enter Password" onChange={this.handleOnChange} />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" required className="form-control" name="confirmPassword" ref={this.registerCPasswordField} id="confirmPassword" placeholder="Confirm Password" onChange={this.handleOnChange} />
              </div>
              <button type="submit" name="register" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
            </form>
          </div>
          <div className="col-3 border border-dark rounded">
            <form className="mt-3">
              <div className="form-group">
                <div className="form-group">
                  <label htmlFor="userNameLogin">Username</label>
                  <input type="text" required className="form-control" ref={this.loginUserField} id="userNameLogin" aria-describedby="emailHelp" name="userNameLogin" placeholder="Enter Username" onChange={this.handleOnChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="passwordLogin">Password</label>
                  <input type="password" className="form-control" ref={this.loginPasswordField} name="passwordLogin" id="passwordLogin" placeholder="Enter Password" onChange={this.handleOnChange} />
                </div>
                <br />
                <button type="submit" name="login" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

Login.propTypes = {
  updateUser: PropTypes.func
}

export default Login;
