import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = ({ type, value, onChange, label, error }) => {
  return (
    <div className='input__container'>
      <input
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        className={`input ${error && 'input--error'}`}
        placeholder=' '
      />
      <label htmlFor={label} className='input__label'>
        {label}
      </label>
      <span className='input__error-message'>{error}</span>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default Input;
