import React from 'react';
import { Router } from 'react-router-dom';

import history from '../browserHistory';
import Main from './Main';

const Root = () => {
  return (
    <Router history={history}>
      <Main />
    </Router>
  );
};

export default Root;
