const Joi = require('joi');

const brandValidationSchema = Joi.object({
  name: Joi.string().trim().min(3).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'any.required': 'Name is required',
    'string.min': 'Name is too short. Minimum length is {#limit} characters',
  }),
}).options({ abortEarly: false });

module.exports = brandValidationSchema;
