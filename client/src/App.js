import React, { Component } from 'react';
import Nav from './component/nav.js';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './component/home.js';
import About from './component/about.js';
import Error from './component/error.js';
import NotFound from './component/notFound.js';
import Login from './component/login.js';
import axios from 'axios';
import history from './component/history.js';
import Dashboard from './component/dashboard.js';
import Footer from './component/footer.js';
import { pageSetUp, pagination } from './pagination.js';

// The App Component is the primary component for this app.
class App extends Component {
  // The App Component contains all important state information for this app.
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
      searches: [],
      pageNum: 1
    };
    this.handleNavToggle = this.handleNavToggle.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getSearches = this.getSearches.bind(this);
    this.paging = this.paging.bind(this);
  }

  // componentDidUpdate is used to remove the Error Component when the state
  // changes following the display of an error message.
  componentDidUpdate(prevPops, prevState, snapshot) {
    if (this.state.resMsg === true && prevState.resMsg === true) {
      this.updateUser({
        resMsg: null,
        resSuccess: null
      });
    }
  }

  // The updateUser function is used to update the state for App.js. This
  // function is sent as props for all other components that need to update
  // App.js state.
  updateUser(stateObject) {
    this.setState(stateObject);
  }

  // The getSearches function returns all searches for the current user.
  getSearches = () => {
    // This function sends a get request to the /users/:id/searches API endpoint.
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
      // When a response is received, the pageSetUp function is called to create the
      // search history modal. It then sets the state for the modal search configuration.
      const returnObj = pageSetUp(response.data, null);
      this.setState({
        list: returnObj.items,
        btnList: returnObj.buttons,
        searches: returnObj.searches,
        pageNum: 1
      });
    })
    .catch(err => {
      // If there is an error, the Error component is displayed with the error message.
      this.updateUser({
        resMsg: err.response.data.message,
        resSuccess: 'Red'
      });
    });
  }

  // The paging function is called when a page number button is clicked on the search
  // history modal. It calls the pagination function, then updates App.js state With
  // the returned information.
  paging = (e) => {
    const pageNum = parseInt(e.target.value);
    const newReturnObj = pagination(pageNum, this.state.searches);
    this.setState({
      list: newReturnObj.items,
      btnList: newReturnObj.buttons,
      searches: newReturnObj.searches,
      pageNum: parseInt(e.target.value)
    });
  }

  // The logOut function logs the current user out.
  logOut(e) {
    e.preventDefault();
    // The function sends a post request to the /users/logout API endpoint.
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
        // If a successful response is received, App.js state is updated to
        // reflect no current user.
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
        this.handleNavToggle();
        history.push('/');
      }
    }).catch(function(err) {
      // If there is an error, the Error component is displayed with the error message.
      this.updateUser({
        resMsg: err.response.data.message,
        resSuccess: 'Red'
      });
    });
  }

  // The handleNavToggle function closes the navigation dropdown after making a selection.
  handleNavToggle() {
    const btn = document.getElementById('btn-collapse');
    if (btn.getAttribute('aria-expanded') === 'true') {
      btn.click();
    }
  }

  render() {
    // errComponent will contain the Error component if there is a resMsg state in App.js, and nothing otherwise.
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
              <Route exact path="/about" component={About} />
              <Route exact path="/dashboard" render={() => <Dashboard pageNum={this.state.pageNum} paging={this.paging} getSearches={this.getSearches} updateUser={this.updateUser} load={'Map'} stateObj={this.state} />} />
              <Route exact path="/profile" render={() => <Dashboard pageNum={this.state.pageNum} paging={this.paging} getSearches={this.getSearches} updateUser={this.updateUser} load={'Profile'} stateObj={this.state} />} />
              <Route exact path="/login" render={() => <Login updateUser={this.updateUser} />} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
