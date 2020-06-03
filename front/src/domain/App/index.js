import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from '../Layout';
import AuthRoute from '../../components/AuthRoute';
import Home from '../../routes/Home';
import Register from '../../routes/Register';
import Login from '../../routes/Login';
import { loadSession } from '../../redux/session';

const App = () => {
  useEffect(() => {
    const initSession = async () => {
      // Check if local storage contains an access token.
      const accessToken = localStorage.getItem('act');
      if (accessToken) {
        // Decode the access token.
        const { exp } = jwtDecode(accessToken);
        // If the access token expired, fetch a new one.
        if (Date.now() > exp * 1000) {
          await refreshToken();
        } else {
          // Set timeout to refetch access token after expiration.
          setTimeout(refreshToken, exp * 1000 - Date.now());
        }
        // Load session data based on access token.
        dispatch(loadSession());
      }
    };
    initSession();
  }, []);

  return (
    <div className='app'>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <AuthRoute exact path='/register' component={Register} />
            <AuthRoute exact path='/login' component={Login} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
