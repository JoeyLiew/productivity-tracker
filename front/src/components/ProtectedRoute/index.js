import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector((state) => state.session.isAuth);

  return (
    <Route {...rest}>
      {isAuth ? <Component {...rest} /> : <Redirect to='/' />}
    </Route>
  );
};

export default ProtectedRoute;
