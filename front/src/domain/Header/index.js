import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaTasks } from 'react-icons/fa';
import './Header.css';
import NavigationLink from '../../components/NavigationLink';

const Header = (props) => {
  return (
    <header className='header'>
      <Link to='/' className='header__logo-link'>
        <FaTasks className='header__logo-icon' />
        <span className='header__logo-text'>Productivity Tracker</span>
      </Link>
      <nav className='header__nav'>
        <NavigationLink to='/register' label='Register' />
        <NavigationLink to='/login' label='Login' />
      </nav>
    </header>
  );
};

Header.propTypes = {};

export default Header;
