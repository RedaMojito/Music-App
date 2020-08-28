import React, {Component} from 'react';
import './App.css';
import Articles from './Containers/Articles/Articles';
import Menu from './Containers/Menu/Menu';
import Playlists from './Containers/PlayLists/Playlists';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {

  return (
    <Router>
        <div> 
      <header>
        <Menu />
       <Switch>
            <Route exact path='/' component={Articles} />
            <Route path='/Spotify' component={Playlists} />
            <Route to='/TV' />
       </Switch>
      </header>
    </div>
    </Router>
  
  );
}

export default App;
