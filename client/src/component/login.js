import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
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
    console.log('Yay');
    //
  }

  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-4">
            <form>
              <div className="form-group">
                <label htmlFor="userName">Username</label>
                <input type="text" required className="form-control" id="userName" aria-describedby="emailHelp" name="userName" placeholder="Enter Username" onChange={this.handleOnChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" id="password" placeholder="Enter Password" onChange={this.handleOnChange} />
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
              <br />
              <small>Not registered with this app? Click <Link to="/register">here</Link> to sign up.</small>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
