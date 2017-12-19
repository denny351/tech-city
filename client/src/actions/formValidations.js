import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function registerValidation(data) {
  return dispatch => {
    let errors = {};

    if(Validator.isEmpty(data.username)) {
      errors.username = 'This field is required';
    }

    if(!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
      errors.email = 'This field is required';
    }

    if(Validator.isEmpty(data.password)) {
      errors.password = 'This field is required';
    }

    if(Validator.equals(data.password, data.confirmPassword)) {
      errors.confirmPassword = 'Password must match';
    }

    if(Validator.isEmpty(data.confirmPassword)) {
      errors.confirmPassword = 'This field is required';
    }

    return {
      errors,
      isValid: isEmpty(errors)
    }
  }
}