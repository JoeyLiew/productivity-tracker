import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './NavigationLink.css';

const NavigationLink = ({ to, label }) => (
  <NavLink to={to} className='nav-link' activeClassName='nav-link--active'>
    {label}
  </NavLink>
);

NavigationLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default NavigationLink;
