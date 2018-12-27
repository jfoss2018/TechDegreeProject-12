import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import history from './history.js';
import { validate } from '../formValidate.js';

// The Login Component lists both the register form for new users and the login form
// for returning users.
class Login extends Component {
  // The Login component keeps each input field's value as state. The reason for this
  // is primarily to remove error or success messages that have been displayed using
  // componentDidUpdate.
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
    // References to each form in order to clear input fields and determine which
    // form is submitted.
    this.loginForm = React.createRef();
    this.registerFrom = React.createRef();
  }

  // componentDidUpdate is used here to remove the Error component if it is displayed
  // once the state has changed after initially displaying the error/success message.
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

  // Once the Login component unmounts, it will also remove the Error component
  // if it is rendered by updating state in App.js.
  componentWillUnmount() {
    this.props.updateUser({
      resMsg: null,
      resSuccess: null
    });
  }

  // The loginSubmit function is called when the submit button is clicked on the
  // login form.
  loginSubmit() {
    // The function sends a post request to the users/login endpoint of the api
    // with the values of the username and password field.
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
        // Once a successful reponse is received, the fields are cleared
        // and App.js state is updated with current user information.
        this.loginForm[0].value = '';
        this.loginForm[1].value = '';
        this.props.updateUser({
          loggedIn: true,
          currentUser: response.data.username,
          id: response.data.id,
          userImage: response.data.userImageURL,
          userEmail: response.data.userEmail,
          userLat: response.data.userCoordinatesLat,
          userLng: response.data.userCoordinatesLng,
          userZoom: response.data.userZoom
        });
        // Then the user is redirected to the /dashboard route.
        history.push('/dashboard');
      }
    }).catch((error) => {
      // It there is an error, the Error component is displayed with the
      // current error message.
      this.props.updateUser({
        resMsg: error.response.data.message,
        resSuccess: 'Red'
      });
      this.setState({
        showMsg: true
      });
    });
  }

  // The registerSubmit function is called when the submit button on the
  // register form is clicked.
  registerSubmit = () => {
    // The function sends a post request to the /users endpoint of the api
    // with the values of the username, email, and password fields.
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
        // Once a succesfully created response is received, the form fields are
        // cleared and App.js state is updated to ensure there is now currently
        // logged in user and displays a success message using the Error Component.
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
          resSuccess: 'Green'
        });
        this.setState({
          showMsg: true
        });
      }
    })
    .catch((error) => {
      // It there is an error, the Error component is displayed with the
      // current error message.
      this.props.updateUser({
        resMsg: error.response.data.message,
        resSuccess: 'Red'
      });
      this.setState({
        showMsg: true
      });
    });
  }

  // The handleSubmit function is called when either form's submit buttons are
  // clicked.
  handleSubmit(e) {
    e.preventDefault();
    if (e.target.name === 'login') {
      // If the submit button belongs to the login form, the loginSubmit function is called.
      this.loginSubmit();
    } else {
      // If the submit button belongs to the register form, the form field values are validated
      // on the front-end using HTML5 form validation and custom span element error message containers.
      if (validate(this.registerForm)) {
        // If the form fields' information is validated, the registerSubmit function is called.
        this.registerSubmit();
      }
    }
  }

  // The handleOnChange function updates the Login Component state whenever input fields' values' change.
  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    // The login form is displayed above the register form at extra small screen sizes, but on the right for any sizes larger than that.
    return (
      <div className="container-fluid">
        <div className="row justify-content-around bg-secondary h-100 set-row d-flex align-items-stretch">
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
                    {/*Login Form*/}
                    <form className="mt-3" ref={form => this.loginForm = form} name="login" onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <div className="form-group">
                          <label htmlFor="userNameLogin">Username</label>
                          <input type="text" autoComplete="off" required className="form-control" id="userNameLogin" aria-describedby="emailHelp" name="userNameLogin" placeholder="Enter Username" onChange={this.handleOnChange} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="passwordLogin">Password</label>
                          <input type="password" autoComplete="off" className="form-control" name="passwordLogin" id="passwordLogin" placeholder="Enter Password" onChange={this.handleOnChange} />
                        </div>
                        <br />
                        <button type="submit" name="login" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                      </div>
                    </form>
                    {/*End Login Form*/}
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
                    {/*Register Form*/}
                    <form ref={form => this.registerForm = form} onSubmit={this.handleSubmit} className="my-3" noValidate>
                      <div className="form-group">
                        <label htmlFor="userName">Username</label>
                        <input type="text" autoComplete="off" className="form-control" required minLength="4" maxLength="16" id="userName" name="userName" placeholder="Enter Username" onChange={this.handleOnChange} />
                        <span className="invalid-feedback"></span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" autoComplete="off" required className="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Enter Email" onChange={this.handleOnChange} />
                        <span className="invalid-feedback"></span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" autoComplete="off" className="form-control" required minLength="8" maxLength="20" name="password" id="password" placeholder="Enter Password" onChange={this.handleOnChange} />
                        <span className="invalid-feedback"></span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" autoComplete="off" className="form-control" name="confirmPassword" required minLength="8" maxLength="20" id="confirmPassword" placeholder="Confirm Password" onChange={this.handleOnChange} />
                        <span className="invalid-feedback c-pass"></span>
                      </div>
                      <button type="submit" name="register" className="btn btn-primary">Submit</button>
                    </form>
                    {/*End Register Form*/}
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
