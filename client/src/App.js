import React, { Component } from 'react';
import Nav from './component/nav.js';

class App extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div className="App">
        <Nav/>
      </div>
    );
  }
}

export default App;
