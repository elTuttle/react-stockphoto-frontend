import React, { Component } from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import ImageCaptioning from './components/ImageCaptioning'
import ImageContest from './components/ImageContest'
import LoginComponent from './components/LoginComponent'
import GetUser from './components/GetUser'
import NavBar from './components/NavBar'

import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={ImageCaptioning} />
            <Route path="/user/:token" component={GetUser} />
            <Route exact path="/image" component={ImageCaptioning} />
            <Route exact path="/imagecaptions" component={ImageContest}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
