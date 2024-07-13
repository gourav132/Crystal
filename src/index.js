import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './index.css'
import Home from './page/Auth/Home/Home';
import { Loading, Profile } from './page';
import NotFound from './page/Error/NotFound';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
      <Router>
        <Routes>
          <Route exact path="/Gallery/:uid" element={<App />} />
          <Route path="/Auth" element={<Home />} />
          <Route path='/' element={<Loading />} />
          <Route path='/Profile' element={< Profile />} />
          <Route path='/Error' element={< NotFound />} />
        </Routes>
      </Router>
  </React.StrictMode>
);
