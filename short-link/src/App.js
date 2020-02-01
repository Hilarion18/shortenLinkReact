import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './routes/Home';

class App extends Component {
  render() {
    return (
    <Router>
        <div className="container">
          <h2 className="head-page">Welcome to shorten-link</h2>
          <a>The link shortener with a long name</a>
          <Switch>
              <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
