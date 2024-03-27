import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { StopWatchProvider } from './StopWatch';
import { GameProvider } from './GameProvider';
import Game from './Game';
import Home from './Home';
import Rank, { RankProvider } from './Rank';

const App = () => {

  // TODO: go to home

  return (
    <Router>
      <GameProvider>
        <StopWatchProvider>
          <RankProvider>
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
          </RankProvider>
        </StopWatchProvider>
      </GameProvider>
    </Router>
  )
}

export default App;