import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ type, label }) => (
  <button type={type} className='button'>
    {label}
  </button>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Button;
