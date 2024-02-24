import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Game from './Game';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1>Push Box</h1>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li><Link to={'/'} className="nav-link"> Home </Link></li>
              <li><Link to={'/game'} className="nav-link"> Game </Link></li>
            </ul>
          </nav>
          <hr />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/game' element={<Game />} />
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App;