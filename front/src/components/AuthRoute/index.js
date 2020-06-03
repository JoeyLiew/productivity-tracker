import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector((state) => state.session.isAuth);

  if (isAuth) {
    return <Redirect to='/tracker' />;
  }

  return <Component {...rest} />;
};

export default AuthRoute;
