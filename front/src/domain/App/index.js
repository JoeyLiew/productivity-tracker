import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from '../Layout';
import Home from '../../routes/Home';
import Register from '../../routes/Register';
import Login from '../../routes/Login';

const App = (props) => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

App.propTypes = {};

export default App;
