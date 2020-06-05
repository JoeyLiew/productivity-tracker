import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { FaExclamation } from 'react-icons/fa';
import Train from '../../media/images/train.jpeg';
import './Login.css';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { login } from '../../redux/session';
import { resetError } from '../../redux/error';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const errorRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  errorRef.current = useSelector((state) => state.error);

  useEffect(() => {
    // Reset error state when register component unmounts.
    return () => {
      if (errorRef.current) {
        dispatch(resetError());
      }
    };
  }, [dispatch]);

  const handleChange = (fn) => (event) => fn(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Put data in object.
    const data = {
      email,
      password,
    };
    // Start login action.
    dispatch(login(data, history));
  };

  return (
    <main className='login'>
      <div className='login__form-container'>
        <h1 className='login__form-title'>Sign In</h1>
        {errorRef.current && errorRef.current.general && (
          <div className='login__error-message'>
            <FaExclamation className='login__error-icon' />
            <span className='login__error-text'>
              {errorRef.current.general}
            </span>
          </div>
        )}
        <form className='login__form' onSubmit={handleSubmit}>
          <Input
            type='text'
            value={email}
            onChange={handleChange(setEmail)}
            label='E-mail'
            error={errorRef.current && errorRef.current.email}
          />
          <Input
            type='password'
            value={password}
            onChange={handleChange(setPassword)}
            label='Password'
            error={errorRef.current && errorRef.current.password}
          />
          <Button type='submit' label='Login' />
        </form>
        <div className='login__register-tip'>
          <span className='login__register-text'>New to us?</span>
          <Link to='/register' className='login__register-link'>
            Register
          </Link>
        </div>
      </div>
      <div className='login__image-container'>
        <img src={Train} alt='dark road' className='login__image' />
      </div>
    </main>
  );
};

export default Login;
