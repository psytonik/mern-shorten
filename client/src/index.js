import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './index.css';

import App from './App';
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
          <Router>
              <App />
          </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

