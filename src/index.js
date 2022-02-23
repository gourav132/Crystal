import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import SignIn from './page/SignIn/SignIn';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path = "/" element = { <App /> } />
        <Route path = "/SignIn" element = { <SignIn /> } />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
