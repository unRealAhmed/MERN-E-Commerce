const Joi = require('joi');

const categoryValidationSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'any.required': 'Name is required',
    'string.min': 'Name is too short. Minimum length is {#limit} characters',
    'string.max': 'Name is too long. Maximum length is {#limit} characters',
  }),
  img: Joi.string().allow('').optional(),
}).options({ abortEarly: false });

module.exports = categoryValidationSchema;
