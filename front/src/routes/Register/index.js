import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Register.css';
import RedLamp from '../../media/images/red-lamp.jpeg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { register } from '../../redux/session';
import { resetError } from '../../redux/error';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const errorRef = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  errorRef.current = useSelector((state) => state.error);

  useEffect(() => {
    // Reset error state when register component unmounts.
    return () => {
      if (errorRef.current) {
        dispatch(resetError());
      }
    };
  }, []);

  const handleChange = (fn) => (event) => fn(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Put data in object.
    const data = {
      name,
      email,
      password,
      confirmPassword,
    };
    // Start register action.
    dispatch(register(data, history));
  };

  return (
    <main className='register'>
      <div className='register__image-container'>
        <img
          src={RedLamp}
          alt='red lamp in darkness'
          className='register__image'
        />
      </div>
      <div className='register__form-container'>
        <h1 className='register__form-title'>Sign Up</h1>
        <form className='register__form' onSubmit={handleSubmit}>
          <Input
            type='text'
            value={name}
            onChange={handleChange(setName)}
            label='Name'
            error={errorRef.current && errorRef.current.name}
          />
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
          <Input
            type='password'
            value={confirmPassword}
            onChange={handleChange(setConfirmPassword)}
            label='Confirm Password'
            error={errorRef.current && errorRef.current.confirmPassword}
          />
          <Button type='submit' label='Register' />
        </form>
        <div className='register__login-tip'>
          <span className='register__login-text'>Already have an account?</span>
          <Link to='/login' className='register__login-link'>
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
