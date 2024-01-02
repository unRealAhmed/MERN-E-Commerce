const Joi = require('joi');

const nameRegex = /^[a-zA-Z\s\-']+$/;

const userValidationSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required()
    .messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email is required',
      'string.email': 'Enter a valid email address',
      'any.required': 'Email is required',
    }),

  phoneNumber: Joi.string(),

  firstname: Joi.string().min(3).max(25).trim().pattern(nameRegex).required()
    .messages({
      'string.base': 'Firstname must be a string',
      'string.empty': 'Firstname is required',
      'string.min': 'Firstname should have at least {#limit} characters',
      'string.max': 'Firstname should have at most {#limit} characters',
      'string.pattern.base': 'Firstname must only contain alphabetic characters, spaces, hyphens, and apostrophes',
      'any.required': 'Firstname is required',
    }),

  lastname: Joi.string().min(3).max(25).trim().pattern(nameRegex).required()
    .messages({
      'string.base': 'Lastname must be a string',
      'string.empty': 'Lastname is required',
      'string.min': 'Lastname should have at least {#limit} characters',
      'string.max': 'Lastname should have at most {#limit} characters',
      'string.pattern.base': 'Lastname must only contain alphabetic characters, spaces, hyphens, and apostrophes',
      'any.required': 'Lastname is required',
    }),

  password: Joi.string().min(6).required()
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required',
      'string.min': 'Password should have at least {#limit} characters',
      'any.required': 'Password is required',
    }),

  role: Joi.string().valid('admin', 'user', 'merchant').default('user'),

});

module.exports = userValidationSchema;
