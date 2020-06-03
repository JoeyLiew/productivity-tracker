import validator from 'validator';

const isString = (data) => typeof data === 'string' && data.length > 0;

const schemas = {
  register: (formData) => {
    const error = {};
    ['name', 'email', 'password', 'confirmPassword'].forEach((key) => {
      if (!isString(formData[key])) {
        formData[key] = '';
      }
    });
    if (validator.isEmpty(formData.name)) {
      error.name = 'Name is required';
    }
    if (!validator.isEmail(formData.email)) {
      error.email = 'E-mail is invalid';
    }
    if (validator.isEmpty(formData.email)) {
      error.email = 'E-mail is required';
    }
    if (!validator.isLength(formData.password, { min: 6 })) {
      error.password = 'Password requires minimum 6 characters';
    }
    if (validator.isEmpty(formData.password)) {
      error.password = 'Password is required';
    }
    if (!validator.equals(formData.password, formData.confirmPassword)) {
      error.confirmPassword = 'Password and Confirm Password must match';
    }
    if (validator.isEmpty(formData.confirmPassword)) {
      error.confirmPassword = 'Confirm Password is required';
    }
    return {
      isValid: Object.keys(error).length === 0,
      error,
    };
  },
  login: (formData) => {
    const error = {};
    ['email', 'password'].forEach((key) => {
      if (!isString(formData[key])) {
        formData[key] = '';
      }
    });
    if (!validator.isEmail(formData.email)) {
      error.email = 'E-mail is invalid';
    }
    if (validator.isEmpty(formData.email)) {
      error.email = 'E-mail is required';
    }
    if (!validator.isLength(formData.password, { min: 6 })) {
      error.password = 'Password requires minimum 6 characters';
    }
    if (validator.isEmpty(formData.password)) {
      error.password = 'Password is required';
    }
    return {
      isValid: Object.keys(error).length === 0,
      error,
    };
  },
};

export default schemas;
