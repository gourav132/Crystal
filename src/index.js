// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.scss';
// import App from './App';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link
// } from "react-router-dom";

// import SignIn from './page/SignIn/SignIn';

// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <Routes>
//         <Route exact path = "/" element = { <App /> } />
//         <Route path = "/SignIn" element = { <SignIn /> } />
//       </Routes>
//     </Router>
//   </React.StrictMode>,
//   document.getElementById('root')
// );


import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './index.css'

import SignIn from './page/SignIn/SignIn';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
