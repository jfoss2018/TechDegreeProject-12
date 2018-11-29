import React, { Component } from 'react';
import Nav from './component/nav.js';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './component/home.js';
import About from './component/about.js';
import Error from './component/error.js';
import Login from './component/login.js';
import axios from 'axios';
import history from './component/history.js';
import Dashboard from './component/dashboard.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      currentUser: '',
      id: '',
      userImage: '',
      userEmail: '',
      userLat: null,
      userLng: null,
      userZoom: null,
      resError: null,
      isError: false
    };
    this.updateUser = this.updateUser.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ resError: error.response.data.message });
    // You can also log the error to an error reporting service
  }

  updateUser(stateObject) {
    this.setState(stateObject);
  }

  logOut(e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: '/api/v1/users/logout',
      proxy: {
        host: '127.0.0.1',
        port: 3001
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 200) {
        this.updateUser({
          loggedIn: false,
          currentUser: '',
          id: '',
          userImage: ''
        });
        history.push('/');
      }
    }).catch(function(err) {
      console.log(err);
    });
  }

  render() {
    let errComponent;
    if (this.state.resError) {
      errComponent = <Error errorMessage={this.state.resError} />
    } else {
      errComponent = null
    }
    return (
      <div className="App">
        <Router history={history}>
          <div>
            <Nav loggedIn={this.state.loggedIn} logOut={this.logOut} currentUser={this.state.currentUser} />
            {errComponent}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/dashboard" render={() => <Dashboard load={'Map'} stateObj={this.state} />} />
              <Route path="/profile" render={() => <Dashboard load={'Profile'} stateObj={this.state} />} />
              <Route path="/login" render={() => <Login isError={this.state.isError} updateUser={this.updateUser} />} />
              <Route component={Error} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
