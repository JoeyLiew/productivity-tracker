import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector((state) => state.session.isAuth);

  return (
    <Route {...rest}>
      {isAuth ? <Redirect to='/tracker' /> : <Component {...rest} />}
    </Route>
  );
};

export default AuthRoute;
