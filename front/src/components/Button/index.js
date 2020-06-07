import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ type, label, onClick, className }) => (
  <button type={type} className={`button ${className}`} onClick={onClick}>
    {label}
  </button>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
