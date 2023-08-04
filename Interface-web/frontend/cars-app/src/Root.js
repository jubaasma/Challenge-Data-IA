import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import App from './App';
import App2 from './app2';
import App3 from './app3'
import './bootstrap/dist/css/bootstrap.min.css';
import './Root.css'

function Root() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Statistiques</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/features1">Résultats du ML</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/features2">Prediction</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/features1" element={<App2 />} />
        <Route path="/features2" element={<App3 />} />
      </Routes>
    </Router>
  );
}

export default Root;
