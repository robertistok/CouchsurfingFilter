import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import FindHosts from './views/FindHosts';
import Home from './views/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/find" component={FindHosts} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
