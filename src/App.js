import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Game from './Game';
import Home from './Home';
import Rank from './Rank';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li><Link to={'/'} className="nav-link"> Game Center </Link></li>
              <li><Link to={'/game'} className="nav-link"> Game </Link></li>
              <li><Link to={'/rank'} className="nav-link"> Rank </Link></li>
            </ul>
          </nav>
          <hr />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/game' element={<Game />} />
            <Route path='/rank' element={<Rank />} />
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App;