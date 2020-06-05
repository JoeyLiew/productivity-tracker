import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ type, label, onClick }) => (
  <button type={type} className='button' onClick={onClick}>
    {label}
  </button>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default Button;
