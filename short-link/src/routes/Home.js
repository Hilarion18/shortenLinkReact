import React, { Component } from 'react';
// import HomeComponent from '../components/home/HomeComponent'
import HomeComponent from '../views/home/HomeView'

class Home extends Component {
  render() {
    return (
      <div className="App">
        <HomeComponent/>
      </div>
    );
  }
}

export default Home