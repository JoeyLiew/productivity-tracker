import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaTasks } from 'react-icons/fa';
import './Header.css';
import NavigationLink from '../../components/NavigationLink';
import Button from '../../components/Button';
import { logout } from '../../redux/session';

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.session.isAuth);
  const isFetching = useSelector((state) => state.session.isFetching);

  const nav = isAuth ? (
    <>
      <NavigationLink to='/tracker' label='Tracker' />
      <Button label='Logout' onClick={() => dispatch(logout())} />
    </>
  ) : (
    <>
      <NavigationLink to='/register' label='Register' />
      <NavigationLink to='/login' label='Login' />
    </>
  );

  return (
    <header className='header'>
      <Link to='/' className='header__logo-link'>
        <FaTasks className='header__logo-icon' />
        <span className='header__logo-text'>Productivity Tracker</span>
      </Link>
      <nav className='header__nav'>
        {isFetching ? <span>Loading</span> : nav}
      </nav>
    </header>
  );
};

export default Header;
