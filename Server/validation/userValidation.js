const Joi = require('joi');

const userValidationSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required()
    .messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email is required',
      'string.email': 'Enter a valid email address',
      'any.required': 'Email is required',
    }),

  phoneNumber: Joi.string(),

  fullname: Joi.string().min(3).max(25).trim().regex(/^[a-zA-Z\s]+$/).required()
    .messages({
      'string.base': 'Fullname must be a string',
      'string.empty': 'Fullname is required',
      'string.min': 'Fullname should have at least {#limit} characters',
      'string.max': 'Fullname should have at most {#limit} characters',
      'string.pattern.base': 'Fullname must only contain alphabetic characters and spaces',
      'any.required': 'Fullname is required',
    }),

  password: Joi.string().min(6).required()
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required',
      'string.min': 'Password should have at least {#limit} characters',
      'any.required': 'Password is required',
    }),

  role: Joi.string().valid('admin', 'user', 'merchant').default('user'),

  merchant: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null),
});

module.exports = userValidationSchema;
