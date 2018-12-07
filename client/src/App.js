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
import Footer from './component/footer.js';
import { pageSetUp, pagination } from './pagination.js';

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
      resMsg: null,
      resSuccess: null,
      city: '',
      weather: '',
      temperature: '',
      list: [],
      btnList: [],
      searches: []
    };
    this.handleNavToggle = this.handleNavToggle.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getSearches = this.getSearches.bind(this);
    this.paging = this.paging.bind(this);
  }

  updateUser(stateObject) {
    this.setState(stateObject);
  }

  getSearches = () => {
    axios({
      method: 'get',
      url: `/api/v1/users/${this.state.id}/searches`,
      proxy: {
        host: '127.0.0.1',
        port: 3001
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response.data);
      const returnObj = pageSetUp(response.data, null);
      this.setState({
        list: returnObj.items,
        btnList: returnObj.buttons,
        searches: returnObj.searches
      });
    })
    .catch(err => {
      console.log(err.data.response);
    });
  }

  paging = (e) => {
    const pageNum = parseInt(e.target.value);
    const newReturnObj = pagination(pageNum, this.state.searches);
    this.setState({
      list: newReturnObj.items,
      btnList: newReturnObj.buttons,
      searches: newReturnObj.searches
    });
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
          userImage: '',
          userEmail: '',
          userLat: null,
          userLng: null,
          userZoom: null,
          resMsg: null,
          resSuccess: null,
          city: '',
          weather: '',
          temperature: ''
        });
        history.push('/');
      }
    }).catch(function(err) {
      console.log(err);
    });
  }

  handleNavToggle() {
    const btn = document.getElementById('btn-collapse');
    if (btn.getAttribute('aria-expanded') === 'true') {
      btn.click();
    }
  }

  render() {
    let errComponent;
    if (this.state.resMsg) {
      errComponent = <Error errorMessage={this.state.resMsg} msgColor={this.state.resSuccess} />
    } else {
      errComponent = null
    }
    return (
      <div className="App">
        <Router history={history}>
          <div className="display">
            <Nav loggedIn={this.state.loggedIn} logOut={this.logOut} toggle={this.handleNavToggle} currentUser={this.state.currentUser} />
            {errComponent}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/dashboard" render={() => <Dashboard paging={this.paging} getSearches={this.getSearches} updateUser={this.updateUser} load={'Map'} stateObj={this.state} />} />
              <Route path="/profile" render={() => <Dashboard paging={this.paging} getSearches={this.getSearches} updateUser={this.updateUser} load={'Profile'} stateObj={this.state} />} />
              <Route path="/login" render={() => <Login updateUser={this.updateUser} />} />
              <Route component={Error} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
