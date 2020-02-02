import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './routes/Home';

class App extends Component {
  render() {
    return (
    <Router>
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className="head-page">
              Welcome to shorten-link
            </div>
            <div className="head-page2">
              The link shortener with a long name
            </div>
          </div>
          <Switch>
              <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
