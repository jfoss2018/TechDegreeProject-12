import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import history from './history.js';
import { validate } from '../formValidate.js';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userNameLogin: '',
      email: '',
      password: '',
      passwordLogin: '',
      confirmPassword: '',
      showMsg: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.registerSubmit = this.registerSubmit.bind(this);
    this.loginForm = React.createRef();
    this.registerFrom = React.createRef();
  }

  componentDidUpdate(prevPops, prevState, snapshot) {
    if (this.state.showMsg === true && prevState.showMsg === true) {
      this.props.updateUser({
        resMsg: null,
        resSuccess: null
      });
      this.setState({
        showMsg: false
      });
    }
  }

  componentWillUnmount() {
    this.props.updateUser({
      resMsg: null,
      resSuccess: null
    });
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
        this.loginForm[0].value = '';
        this.loginForm[1].value = '';
        this.props.updateUser({
          loggedIn: true,
          currentUser: response.data.username,
          id: response.data.id,
          userImage: response.data.userImageURL || 'uploads/default.png',
          userEmail: response.data.userEmail,
          userLat: response.data.userCoodinatesLat || 40.75,
          userLng: response.data.userCoodinatesLng || -74.02,
          userZoom: response.data.userZoom || 12
        });
        history.push('/dashboard');
      }
    }).catch((error) => {
      this.props.updateUser({
        resMsg: error.response.data.message,
        resSuccess: false
      });
      this.setState({
        showMsg: true
      });
    });
  }

  registerSubmit = () => {
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
      if (response.status === 201) {
        this.registerForm[0].value = '';
        this.registerForm[1].value = '';
        this.registerForm[2].value = '';
        this.registerForm[3].value = '';
        this.props.updateUser({
          loggedIn: false,
          currentUser: '',
          id: '',
          userImage: '',
          userEmail: '',
          userLat: null,
          userLng: null,
          userZoom: null,
          resMsg: 'Great! You have successfully registered. Login to get started!',
          resSuccess: true
        });
        this.setState({
          showMsg: true
        });
      }
    })
    .catch((error) => {
      this.props.updateUser({
        resMsg: error.response.data.message,
        resSuccess: false
      });
      this.setState({
        showMsg: true
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (e.target.name === 'login') {
      this.loginSubmit();
    } else {
      if (validate(this.registerForm)) {
        this.registerSubmit();
      }
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
        <div className="row justify-content-around bg-secondary">
          <div className="col-12 col-md-9 border-left border-right border-dark bg-white">
            <div className="row justify-content-around">
              <div className="col-12 col-sm-5 order-sm-2">
                <div className="row justify-content-around row-fluid">
                  <div className="col-12 mx-3 my-3">
                    <h2>Login</h2>
                  </div>
                </div>
                <div className="row justify-content-around">
                  <div className="col border mx-3 border-dark rounded show-shadow">
                    <form className="mt-3" ref={form => this.loginForm = form} name="login" onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <div className="form-group">
                          <label htmlFor="userNameLogin">Username</label>
                          <input type="text" required className="form-control" id="userNameLogin" aria-describedby="emailHelp" name="userNameLogin" placeholder="Enter Username" onChange={this.handleOnChange} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="passwordLogin">Password</label>
                          <input type="password" className="form-control" name="passwordLogin" id="passwordLogin" placeholder="Enter Password" onChange={this.handleOnChange} />
                        </div>
                        <br />
                        <button type="submit" name="login" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-7 col-xl-6 order-sm-1">
                <div className="row justify-content-around row-fluid">
                  <div className="col-12 mx-3 my-3">
                    <h2>Register</h2>
                  </div>
                </div>
                <div className="row justify-content-around mb-3">
                  <div className="show-shadow col mx-3 border border-dark rounded">
                    <form ref={form => this.registerForm = form} onSubmit={this.handleSubmit} className="my-3" noValidate>
                      <div className="form-group">
                        <label htmlFor="userName">Username</label>
                        <input type="text" required className="form-control" minLength="4" maxLength="16" id="userName" name="userName" placeholder="Enter Username" onChange={this.handleOnChange} />
                        <span className="invalid-feedback"></span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" required className="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Enter Email" onChange={this.handleOnChange} />
                        <span className="invalid-feedback"></span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" required className="form-control" minLength="8" maxLength="20" name="password" id="password" placeholder="Enter Password" onChange={this.handleOnChange} />
                        <span className="invalid-feedback"></span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" required className="form-control" name="confirmPassword" minLength="8" maxLength="20" id="confirmPassword" placeholder="Confirm Password" onChange={this.handleOnChange} />
                        <span className="invalid-feedback c-pass"></span>
                      </div>
                      <button type="submit" name="register" className="btn btn-primary">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
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
