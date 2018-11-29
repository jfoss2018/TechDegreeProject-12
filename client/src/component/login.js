import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import history from './history.js';


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
      error: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.registerSubmit = this.registerSubmit.bind(this);
    this.loginUserField = React.createRef();
    this.loginPasswordField = React.createRef();
    this.registerPasswordField = React.createRef();
    this.registerCPasswordField = React.createRef();
    this.registerFrom = React.createRef();
  }

  componentDidUpdate(prevPops, prevState, snapshot) {
    if (this.state.error === true && prevState.error === true) {
      this.props.updateUser({
        resError: null
      });
      this.setState({
        error: false
      });
    }
  }

  componentWillUnmount() {
    this.props.updateUser({
      resError: null
    });
  }

  validate = () => {
    const formLength = this.registerForm.length;
    if (this.registerForm.checkValidity() === false) {
      for (let i=0; i<formLength; i+=1) {
        const elem = this.registerForm[i];
        const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
        if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
          if (!elem.validity.valid) {
            errorLabel.style.display = 'inline-block';
            errorLabel.textContent = elem.validationMessage;
          } else {
            errorLabel.style.display = 'none';
            errorLabel.textContent = '';
          }
        }
      }
      if (this.registerPasswordField.current.value !== this.registerCPasswordField.current.value) {
        const errorLabel = document.querySelectorAll('.invalid-feedback')[3];
        errorLabel.style.display = 'inline-block';
        errorLabel.textContent = 'The confirm password field must match the password field.'
      }
      return false;
    } else {
      for (let i=0; i<formLength; i+=1) {
        const elem = this.registerForm[i];
        const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
        if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
          errorLabel.style.display = 'none';
          errorLabel.textContent = '';
        }
      }
      if (this.registerPasswordField.current.value !== this.registerCPasswordField.current.value) {
        const errorLabel = document.querySelectorAll('.invalid-feedback')[3];
        console.log(errorLabel);
        errorLabel.style.display = 'inline-block';
        errorLabel.textContent = 'The confirm password field must match the password field.'
        return false;
      }
      return true;
    }
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
    }).catch((error) => {
      this.props.updateUser({
        resError: error.response.data.message,
      });
      this.setState({
        error: true
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
        userName: this.registerForm[0].value,
        password: this.registerForm[3].value,
        email: this.registerForm[1].value
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
          resError: null
        });
      }
    })
    .catch((error) => {
      this.props.updateUser({
        resError: error.response.data.message,
      });
      this.setState({
        error: true
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (e.target.name === 'login') {
      this.loginSubmit();
    } else {
      if (this.validate()) {
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
                  <div className="col-12 mx-3">
                    <h2>Login</h2>
                  </div>
                </div>
                <div className="row justify-content-around">
                  <div className="col border mx-3 border-dark rounded">
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
              <div className="col-12 col-sm-7 col-xl-6 order-sm-1">
                <div className="row justify-content-around row-fluid">
                  <div className="col-12 mx-3">
                    <h2>Register</h2>
                  </div>
                </div>
                <div className="row justify-content-around">
                  <div className="col mx-3 border border-dark rounded">
                    <form ref={form => this.registerForm = form} onSubmit={this.handleSubmit} className="my-3" noValidate>
                      <div className="form-group">
                        <label htmlFor="userName">Username</label>
                        <input type="text" required className="form-control" minLength="4" maxLength="16" id="userName" name="userName" placeholder="Enter Username" />
                        <span className="invalid-feedback"></span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" required className="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Enter Email" onChange={this.handleOnChange} />
                        <span className="invalid-feedback"></span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" required className="form-control" minLength="8" maxLength="20" name="password" ref={this.registerPasswordField} id="password" placeholder="Enter Password" onChange={this.handleOnChange} />
                        <span className="invalid-feedback"></span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" required className="form-control" name="confirmPassword" minLength="8" maxLength="20" ref={this.registerCPasswordField} id="confirmPassword" placeholder="Confirm Password" onChange={this.handleOnChange} />
                        <span className="invalid-feedback"></span>
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
  updateUser: PropTypes.func,
  isError: PropTypes.bool
}

export default Login;
