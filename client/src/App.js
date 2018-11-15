import React, { Component } from 'react';
import Nav from './component/nav.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './component/home.js';
import About from './component/about.js';
import Error from './component/error.js';
import Login from './component/login.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    };
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Nav loggedIn={this.state.loggedIn} />
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/login" component={Login} />
              <Route component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
